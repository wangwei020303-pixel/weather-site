/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import air1Image from './components/air1.png';
import air2Image from './components/fire1.png';
import air4Image from './components/air4.png';
import air3Image from './components/air3.png';
import res4Image from './components/res4.png';
import res6Image from './components/res6.png';
import res7Image from './components/res7.png';
import res8Image from './components/res8.png';
import mod2Image from './components/mod2.png';
import Image1 from './components/image1.jpg';
import Image2 from './components/image2.jpg';
import Image3 from './components/image3.jpg';
import ent4Image from './components/ent4.png';
import { Section } from './types';
import type { RawCategory, BilingualText, FuyaoPersonality } from './types';

// Centralized Quotes for the Mascot "Fuyao"
// Refactored into categorized groups based on personality
export const FUYAO_QUOTES: Record<Exclude<FuyaoPersonality, 'RANDOM'>, BilingualText[]> = {
  // 🌩️ 古风 (Ancient/Dominant)
  ANCIENT: [
    { zh: "扶摇直上九万里，这点小风小浪算什么？", en: "Soaring ninety thousand miles up, what is this little breeze?" },
    { zh: "夜观天象，见西北方紫气... 哦不，是冷空气东移南下。", en: "Observing the night sky... oh wait, it's just a cold front moving south." },
    { zh: "风止了。你可知，这是暴风雨前的宁静？", en: "The wind has stopped. Do you know this is the calm before the storm?" },
    { zh: "云深不知处，但我知道云层厚度是 2000 米。", en: "Deep in the clouds... specifically 2000 meters thick." },
    { zh: "唤风唤雨我不会，但告诉你何时下雨，我在行。", en: "I can't summon wind or rain, but I can tell you exactly when it falls." },
    { zh: "想借东风？让我看看现在的气压梯度力同不同意。", en: "Want to borrow the East Wind? Let me check the pressure gradient force first." }
  ],

  // 🤖 赛博 (Cyber/Geek)
  CYBER: [
    { zh: "正在连接全球气象交换网 (GTS)... 哔——连接成功。", en: "Connecting to Global Telecommunication System (GTS)... Beep—Connected." },
    { zh: "我的 GPU 正在发烫，全靠这阵凉风散热了。", en: "My GPU is overheating, thankfully this breeze helps cooling." },
    { zh: "千万别问我明天彩票号码，我只算流体力学方程。", en: "Don't ask for lottery numbers, I only compute fluid dynamics equations." },
    { zh: "加载卫星云图中... 哎呀，这里有一团超强对流！", en: "Loading satellite imagery... Oops, detected a super strong convection here!" },
    { zh: "刚刚捕捉到一个毫巴的气压波动，是不是你在叹气？", en: "Captured a 1 hPa pressure fluctuation. Was that you sighing?" },
    { zh: "警告：你的发际线可能会遭到 8 级大风的挑战。", en: "Warning: Your hairline might be challenged by force 8 gales." }
  ],

  // 🐱 傲娇 (Playful/Sassy)
  PLAYFUL: [
    { zh: "别光盯着我看，我脸上有天气预报吗？(还真有)", en: "Don't just stare at me, is there a forecast on my face? (Actually, there is.)" },
    { zh: "呼... 刚去太平洋游了一圈，带回来点水汽。", en: "Phew... just swam in the Pacific and brought back some moisture." },
    { zh: "如果明天预报不准，那是老天爷的问题，不是我的锅~", en: "If the forecast is wrong tomorrow, blame the heavens, not me." },
    { zh: "你都盯着屏幕看了两小时了，不出去晒晒太阳补补钙？", en: "You've been staring at the screen for 2 hours. Go get some sun!" },
    { zh: "快问快问！我的显存快要溢出了！", en: "Ask quickly! My VRAM is about to overflow!" },
    { zh: "再戳我？再戳我就把明天的晴天改成雷阵雨！", en: "Poke me again? I'll change tomorrow's sunny day to a thunderstorm!" }
  ],

  // ⛱️ 暖心 (Caring/Warm)
  CARING: [
    { zh: "今日紫外线很强，你的皮肤可经不起这么晒。", en: "UV is strong today, please protect your skin." },
    { zh: "降温了，多穿件衣服，我可不想听到你感冒的喷嚏声。", en: "It's getting cold, wear more. I don't want to hear you sneezing." },
    { zh: "这种天气最适合睡觉... 啊不，最适合写代码。", en: "Perfect weather for sleeping... uh no, for coding." },
    { zh: "带伞了吗？没带的话，现在的奔跑速度建议是 10m/s。", en: "Got an umbrella? If not, suggested running speed is 10m/s." },
    { zh: "空气质量优，快打开窗户，让我也透透气。", en: "Air quality is excellent. Open the window and let me breathe too." },
    { zh: "放心吧，未来两小时无雨，安心出门浪。", en: "Don't worry, no rain for the next 2 hours. Go out and have fun." }
  ]
};

