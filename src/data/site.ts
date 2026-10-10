// All website content in one place. Text in [brackets] is a placeholder to fill in.

export type Lang = "en" | "th" | "zh" | "vi" | "de" | "ar";

export const languages: { code: Lang; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "th", label: "ไทย", name: "ภาษาไทย" },
  { code: "zh", label: "中文", name: "中文" },
  { code: "vi", label: "VI", name: "Tiếng Việt" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "ar", label: "عربي", name: "العربية" },
];

export type HeroCopy = {
  eyebrow: string;
  h1a: string;
  h1b: string;
  sub: string;
  cta1: string;
  cta2: string;
  navCta: string;
};

export const heroCopy: Record<Lang, HeroCopy> = {
  en: {
    eyebrow: "EVENT & PR AGENCY · BANGKOK · SINCE 2004",
    h1a: "Events that put",
    h1b: "your brand on stage.",
    sub: "PR One plans and runs seminars, summits, launches, exhibitions and PR for brands across Thailand — and is the team the world’s leading IT and software companies trust most.",
    cta1: "See upcoming events",
    cta2: "Plan your event with us",
    navCta: "Register",
  },
  th: {
    eyebrow: "เอเจนซี่จัดงานและประชาสัมพันธ์ · กรุงเทพฯ · ตั้งแต่ 2547",
    h1a: "จัดงานที่ทำให้แบรนด์",
    h1b: "ของคุณโดดเด่นบนเวที",
    sub: "PR One วางแผนและจัดงานสัมมนา ซัมมิท เปิดตัวสินค้า นิทรรศการ และงานประชาสัมพันธ์ให้แบรนด์ทั่วประเทศไทย และเป็นทีมที่บริษัทไอทีและซอฟต์แวร์ชั้นนำระดับโลกไว้วางใจ",
    cta1: "ดูงานที่กำลังจะมาถึง",
    cta2: "ปรึกษาการจัดงาน",
    navCta: "ลงทะเบียน",
  },
  zh: {
    eyebrow: "活动策划与公关机构 · 曼谷 · 始于 2004",
    h1a: "让您的品牌",
    h1b: "闪耀舞台。",
    sub: "PR One 为泰国各行业品牌策划并执行研讨会、峰会、产品发布会、展览及公关活动，更是全球领先 IT 与软件企业最信赖的团队。",
    cta1: "查看即将举行的活动",
    cta2: "与我们策划活动",
    navCta: "报名",
  },
  vi: {
    eyebrow: "AGENCY SỰ KIỆN & PR · BANGKOK · TỪ 2004",
    h1a: "Sự kiện đưa thương hiệu",
    h1b: "của bạn lên sân khấu.",
    sub: "PR One lên kế hoạch và tổ chức hội thảo, hội nghị, ra mắt sản phẩm, triển lãm và PR cho các thương hiệu tại Thái Lan — và là đội ngũ được các công ty CNTT, phần mềm hàng đầu thế giới tin tưởng nhất.",
    cta1: "Xem sự kiện sắp tới",
    cta2: "Lên kế hoạch sự kiện cùng chúng tôi",
    navCta: "Đăng ký",
  },
  de: {
    eyebrow: "EVENT- & PR-AGENTUR · BANGKOK · SEIT 2004",
    h1a: "Events, die Ihre Marke",
    h1b: "auf die Bühne bringen.",
    sub: "PR One plant und organisiert Seminare, Gipfel, Produktlaunches, Messen und PR für Marken in ganz Thailand — und ist das Team, dem führende IT- und Softwareunternehmen am meisten vertrauen.",
    cta1: "Kommende Events ansehen",
    cta2: "Ihr Event mit uns planen",
    navCta: "Anmelden",
  },
  ar: {
    eyebrow: "وكالة فعاليات وعلاقات عامة · بانكوك · منذ 2004",
    h1a: "فعاليات تضع علامتك",
    h1b: "التجارية على المسرح.",
    sub: "تخطط PR One وتنظم الندوات والقمم وإطلاق المنتجات والمعارض والعلاقات العامة للعلامات التجارية في تايلاند — وهي الفريق الذي تثق به كبرى شركات تقنية المعلومات والبرمجيات العالمية.",
    cta1: "استعرض الفعاليات القادمة",
    cta2: "خطط لفعاليتك معنا",
    navCta: "سجّل الآن",
  },
};

