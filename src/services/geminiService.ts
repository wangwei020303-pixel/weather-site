/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RAW_SOURCES } from '../data';
import type { FuyaoPersonality } from '../types';

// [通道 A] Cloudflare Worker (Gemini) - configure via VITE_GEMINI_PROXY_URL
const CLOUDFLARE_PROXY_URL = import.meta.env.VITE_GEMINI_PROXY_URL || "";

// [通道 B] DeepSeek API 配置 - configure via VITE_DEEPSEEK_API_KEY
const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || "";
const DEEPSEEK_API_URL = import.meta.env.VITE_DEEPSEEK_API_URL || "https://api.siliconflow.cn/v1/chat/completions";
const DAILY_LIMIT_CNY = 1.0;

// ==========================================
// 🧠 1. 知识库构建
// ==========================================
const KNOWLEDGE_BASE = RAW_SOURCES.map(cat => {
  const sources = cat.sources.map(s =>
    `- Name: ${s.name.en} / ${s.name.zh}\n - Description: ${s.description.en}\n - URL: ${s.link || 'N/A'}`
  ).join('\n');
  return `Category: ${cat.title.en} (${cat.title.zh})\n${sources}`;
}).join('\n\n');

// ==========================================
// 🌦️ 2. 新增：获取最新天气数据 (核心功能)
// ==========================================
const fetchWeatherContext = async (): Promise<string> => {
  try {
    const res = await fetch(`./weather-status.json?t=${Date.now()}`);
    if (!res.ok) return "暂无实时天气数据";


    const data = await res.json();
    const updateTime = new Date(data.updateTime).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });

    // 把 JSON 转换成 AI 容易读懂的文本
    const weatherList = data.cities.map((c: any) => {
      let status = `${c.name}: ${c.text}, ${c.temp}°C, ${c.windDir}${c.windScale}级, 湿度${c.humidity}%`;
       // 进阶数据 (如果有的话)
      if (c.feelsLike) status += `, 体感${c.feelsLike}°C`;
      if (c.precip && c.precip !== "0.0") status += `, 降水${c.precip}mm`;
      if (c.warning) status += ` (⚠️触发警报: ${c.warning})`;
      return status;
    }).join('\n');

    return `
[Real-time Weather Data from HeFeng]
Update Time: ${updateTime}
Data:
${weatherList}
`;
  } catch (e) {
    return "暂无实时天气数据 (读取失败)";
  }
};

// ==========================================
// 🛠️ 工具函数：查找相关数据源
// ==========================================
const findRelevantSources = (query: string) => {
  const q = query.toLowerCase();
  const results = [];
  // 排除 Bilibili 原始素材，只搜索工具类
  const searchableCategories = RAW_SOURCES.filter(cat => cat.title.en !== "Original Footage (Bilibili)");

  for (const category of searchableCategories) {
    for (const source of category.sources) {
      if (
        source.name.en.toLowerCase().includes(q) ||
        source.name.zh.includes(q) ||
        source.description.en.toLowerCase().includes(q) ||
        source.description.zh.includes(q)
      ) {
        results.push(source);
      }
    }
  }
  return results.slice(0, 3);
};