export const RAW_SOURCES: RawCategory[] = [
  {
    title: { en: "Forecast Websites & App", zh: "天气预报网站 & App" },
    description: { en: "Global numerical prediction systems, ensemble charts, and visualization platforms.", zh: "全球数值预报系统、集合图表和可视化平台。" },
    sources: [
      {
        id: 'mod1',
        name: { en: 'Windy', zh: 'Windy' },
        genre: { en: 'Global Vector', zh: '全球矢量' },
        day: 'LIVE',
        image: 'https://img.funtop.tw/text/2015/08/150821-windyty/windyty_1.jpg',
        description: { en: 'The gold standard for interactive weather forecasting. Visualizes global wind patterns, rain accumulation, and temperature.', zh: '交互式天气预报的黄金标准。可视化全球风场、降雨累积和温度。' },
        link: 'https://www.windy.com'
      },
      {
        id: 'mod2',
        name: { en: 'Tropical Tidbits', zh: 'Tropical Tidbits' },
        genre: { en: 'Hurricane Models', zh: '飓风模型' },
        day: 'ANALYSIS',
        image: mod2Image,
        description: { en: 'Extensive Atlantic and global tropical cyclone tracking and model analysis (GFS, HWRF, CMC).', zh: '广泛的大西洋和全球热带气旋追踪及模型分析 (GFS, HWRF, CMC)。' },
        link: 'https://www.tropicaltidbits.com/'
      },
      {
        id: 'mod3',
        name: { en: 'Earth Nullschool', zh: '地球' },
        genre: { en: 'Supercomputer', zh: '超级计算机' },
        day: 'LIVE',
        image: 'https://earth.nullschool.net/sample.jpg',
        description: { en: 'A visualization of global weather conditions forecast by supercomputers.', zh: '超级计算机预报的全球天气状况可视化。' },
        link: 'https://earth.nullschool.net'
      },
      {
        id: 'mod4',
        name: { en: 'Ventusky', zh: 'Ventusky' },
        genre: { en: 'Precision Map', zh: '精细地图' },
        day: 'HOURLY',
        image: 'https://th.bing.com/th/id/R.cc949610c6615b0717a7428b158d72d0?rik=3RZjjnWGL%2fKVtQ&pid=ImgRaw&r=0',
        description: { en: 'Focuses on precise weather prediction and meteorological data visualization.', zh: '专注于精确的天气预报和气象数据可视化。' },
        link: 'https://www.ventusky.com'
      },
      {
        id: 'mod5',
        name: { en: 'Meteologix', zh: '气象' },
        genre: { en: 'Multi-Mode', zh: '多模式' },
        day: 'FORECAST',
        image: 'https://static.wixstatic.com/media/f44761_dccaa02b718e4dae9e80f2323b7e8bed~mv2.png/v1/fill/w_486,h_313,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/XL_Vorhersage.png',
        description: { en: 'High precision global weather data and Swiss quality forecasting visualization (Kachelmannwetter).', zh: '高精度全球天气数据和瑞士品质的预报可视化 (Kachelmannwetter)。' },
        link: 'https://meteologix.com'
      },
      {
        id: 'mod6',
        name: { en: 'Weathernerds', zh: 'Weathernerds' },
        genre: { en: 'Ensemble', zh: '集合预报' },
        day: 'DATA',
        image: 'https://tse2.mm.bing.net/th/id/OIP.aFna8JIC_acT9jRqiXKmYQHaFj?rs=1&pid=ImgDetMain&o=7&rm=3',
        description: { en: 'Comprehensive model guidance, ensemble plots, and satellite data for weather enthusiasts.', zh: '为气象爱好者提供的综合模型指导、集合图表和卫星数据。' },
        link: 'https://www.weathernerds.org/'
      }
    ]
  },
  {
    title: { en: "Satellite & Radar Imagery", zh: "卫星云图 & 雷达影像" },
    description: { en: "Real-time geostationary satellite feeds, doppler radar, and remote sensing.", zh: "实时地球静止卫星信号、多普勒雷达和遥感影像。" },
    sources: [
      {
        id: 'sat1',
        name: { en: 'Dapiya', zh: 'Dapiya' },
        genre: { en: 'Himawari', zh: '向日葵卫星' },
        day: 'SAT',
        image: 'https://data.dapiya.cn/satellite/data/oisst_sst.png',
        description: { en: 'Real-time Himawari satellite imagery and regional radar mosaics.', zh: '实时向日葵卫星图像和区域雷达拼图。' },
        link: 'http://www.dapiya.net:1234/satellite/floater/'
      },
      {
        id: 'sat2',
        name: { en: 'CIMSS', zh: 'CIMSS' },
        genre: { en: 'Tropical', zh: '热带气旋' },
        day: 'CYCLONE',
        image: 'https://tse3.mm.bing.net/th/id/OIP.xI_DCw_ws3C4w2ztI9tLTQHaFP?rs=1&pid=ImgDetMain&o=7&rm=3',
        description: { en: 'Specialized tropical cyclone satellite analysis from UW-Madison (Wind Shear, steering layers).', zh: '威斯康星大学麦迪逊分校提供的专业热带气旋卫星分析（风切变、引导气流层）。' },
        link: 'http://tropic.ssec.wisc.edu/'
      },
      {
        id: 'sat3',
        name: { en: 'Digital Typhoon', zh: '数字台风' },
        genre: { en: 'Archive', zh: '档案数据库' },
        day: 'JAPAN',
        image: 'https://th.bing.com/th/id/R.7952d263695dab49b1d82c86cac75fc3?rik=UvFOG%2bjGWAK4VQ&riu=http%3a%2f%2fagora.ex.nii.ac.jp%2fdigital-typhoon%2fmap-s%2fwnp%2f198522.png&ehk=L4SU7x6LXOSavxHW8TththtD8yA9C9S8QXTWdZ8bRuA%3d&risl=&pid=ImgRaw&r=0',
        description: { en: 'Comprehensive typhoon database and satellite imagery archive from NII Japan.', zh: '日本国立情报学研究所提供的综合台风数据库和卫星图像档案。' },
        link: 'http://agora.ex.nii.ac.jp/digital-typhoon/'
      },
      {
        id: 'sat4',
        name: { en: 'RMAPS', zh: '北京无缝隙预报' },
        genre: { en: 'Urban', zh: '城市气象' },
        day: 'BJ',
        image: 'https://www.ium.cn/Uploads/editor/image/2020-07-16/1594870827995811.png',
        description: { en: 'Beijing Regional Meteorological Center rapid update forecasting system.', zh: '北京区域气象中心快速更新预报系统。' },
        link: 'http://www.ium.cn:8000/index.html'
      },
      {
        id: 'sat5',
        name: { en: 'RAMMB', zh: 'RAMMB' },
        genre: { en: 'Himawari', zh: '向日葵卫星' },
        day: 'JP',
        image: 'https://tse3.mm.bing.net/th/id/OIP.r4ucvNpoRVdsA5Zj8f2BbQHaHZ?rs=1&pid=ImgDetMain&o=7&rm=3',
        description: { en: 'CIRA/RAMMB Slider: Real-time multi-spectral satellite imagery (Himawari-8/9, GOES).', zh: 'CIRA/RAMMB Slider：实时多光谱卫星图像（Himawari-8/9, GOES）。' },
        link: 'https://rammb.cira.colostate.edu/ramsdis/online/himawari-8.asp#Full%20Disk'
      },
      {
        id: 'sat6',
        name: { en: 'Fengyun', zh: '风云卫星' },
        genre: { en: 'NSMC', zh: '国家卫星中心' },
        day: 'China',
        image: 'https://tse2.mm.bing.net/th/id/OIP.i-We3n8bWRslxka8tPM0hQHaEL?rs=1&pid=ImgDetMain&o=7&rm=3',
        description: { en: 'National Satellite Meteorological Center - Operational FY series satellite products and imagery.', zh: '国家卫星气象中心 - 风云系列卫星业务产品及图像。' },
        link: 'http://www.nsmc.org.cn/nsmc/cn/home/index.html'
      },
      {
        id: 'sat8',
        name: { en: 'NOAA OSPO', zh: 'NOAA OSPO' },
        genre: { en: 'Ocean', zh: '海洋' },
        day: 'OCEAN',
        image: 'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?auto=format&fit=crop&w=500&q=60',
        description: { en: 'NOAA Office of Satellite and Product Operations - Ocean Products.', zh: 'NOAA 卫星与产品运行办公室 - 海洋产品。' },
        link: 'https://www.ospo.noaa.gov/products/ocean/index.html'
      }
    ]
  },
  {
    title: { en: "Regional Monitors", zh: "区域气象监测" },
    description: { en: "Official meteorological agencies and regional forecast centers.", zh: "官方气象机构和区域预报中心。" },
    sources: [
      {
        id: 'reg1',
        name: { en: 'NMC / CMA', zh: '中央气象台' },
        genre: { en: 'Official', zh: '官方' },
        day: 'CN',
        image: 'https://th.bing.com/th/id/R.c64e001f96db0282fe2259ca467eb962?rik=laDM0bPXNT4t1w&riu=http%3a%2f%2fwenhui.whb.cn%2fu%2fcms%2fwww%2f202107%2f2314130050cs.jpg&ehk=94KV%2fHw0WCDkRvP0lcNeOsLarLtDmXHS4TCQzEDbhlY%3d&risl=&pid=ImgRaw&r=0',
        description: { en: 'National Meteorological Center of China - Official warnings, radar mosaics, and precipitation forecasts.', zh: '中国中央气象台 - 官方预警、雷达拼图和降水预报。' },
        link: 'http://www.nmc.cn/'
      },
      {
        id: 'reg2',
        name: { en: 'CWA', zh: '台湾气象署' },
        genre: { en: 'Observatory', zh: '气象署' },
        day: 'TW',
        image: 'https://th.bing.com/th/id/R.d4cfed24f0376a16ca3d273943183c7a?rik=tQ%2fNa1Uz3eOOTg&riu=http%3a%2f%2fi3.sinaimg.cn%2fdy%2fnews%2f2013%2f0512%2f1368347401_NLQNmU.jpg&ehk=7UufZ1iGcN9K3BaR5rm7gkBTlkHq3PBSbwVleLDJGjU%3d&risl=&pid=ImgRaw&r=0',
        description: { en: 'Central Weather Administration - Real-time weather, typhoon warnings, and earthquake reports for Taiwan.', zh: '中央气象署 - 台湾实时天气、台风警报和地震报告。' },
        link: 'https://www.cwa.gov.tw/V8/C/'
      },
      {
        id: 'reg3',
        name: { en: 'HKO', zh: '香港天文台' },
        genre: { en: 'Observatory', zh: '天文台' },
        day: 'HK',
        image: 'https://tse3.mm.bing.net/th/id/OIP.usZIM9vACbNPjinWyri5LQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
        description: { en: 'Hong Kong Observatory - Local weather forecasts, radar imagery, and warning signals.', zh: '香港天文台 - 本地天气预报、雷达图像和警告信号。' },
        link: 'https://www.hko.gov.hk/'
      },
      {
        id: 'reg4',
        name: { en: 'KMA', zh: '韩国气象厅' },
        genre: { en: 'Observatory', zh: '气象厅' },
        day: 'Korea',
        image: 'https://tse3.mm.bing.net/th/id/OIP.Cghbvt4qRgwXvcHNl55itQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3',
        description: { en: 'Korea Meteorological Administration - Official forecasts and severe weather warnings for the Korean Peninsula.', zh: '韩国气象厅 - 朝鲜半岛官方预报和恶劣天气预警。' },
        link: 'https://www.weather.go.kr/w/index.do'
      },
      {
        id: 'reg5',
        name: { en: 'JMA', zh: '日本气象厅' },
        genre: { en: 'Observatory', zh: '气象厅' },
        day: 'Japan',
        image: 'https://tse1.mm.bing.net/th/id/OIP.8lmH6tV57zfObQi84SLSaQHaEH?rs=1&pid=ImgDetMain&o=7&rm=3',
        description: { en: 'Japan Meteorological Agency - Disaster prevention information, warnings, and weather maps.', zh: '日本气象厅 - 防灾信息、警报和天气图。' },
        link: 'https://www.jma.go.jp/bosai/#pattern=default'
      },
      {
        id: 'reg6',
        name: { en: 'Netweather', zh: '各家模式预报' },
        genre: { en: 'Charts', zh: '图表' },
        day: 'US/UK/CAN',
        image: 'https://www.weather.gov/images/ilx/Top_News/gfs_example.png',
        description: { en: 'Netweather GFS Charts - Comprehensive visualization of global model data (GFS, ECMWF, GEM).', zh: 'Netweather GFS 图表 - 全球模型数据的综合可视化 (GFS, ECMWF, GEM)。' },
        link: 'https://www.netweather.tv/charts-and-data/gfs'
      },
    ]
  },
  {
    title: { en: "Environment", zh: "环境" },
    description: { en: "Environment quality monitoring and forecasting.", zh: "环境质量监测与预报。" },
    sources: [
      { 
        id: 'env1', 
        name: { en: 'WAQI (AQICN)', zh: 'WAQI 全球空气质量' }, 
        genre: { en: 'Air Quality', zh: '空气质量' }, 
        day: 'LIVE', 
        image: air1Image,
        description: { en: 'World Air Quality Index project. Real-time air pollution map.', zh: '世界空气质量指数项目。实时空气污染地图。' },
        link: 'https://aqicn.org/map/world/'
      },
      {
        id: 'env2',
        name: { en: 'AirWise', zh: '慧聚大气' },
        genre: { en: 'Monitor', zh: '监测' },
        day: 'LIVE',
        image: 'https://imgres.iefans.net/iefans/303/1512101-20241204111102674fc84646c53.jpg',
        description: { en: 'Global air quality monitoring.', zh: '全球空气质量监测。' },
        link: 'https://airwise.hjhj-e.com/'
      },
      {
        id: 'env3',
        name: { en: 'WMO Surface Conc.', zh: '世界气象组织 地面浓度' },
        genre: { en: 'Forecast', zh: '预报' },
        day: 'ENS',
        image: air3Image,
        description: { en: 'Surface concentration ensemble forecasts.', zh: '地面浓度集合预报。' },
        link: 'http://www.asdf-bj.net/publish/forecasts/ens/ea/surface-concentration/index.html'
      },
      {
        id: 'env4',
        name: { en: 'Air Quality', zh: '真气网' },
        genre: { en: 'Monitor', zh: '监测' },
        day: 'LIVE',
        image: air4Image,
        description: { en: 'Air quality monitoring.', zh: '空气质量监测。' },
        link: 'https://map.zq12369.com/'
      },
      { 
        id: 'env5', 
        name: { en: 'NASA FIRMS', zh: 'NASA 火灾地图' }, 
        genre: { en: 'Satellite', zh: '卫星' }, 
        day: 'FIRE', 
        image: air2Image,
        description: { en: 'Fire Information for Resource Management System. Real-time fire/hotspot data.', zh: '资源管理火灾信息系统。实时火灾/热点数据。' },
        link: 'https://firms.modaps.eosdis.nasa.gov/map/'
      }
    ]
  },
  {
    title: { en: "Climate Research & Data", zh: "气候研究 & 数据" },
    description: { en: "Long-term climate reanalysis, historical composites, and simulation.", zh: "长期气候再分析、历史合成和模拟。" },
    sources: [
      {
        id: 'res1',
        name: { en: 'Climate Reanalyzer', zh: '气候再分析' },
        genre: { en: 'Climate', zh: '气候' },
        day: 'GLOBAL',
        image: 'https://tse1.mm.bing.net/th/id/OIP.rYhAGgk82MOzTBuCX-uF_gHaFN?rs=1&pid=ImgDetMain&o=7&rm=3',
        description: { en: 'Visualizing climate data and forecast models (University of Maine).', zh: '气候数据和预报模型可视化（缅因大学）。' },
        link: 'https://climatereanalyzer.org/'
      },
      {
        id: 'res2',
        name: { en: 'NCEP GENESIS', zh: 'NCEP生成' },
        genre: { en: 'TC', zh: '台风' },
        day: 'LAB',
        image: 'https://tse2.mm.bing.net/th/id/OIP.sFIXIPXsGUieIu3kpLJI_QHaKX?rs=1&pid=ImgDetMain&o=7&rm=3',
        description: { en: 'NCEP Environmental Modeling Center - Tropical cyclone genesis tracking and model fields.', zh: 'NCEP 环境模拟中心 - 热带气旋生成追踪和模型场。' },
        link: 'https://www.emc.ncep.noaa.gov/gmb/tpm/emchurr/tcgen/'
      },
      {
        id: 'res3',
        name: { en: 'NOAA PSL', zh: 'NOAA物理科学实验室' },
        genre: { en: 'Composites', zh: '合成图' },
        day: 'ARCHIVE',
        image: 'https://tse1.mm.bing.net/th/id/OIP.oUQJ-XKfr8_E4mfjZZ1zwgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
        description: { en: 'Physical Sciences Laboratory - Monthly/Seasonal Composites and climate time series.', zh: '物理科学实验室 - 月度/季节性合成图和气候时间序列。' },
        link: 'https://psl.noaa.gov/'
      },
      {
        id: 'res4',
        name: { en: 'Weather Outlook', zh: 'Weather Outlook' },
        genre: { en: 'Models', zh: '模型' },
        day: 'FORECAST',
        image: res4Image,
        description: { en: 'TheWeatherOutlook - Data and charts from global computer models including GFS and GEFS.', zh: 'TheWeatherOutlook - 包括 GFS 和 GEFS 在内的全球计算机模型数据和图表。' },
        link: 'https://www.theweatheroutlook.com/twodata/datmdlout.aspx'
      },
      {
        id: 'res5',
        name: { en: 'ECMWF Charts', zh: 'ECMWF 图表' },
        genre: { en: 'Euro Model', zh: '欧洲模型' },
        day: 'OFFICIAL',
        image: 'https://th.bing.com/th/id/R.1fc6d9c244a0596b5950e9c571d247e5?rik=MPqAUAwCXqf%2fDQ&pid=ImgRaw&r=0',
        description: { en: 'Official charts from the European Centre for Medium-Range Weather Forecasts. High precision global data.', zh: '欧洲中期天气预报中心官方图表。高精度全球数据。' },
        link: 'https://charts.ecmwf.int/'
      },
      {
        id: 'res6',
        name: { en: 'C3S Seasonal', zh: 'C3S 季节预报' },
        genre: { en: 'Seasonal', zh: '季节性' },
        day: 'FORECAST',
        image: res6Image,
        description: { en: 'Copernicus Climate Change Service seasonal forecasts.', zh: '哥白尼气候变化服务季节性预报。' },
        link: 'https://www.ecmwf.int/en/forecasts/dataset/c3s-seasonal-forecasts'
      },
      {
        id: 'res7',
        name: { en: 'Copernicus CDS', zh: '哥白尼 CDS' },
        genre: { en: 'Data', zh: '数据' },
        day: 'DATA',
        image: res7Image,
        description: { en: 'Climate Data Store - Access to a wide range of climate data.', zh: '气候数据库 - 访问广泛的气候数据。' },
        link: 'https://cds.climate.copernicus.eu/datasets'
      },
      {
        id: 'res8',
        name: { en: 'IBTrACS', zh: 'IBTrACS' },
        genre: { en: 'Best Track', zh: '最佳路径' },
        day: 'ARCHIVE',
        image: res8Image,
        description: { en: 'International Best Track Archive for Climate Stewardship.', zh: '国际气候管理最佳路径档案。' },
        link: 'https://www.ncei.noaa.gov/products/international-best-track-archive?name=ib-v4-access'
      }
    ]
  },
  {
    title: { en: "Weather Enthusiasts", zh: "气象爱好者" },
    description: { en: "Forums, blogs, and specialized toolkits for the meteorological community.", zh: "气象社区的论坛、博客和专用工具包。" },
    sources: [
      {
        id: 'ent1',
        name: { en: 'Easterlywave', zh: '东风波' },
        genre: { en: 'Enthusiast', zh: '爱好者' },
        day: 'TC TRACK',
        image: 'https://th.bing.com/th/id/R.ceb7477d4502b3a7f8e7263f9bbd5f0d?rik=2q6rAFoyh97sYg&riu=http%3a%2f%2fimg-xml.kepuchina.cn%2fimages%2fnewsWire%2fKhvWPkdABlWQvKBQPyIMdIUnAShkkyLsXKlB.jpg&ehk=kyY%2fLeS0WLTFXVWE0K5xQqK48pgWOj3qAHhOF5Pyd%2bs%3d&risl=&pid=ImgRaw&r=0',
        description: { en: 'Professional tropical cyclone analysis and data aggregation for storm chasers.', zh: '为追风者提供的专业热带气旋分析和数据聚合。' },
        link: 'http://www.easterlywave.com/'
      },
      {
        id: 'ent2',
        name: { en: 'Typhoon Forum', zh: '台风论坛' },
        genre: { en: 'Community', zh: '社区' },
        day: 'FORUM',
        image: 'https://tse1.mm.bing.net/th/id/OIP.58xdGe8TS9yZBfoCTrVSKQHaEa?rs=1&pid=ImgDetMain&o=7&rm=3',
        description: { en: 'The premier discussion board for typhoon enthusiasts (Powered by Discuz!).', zh: '台风爱好者的首选讨论版块（基于 Discuz!）。' },
        link: 'http://bbs.typhoon.org.cn/'
      },
      {
        id: 'ent3',
        name: { en: 'Veg Garden', zh: '菜园子' },
        genre: { en: 'Tool Stack', zh: '工具栈' },
        day: 'CYZ',
        image: 'https://tse3.mm.bing.net/th/id/OIP.mQWn8eYr5DzCYLW5FyxB1AHaE7?rs=1&pid=ImgDetMain&o=7&rm=3',
        description: { en: 'Cai Yuan Zi - A comprehensive collection of meteorological tools and charts.', zh: '菜园子 - 气象工具和图表的综合集合。' },
        link: 'http://cyz.org.cn/'
      },
      {
        id: 'ent4',
        name: { en: 'Mesovortices', zh: '中气旋' },
        genre: { en: 'Blog / Analysis', zh: '博客/分析' },
        day: 'LINK',
        image: ent4Image,
        description: { en: 'In-depth meteorological analysis and technical commentary.', zh: '深入的气象分析和技术评论。' },
        link: 'https://mesovortices.com/#/'
      },
    ]
  },
  {
    title: { en: "Original Footage (Bilibili)", zh: "原创视频 (B站)" },
    description: { en: "Personal storm chasing records and meteorological documentation.", zh: "个人追风记录与气象实录。" },
    sources: [
      {
        id: 'vid1',
        name: { en: 'Storm Chasing Vlog', zh: '追风实录' },
        genre: { en: 'Documentary', zh: '纪录片' },
        day: 'BILIBILI',
        image: Image1,
        description: { en: 'First-hand footage of severe weather events captured in the field. Click to watch on Bilibili.', zh: '现场拍摄的极端天气事件第一手影像资料。点击跳转 Bilibili 观看。' },
        link: 'https://www.bilibili.com/video/BV1eHe4eVEyN/?spm_id_from=333.1387.0.0&vd_source=b62cb856eb7cb415b8a0793041de88bf'
      },
      {
        id: 'vid2',
        name: { en: 'Cloud Time-Lapse', zh: '云层延时' },
        genre: { en: 'Time-Lapse', zh: '延时摄影' },
        day: 'BILIBILI',
        image: Image2,
        description: { en: 'Atmospheric evolution captured over time. Visualizing the flow of the skies.', zh: '记录大气随时间演变的壮丽景象。可视化天空的流动。' },
        link: 'https://www.bilibili.com/video/BV1N9HeeHEb8/?spm_id_from=333.1387.homepage.video_card.click&vd_source=b62cb856eb7cb415b8a0793041de88bf'
      },
      {
        id: 'vid3',
        name: { en: 'Celestial Photography', zh: '天像拍摄' },
        genre: { en: 'Aurora', zh: '极光' },
        day: 'BILIBILI',
        image: Image3,
        description: { en: 'Personal capture of the aurora borealis. Witness the dance of solar winds.', zh: '个人拍摄的极光影像。见证太阳风的舞动。' },
        link: 'https://www.bilibili.com/video/BV1Q41cYVEiW/?spm_id_from=333.1387.homepage.video_card.click&vd_source=b62cb856eb7cb415b8a0793041de88bf'
      }
    ]
  }
];