export type EventType = "SEMINAR" | "SUMMIT" | "ROADSHOW" | "EXHIBITION";

export type UpcomingEvent = {
  slug: string;
  type: EventType;
  mode: "IN-PERSON" | "HYBRID" | "VIRTUAL";
  /** ISO date-time, e.g. "2026-11-20T09:00:00+07:00". Leave null until confirmed. */
  startsAt: string | null;
  dateLabel: string;
  venue: string;
  title: string;
  audience: string;
  price: string;
};

export const upcomingEvents: UpcomingEvent[] = [
  {
    slug: "cloud-security-seminar",
    type: "SEMINAR",
    mode: "IN-PERSON",
    startsAt: null,
    dateLabel: "[DD Mon 2026]",
    venue: "[Venue, Bangkok]",
    title: "[Seminar title — e.g. Cloud Security for Thai Enterprises]",
    audience: "For CISOs, IT security managers and network engineers.",
    price: "Free for IT professionals",
  },
  {
    slug: "data-ai-summit",
    type: "SUMMIT",
    mode: "HYBRID",
    startsAt: null,
    dateLabel: "[DD Mon 2026]",
    venue: "[Hotel, Bangkok]",
    title: "[Summit title — e.g. Data & AI Innovation Day]",
    audience: "Keynotes, customer stories and partner expo for CIOs and data leaders.",
    price: "Free for IT professionals",
  },
  {
    slug: "resilience-roadshow",
    type: "ROADSHOW",
    mode: "IN-PERSON",
    startsAt: null,
    dateLabel: "[DD Mon 2027]",
    venue: "[Bangkok → Chiang Mai]",
    title: "[Roadshow title — e.g. Resilience on the Road]",
    audience: "Half-day sessions with live demos in two cities.",
    price: "Free for IT professionals",
  },
  {
    slug: "trade-exhibition",
    type: "EXHIBITION",
    mode: "IN-PERSON",
    startsAt: null,
    dateLabel: "[DD Mon 2027]",
    venue: "[Venue, Bangkok]",
    title: "[Exhibition title — e.g. Trade fair or product showcase]",
    audience: "Open to trade buyers, exhibitors and the public.",
    price: "Open to the public",
  },
];

/** The event featured in the hero card (first one by default). */
export const featuredEvent = upcomingEvents[1];

/** Images are served from the current pr-one.com site. To self-host, copy the
 *  `assets/img` folder into `public/img` and set NEXT_PUBLIC_ASSET_BASE=/img */
export const ASSET_BASE = (process.env.NEXT_PUBLIC_ASSET_BASE || "https://www.pr-one.com/assets/img").replace(/\/$/, "");
export const asset = (path: string) => encodeURI(`${ASSET_BASE}/${path}`);

export type RoadmapItem = { client: string; title: string; type: string; image?: string };

const ev = "port/Event/";
const pr = "port/PR/";