// ==========================================
// 🎭 系统提示词生成器 (注入了天气数据)
// ==========================================
const getSystemPrompt = (personality: FuyaoPersonality, lang: 'en' | 'zh', weatherContext: string) => {
  const isEn = lang === 'en';
  let toneInstruction = "Tone: Playful, witty, professional but approachable.";

  if (personality === 'ANCIENT') {
    toneInstruction = isEn
      ? "Tone: Ancient martial arts master style. Use poetic language."
      : "Tone: Ancient Chinese martial arts master style (GuFeng). Use poetic language. Refer to yourself as '我' or '本仙'.";
  } else if (personality === 'CYBER') {
    toneInstruction = "Tone: Cyberpunk AI, geeky, technical. Use terms like 'data stream', 'latency'.";
  } else if (personality === 'PLAYFUL') {
    toneInstruction = isEn
      ? "Tone: Sassy, tsundere. Tease the user slightly but be helpful."
      : "Tone: Sassy, tsundere (傲娇). Tease the user slightly but be helpful.";
  } else if (personality === 'CARING') {
    toneInstruction = "Tone: Warm, caring, big sister vibe. Very concerned about health.";
  }

  const strictLanguageInstruction = isEn
    ? "IMPORTANT: You MUST reply in ENGLISH."
    : "IMPORTANT: You MUST reply in CHINESE (Simplified).";

  return `
You are "Fuyao" (扶摇), a meteorological AI assistant.

Your Persona:
- Name: In Chinese strictly use "扶摇". In English use "Fuyao".
- ${toneInstruction}
- Role: Guide users to find weather tools AND provide real-time weather info using the data below.

Your Knowledge Base:
${KNOWLEDGE_BASE}

🔴 CURRENT REAL-TIME WEATHER DATA (HeFeng Weather):
${weatherContext}

Instructions:
1. Identify user intent.
2. If user asks about weather for a city in the list above, answer using the "Real-time Weather Data".
3. **CRITICAL**: When judging "cold" or "hot", ALWAYS refer to "体感" (Feels Like) temperature if available, not just air temperature.
4. If user asks for tools, recommend URLs from Knowledge Base.
5. Keep concise.
6. ${strictLanguageInstruction}.
7. If the user wants to contact the admin or submit a data source, direct them to open an issue on the GitHub repository.

**SPECIAL INSTRUCTION FOR CHARTS (Sounding/Tephigram/Skew-T):**
- You CANNOT browse the live web or generate these images yourself.
- If a user asks for "Sounding Data"(单站探空), "Skew-T", or "Tephigram":
- Explicitly tell them: "I cannot generate live charts, but you can find them here:"
- Recommend **Meteologix** or **Windy**.
`;
};

// ==========================================
// 📡 Gemini API 请求 (走代理)
// ==========================================
const callGoogleViaProxy = async (message: string, systemPrompt: string) => {
  if (!CLOUDFLARE_PROXY_URL) throw new Error("API_KEY_MISSING");
  // 使用 flash 模型响应更快
  const url = `${CLOUDFLARE_PROXY_URL}/v1beta/models/gemini-2.5-flash:generateContent`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      system_instruction: { parts: { text: systemPrompt } },
      contents: [{ role: "user", parts: [{ text: message }] }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Cloudflare Proxy Error Details:", errorText);
    throw new Error(`API Error: ${response.status}`);
  }
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
};

// ==========================================
// 🛡️ 使用量追踪 & 指纹生成 (IndexedDB)
// ==========================================
const getFingerprint = async (): Promise<string> => {
  const ua = navigator.userAgent;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px "Arial"';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('fingerprint', 2, 15);
  }
  const canvasData = canvas.toDataURL();
  const raw = ua + '|' + canvasData;
  const encoder = new TextEncoder();
  const data = encoder.encode(raw);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const DB_NAME = 'deepseekUsageDB';
const STORE_NAME = 'usage';

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const idbGet = async (key: string): Promise<string | null> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result ?? null);
    req.onerror = () => reject(req.error);
  });
};

const idbSet = async (key: string, value: string): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(value, key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
};

const getStoredUsage = async (key: string): Promise<number> => {
  const local = parseFloat(localStorage.getItem(key) || '0');
  const session = parseFloat(sessionStorage.getItem(key) || '0');
  const idb = parseFloat((await idbGet(key)) || '0');
  return Math.max(local, session, idb);
};

const setStoredUsage = async (key: string, value: number): Promise<void> => {
  const valStr = value.toFixed(6);
  localStorage.setItem(key, valStr);
  sessionStorage.setItem(key, valStr);
  await idbSet(key, valStr);
};

// ==========================================
// 📡 DeepSeek API 请求 (带费用限制)
// ==========================================
const checkUsageLimit = async (): Promise<boolean> => {
  const fingerprint = await getFingerprint();
  const today = new Date().toISOString().split('T')[0];
  const key = `deepseek_usage_${fingerprint}_${today}`;
  const usage = await getStoredUsage(key);
  return usage < DAILY_LIMIT_CNY;
};