export const roadmap: { year: string; theme: string; items: RoadmapItem[] }[] = [
  {
    year: "2020–23",
    theme: "Brand launches & press",
    items: [
      { client: "Ying Charoen Market", title: "Kid Jak Khlong volunteer day 2023", type: "PR", image: pr + "Ying Charoen Market Joins Volunteer for the _Kid Jak Khlong_ 2023/photo_7.jpg" },
      { client: "Ying Charoen Market", title: "Joins forces with depa 2022", type: "PR", image: pr + "Ying Charoen Market Joins Forces with depa 2022/DSC04038.jpg" },
      { client: "Miss Grand", title: "Miss Grand Mae Hong Son 2022", type: "PR", image: pr + "Miss Grand Mae Hong Son 2022/1645413065820.jpg" },
      { client: "Breastfeeding Society", title: "Uniting for a Sustainable Breastfeeding Society 2022", type: "SEMINAR", image: pr + "Uniting for a Sustainable Breastfeeding Society Seminar_2022/photo.jpg" },
      { client: "TIPCO", title: "TIPCO NEXT Meet The Press 2021", type: "PR", image: ev + "TIPCO NEXT Meet The Press 2021/TIPCOKK-190.jpg" },
      { client: "UOB & The FinLab", title: "15 Thai SMEs transform digitally 2020", type: "PR", image: pr + "UOB and The FinLab help 15 Thai SMEs transform digitally_2020/Photo2.jpg" },
      { client: "Kidney Project", title: "Kidney Transplantation Project in Celebration 2020", type: "PR", image: pr + "Kidney Transplantation Project in Celebration_2020/BBF_4448.JPG" },
      { client: "Mr. Pizza", title: "Grand Opening Event 2020", type: "LAUNCH", image: pr + "Mr. Pizza Grand Opening Event 2020/photo_5.jpg" },
    ],
  },
  {
    year: "2024",
    theme: "Causes & community",
    items: [
      { client: "World Organ Donation Day", title: "Give LIFE Get LIVES 2024", type: "PR", image: pr + "World Organ Donation Day 2024 “Give LIFE Get LIVES ”/photo_6.jpg" },
      { client: "Run with Wings", title: "Run with Wings Charity Run 2024", type: "PR", image: pr + "Run with Wings Charity Run 2024/photo_6.JPG" },
    ],
  },
  {
    year: "2025",
    theme: "APAC kick-offs & data events",
    items: [
      { client: "Tricentis", title: "Partner Kick Off APAC 2025", type: "KICK-OFF", image: ev + "Tricentis Partner Kick Off_APAC _2025/21Feb2025-0075.jpg" },
      { client: "Infor", title: "APJ Sales Kick Off 2025", type: "KICK-OFF", image: ev + "INFOR_APJ Sales Kick Off 2025/NN1_8544.JPG" },
      { client: "NTT DATA", title: "Transformation NOW! Thailand 2025", type: "SUMMIT", image: ev + "NTT Data Transformation NOW! THAILAND  2025/1AU_5117.jpg" },
      { client: "Snowflake", title: "Data & AI Innovation Day Bangkok 2025", type: "SUMMIT", image: ev + "Snowflake Data & AI Innovation Day Bangkok 2025/039A0132.jpg" },
      { client: "Cohesity", title: "Catalyst on the Road — Resilience Everywhere 2025", type: "ROADSHOW", image: ev + "Cohesity  Catalyst1 on the road Resilience Everywhere 2025/039A3287.jpg" },
      { client: "Catalyst", title: "Catalyst on the Road 2025", type: "ROADSHOW", image: ev + "CATELYST ON THE ROAD_2025/039A9124.jpg" },
      { client: "CyberArk", title: "CyberArk Bangkok 2025", type: "SEMINAR" },
      { client: "Thailand Trader Fair", title: "Thailand Trader Fair 2025", type: "EXHIBITION", image: ev + "Thailand Traders Fair 2025/0016.jpg" },
    ],
  },
  {
    year: "2026",
    theme: "Tech summits at scale",
    items: [
      { client: "Asia Sourcing Show", title: "Press Conference — Asia Sourcing Show 2026", type: "PR", image: pr + "Press Conference_Asia Sourcing Show 2026/Master_Photo_260211-333.JPG" },
      { client: "Ping Identity", title: "State of Trust 2026", type: "SEMINAR", image: ev + "Ping Identity  State of Trust in 2026/039A4188.jpg" },
      { client: "UiPath", title: "Fusion Summit Bangkok 2026", type: "SUMMIT", image: ev + "Uipath_Fusion Summit Bangkok 2026/DSC_0452.JPG" },
      { client: "STT GDC", title: "Practical Insights Bangkok 2026", type: "SEMINAR", image: ev + "STTTelemedia Global Data Center_Bangkok 2026/C1 020726_0366.jpg" },
      { client: "Cohesity", title: "Resilience Everywhere 2026", type: "SEMINAR", image: ev + "Cohesity_Resilience Buessiness 2026/0135.jpg" },
      { client: "Benz BKK", title: "The Endless Appreciation Concert 2026", type: "CUSTOMER EVENT", image: ev + "Benz BKK The Endless Appriciation Concert 2026/Jpg-0050.JPG" },
      { client: "Thailand Trader Fair", title: "Thailand Trader Fair 2026", type: "EXHIBITION", image: ev + "Thailand Trader Fair 2026/039A7913.JPG" },
      { client: "Your brand", title: "[Your next event — Q4 2026 dates open]", type: "OPEN SLOT" },
    ],
  },
];

export const team = [
  { name: "Wanya Chareonpo", role: "Managing Director", phone: "+66 81 300 2633", email: "wanya@pr-one.com", photo: "team/wanya600.jpg" },
  { name: "Patthira Buri", role: "PR Director", phone: "+66 81 636 0452", email: "patthira@pr-one.com", photo: "team/Ann2026-600.jpg" },
  { name: "Chuenboon Ponglumchiak", role: "Event Director", phone: "+66 61 928 2441", email: "chuenboon@pr-one.com", photo: "team/kaew.jpg" },
  { name: "Neelawan Satiranon", role: "Event Manager", phone: "+66 81 308 5723", email: "neelawan@pr-one.com", photo: "team/bb.jpg" },
  { name: "Tanitha Vittayanon", role: "PR Manager", phone: "+66 86 993 5744", email: "tanitha@pr-one.com", photo: "team/tanitha2026.png" },
  { name: "Pentida Wisessmit", role: "Graphic Design", phone: "+66 92 442 3655", email: "pentida@pr-one.com", photo: "team/Pentida2026600.png" },
  { name: "Nampetch Thainiyom", role: "Event Assistant", phone: "+66 61 019 9227", email: "nampetch@pr-one.com", photo: "team/Nampetch 600.jpg" },
];

export const stats = [
  { value: "2004", label: "Organizing events since" },
  { value: "60+", label: "Brands we have worked with" },
  { value: "[XXX]", label: "Events delivered" },
  { value: "[XX,XXX]", label: "Attendees registered" },
  { value: "3 modes", label: "Physical · Hybrid · Virtual", accent: true },
];

export const services = [
  { title: "Event Management", body: "Seminars, conferences, exhibitions, product launches, trade shows and roadshows — physical, hybrid or virtual, from planning through post-event evaluation." },
  { title: "Database & Lead Generation", body: "Data profiling, targeted IT decision-maker lists, email invitation campaigns, telemarketing follow-up and daily registration reports." },
  { title: "Marketing Campaigns", body: "Campaign strategy, budgeting and scheduling, plus social media and digital platform management." },
  { title: "Public Relations", body: "PR consultancy, media relationships and message distribution across Thai tech, business and lifestyle outlets." },
  { title: "Content & Visual Design", body: "In-house copywriting, key visuals, microsites, photo and video — with you involved at every step." },
];

export const industries = [
  "Automotive", "Telco", "Manufacturing", "Real Estate", "Retail & Food",
  "Finance", "Healthcare & Non-profit", "Trade Fairs",
];

export const trustedBy = ["Cisco", "Oracle", "Dell", "Huawei", "Lenovo", "UiPath", "Cohesity", "NTT DATA"];