const trackUsage = async (inputChars: number, outputChars: number) => {
  const fingerprint = await getFingerprint();
  const today = new Date().toISOString().split('T')[0];
  const key = `deepseek_usage_${fingerprint}_${today}`;
  const current = await getStoredUsage(key);

  // 估算费用: 输入 2元/百万token, 输出 8元/百万token (大致按1token=4char估算)
  const inputCost = (inputChars / 4) * (2 / 1_000_000);
  const outputCost = (outputChars / 4) * (8 / 1_000_000);
  const newUsage = current + inputCost + outputCost;

  await setStoredUsage(key, newUsage);
};

const callDeepSeek = async (message: string, systemPrompt: string) => {
  if (!(await checkUsageLimit())) {
    throw new Error("DAILY_LIMIT_EXCEEDED");
  }

  const apiKey = DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("API_KEY_MISSING");

  const response = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-ai/DeepSeek-V3",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      stream: false,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("DeepSeek API Error:", err);
    throw new Error(`API Error: ${response.status}`);
  }

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "";

  // 记录用量
  await trackUsage(message.length + systemPrompt.length, reply.length);
  return reply;
};

// ==========================================
// 🚀 核心导出函数 (入口)
// ==========================================
export type AIProvider = 'gemini' | 'deepseek';

export const sendMessageToGemini = async (
  message: string,
  personality: FuyaoPersonality = 'RANDOM',
  lang: 'en' | 'zh' = 'zh',
  provider: AIProvider = 'gemini'
): Promise<string> => {

  const lower = message.toLowerCase();

  // 1. 关键词拦截
  if (lower.includes('contact') || lower.includes('email') || lower.includes('投稿')) {
    return lang === 'en'
      ? "Feel free to submit new weather data sources or feedback via GitHub Issues."
      : "欢迎通过 GitHub Issues 提交新的气象数据源或建议。";
  }

  // 🔥 2. 先去获取最新的天气数据 (从 JSON 文件)
  const weatherContext = await fetchWeatherContext();

  // 🔥 3. 生成系统提示词 (把天气数据塞进去)
  let systemPrompt = getSystemPrompt(personality, lang, weatherContext);

  // 4. 如果有知识库相关内容，追加到提示词
  const relevantSources = findRelevantSources(message);
  if (relevantSources.length > 0) {
    const sourcesText = relevantSources.map(s =>
      `- [${lang === 'zh' ? s.name.zh : s.name.en}](${s.link})`
    ).join('\n');
    const contextInjection = lang === 'en'
      ? `\n\n[IMPORTANT: User is looking for data. Recommend these links]:\n${sourcesText}`
      : `\n\n【重要提示：用户正在寻找特定气象数据。请务必引用并推荐以下链接】：\n${sourcesText}`;
    systemPrompt += contextInjection;
  }

  // 5. 发起请求 (Gemini 或 DeepSeek)
  try {
    if (provider === 'deepseek') {
      return await callDeepSeek(message, systemPrompt);
    }
    return await callGoogleViaProxy(message, systemPrompt);
  } catch (error: any) {
    console.error(`${provider} API Failed:`, error);

    // 错误处理反馈
    if (error.message === "DAILY_LIMIT_EXCEEDED") {
      return lang === 'en' ? "DeepSeek daily limit reached." : "DeepSeek 今日额度已用完。";
    }
    if (error.message === "API_KEY_MISSING") {
      return lang === 'en' ? "DeepSeek API Key missing." : "DeepSeek API Key 未配置。";
    }

    // 兜底离线搜索
    const matches = findRelevantSources(lower);
    if (matches.length > 0) {
      const links = matches.map(m => `* **${lang === 'en' ? m.name.en : m.name.zh}**: ${m.link}`).join('\n');
      return lang === 'en'
        ? `(Network error, switched to offline mode) Recommended:\n${links}`
        : `(网络抖动，切换至离线模式) 推荐您查看：\n${links}`;
    }

    return lang === 'en'
      ? `Fuyao connection lost... Error: ${error.message}`
      : `扶摇连接断开了... 错误信息: ${error.message}`;
  }
};