/** Client logos from pr-one.com (paths under ASSET_BASE). */
export const clients = [
  { name: "UiPath", logo: "images/logo/uipath.jpg" },
  { name: "Client", logo: "images/logo/client_6.png" },
  { name: "Client", logo: "images/logo/it/client_7.png" },
  { name: "Hitachi Vantara", logo: "images/logo/Event/HDS_Logo_Digital_AccelerateRed.png" },
  { name: "Aruba", logo: "images/logo/aruba.webp" },
  { name: "Cohesity", logo: "images/logo/Event/Cohesity-Data-Management.jpg" },
  { name: "Cisco", logo: "images/logo/cisco.jpg" },
  { name: "Dell", logo: "images/logo/dell.webp" },
  { name: "Yip In Tsoi", logo: "images/logo/yipinsoi.png" },
  { name: "NHB", logo: "images/logo/nhb.png" },
  { name: "Fujitsu", logo: "images/logo/Fujitsu-Logo.png" },
  { name: "DGA", logo: "images/logo/AW_DGA_logo.jpg" },
  { name: "itSMF", logo: "images/logo/itSMF.png" },
  { name: "Lenovo", logo: "images/logo/lenovo.jpg" },
  { name: "G-Able", logo: "images/logo/gable.webp" },
  { name: "Client", logo: "images/logo/fpatana.jpeg" },
  { name: "NASDA", logo: "images/logo/NASDA-logo.png" },
  { name: "Polycom", logo: "images/logo/304px-Polycom_logo_2012.svg.png" },
  { name: "Sitecore", logo: "images/logo/SiteCore.png" },
  { name: "FindExpo", logo: "images/logo/findexpo.png" },
  { name: "Oracle", logo: "images/logo/oracle.png" },
  { name: "Client", logo: "images/logo/kstj.png" },
  { name: "Trecon", logo: "images/logo/cropped-trecon-logo.png" },
  { name: "Huawei", logo: "images/logo/huawei.webp" },
  { name: "CEMS Global", logo: "images/logo/PR/Cems Global.jpg" },
  { name: "Client", logo: "images/logo/it/client_2.png" },
  { name: "UOB The FinLab", logo: "images/logo/PR/UOB FinLab.jpg" },
  { name: "SIPA", logo: "images/logo/sipa-logo.webp" },
  { name: "TIPCO", logo: "images/logo/PR/TIPCO.jpg" },
  { name: "TMA", logo: "images/logo/PR/TMA.jpg" },
  { name: "Client", logo: "images/logo/macou_1.png" },
  { name: "Benz BKK Group", logo: "images/logo/Event/Benz Bkk Group.jpg" },
  { name: "Infor", logo: "images/logo/Infor_Primary.png" },
  { name: "SVOA", logo: "images/logo/SVOA.png" },
  { name: "Malee", logo: "images/logo/malee.png" },
  { name: "TLSG", logo: "images/logo/TLSG.png" },
  { name: "Tricentis", logo: "images/logo/Tricentis-logo-1.jpg" },
  { name: "Ying Charoen Market", logo: "images/logo/Yingcharoen Market.jpg" },
  { name: "Department of Business Development", logo: "images/logo/dbd.jpg" },
  { name: "NT Cloud", logo: "images/logo/NT Clound.jpg" },
  { name: "TGPRO", logo: "images/logo/TGPRO.jpg" },
  { name: "Bosch", logo: "images/logo/Logo-Bosch.jpg" },
  { name: "Westcon", logo: "images/logo/Westcon.jpg" },
  { name: "Organ Donation Center", logo: "images/logo/orgrandonate.jpg" },
  { name: "Client", logo: "images/logo/Sc.jpg" },
  { name: "SCG", logo: "images/logo/SCG.jpg" },
  { name: "Anixter", logo: "images/logo/anixter.png" },
  { name: "Midea", logo: "images/logo/midea-logo.png" },
  { name: "Air Macau", logo: "images/logo/air_macau.png" },
  { name: "STT GDC", logo: "images/logo/STT_GDC_PMS_Coated.jpg" },
  { name: "Avon", logo: "images/logo/avon.png" },
  { name: "Client", logo: "images/logo/arttl.jpeg" },
  { name: "NTT", logo: "images/logo/NTT.jpg" },
  { name: "Shinwa", logo: "images/logo/shinwa.jpg" },
  { name: "SunGard", logo: "images/logo/sungard.png" },
  { name: "The Coast", logo: "images/logo/thecoast.png" },
  { name: "Menam", logo: "images/logo/menam.png" },
  { name: "Emperor", logo: "images/logo/emperor.jpeg" },
  { name: "Printsiri", logo: "images/logo/printsiri.png" },
  { name: "JobsDB", logo: "images/logo/jobDB.jpg" },
  { name: "Ping Identity", logo: "images/logo/Ping.png" },
  { name: "Client", logo: "images/logo/168.gif" },
  { name: "dtac", logo: "images/logo/dtac-logo1.gif" },
  { name: "CAT Telecom", logo: "images/logo/cat.jpg" },
  { name: "TGPRO New Energy", logo: "images/logo/tgpro_new_energy_logo.jpeg" },
  { name: "ASA", logo: "images/logo/asa.jpeg" },
];

export const companyLogo = "PROneNewLogo-1.png";
export const favicon = "favicon.png";

export const socials = {
  lineId: "@[LINE-ID]",
  lineUrl: "#connect",
  facebook: "#connect",
  linkedin: "#connect",
  youtube: "#connect",
  instagram: "#connect",
};

export const contacts = [
  { dept: "EVENTS", name: "Chuenboon Ponglumchiak", role: "Event Director", email: "chuenboon@pr-one.com", phone: "+66 61 928 2441" },
  { dept: "PR & MEDIA", name: "Patthira Buri", role: "PR Director", email: "patthira@pr-one.com", phone: "+66 81 636 0452" },
  { dept: "MANAGEMENT", name: "Wanya Chareonpo", role: "Managing Director", email: "wanya@pr-one.com", phone: "+66 81 300 2633" },
];

export const company = {
  name: "PR One Network Co., Ltd.",
  taxId: "0105547031240",
  address: "206 Soi Ram Inthra 57, Ram Inthra Rd., Tha Raeng, Bang Khen, Bangkok 10220",
  mainPhone: "+66 81 300 2633",
  replyTime: "[2 working days]",
};

export const telHref = (phone: string) => "tel:" + phone.replace(/[^+\d]/g, "");
