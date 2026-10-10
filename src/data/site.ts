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

export type RoadmapItem = { client: string; title: string; type: string };

export const roadmap: { year: string; theme: string; items: RoadmapItem[] }[] = [
  {
    year: "2020–23",
    theme: "Brand launches & press",
    items: [
      { client: "Ying Charoen Market", title: "Kid Jak Khlong volunteer day 2023", type: "PR" },
      { client: "Ying Charoen Market", title: "Joins forces with depa 2022", type: "PR" },
      { client: "Miss Grand", title: "Miss Grand Mae Hong Son 2022", type: "PR" },
      { client: "Breastfeeding Society", title: "Uniting for a Sustainable Breastfeeding Society 2022", type: "SEMINAR" },
      { client: "TIPCO", title: "TIPCO NEXT Meet The Press 2021", type: "PR" },
      { client: "UOB & The FinLab", title: "15 Thai SMEs transform digitally 2020", type: "PR" },
      { client: "Kidney Project", title: "Kidney Transplantation Project in Celebration 2020", type: "PR" },
      { client: "Mr. Pizza", title: "Grand Opening Event 2020", type: "LAUNCH" },
    ],
  },
  {
    year: "2024",
    theme: "Causes & community",
    items: [
      { client: "World Organ Donation Day", title: "Give LIFE Get LIVES 2024", type: "PR" },
      { client: "Run with Wings", title: "Run with Wings Charity Run 2024", type: "PR" },
    ],
  },
  {
    year: "2025",
    theme: "APAC kick-offs & data events",
    items: [
      { client: "Tricentis", title: "Partner Kick Off APAC 2025", type: "KICK-OFF" },
      { client: "Infor", title: "APJ Sales Kick Off 2025", type: "KICK-OFF" },
      { client: "NTT DATA", title: "Transformation NOW! Thailand 2025", type: "SUMMIT" },
      { client: "Snowflake", title: "Data & AI Innovation Day Bangkok 2025", type: "SUMMIT" },
      { client: "Cohesity", title: "Catalyst on the Road — Resilience Everywhere 2025", type: "ROADSHOW" },
      { client: "CyberArk", title: "CyberArk Bangkok 2025", type: "SEMINAR" },
      { client: "Thailand Trader Fair", title: "Thailand Trader Fair 2025", type: "EXHIBITION" },
    ],
  },
  {
    year: "2026",
    theme: "Tech summits at scale",
    items: [
      { client: "Asia Sourcing Show", title: "Press Conference — Asia Sourcing Show 2026", type: "PR" },
      { client: "Ping Identity", title: "State of Trust 2026", type: "SEMINAR" },
      { client: "UiPath", title: "Fusion Summit Bangkok 2026", type: "SUMMIT" },
      { client: "STT GDC", title: "Practical Insights Bangkok 2026", type: "SEMINAR" },
      { client: "Cohesity", title: "Resilience Everywhere 2026", type: "SEMINAR" },
      { client: "Benz BKK", title: "The Endless Appreciation Concert 2026", type: "CUSTOMER EVENT" },
      { client: "Thailand Trader Fair", title: "Thailand Trader Fair 2026", type: "EXHIBITION" },
      { client: "Your brand", title: "[Your next event — Q4 2026 dates open]", type: "OPEN SLOT" },
    ],
  },
];

export const stats = [
  { value: "2004", label: "Organizing events since" },
  { value: "60+", label: "Brands we have worked with" },
  { value: "[XXX]", label: "Events delivered" },
  { value: "[XX,XXX]", label: "Attendees registered" },
  { value: "3 modes", label: "Physical · Hybrid · Virtual", accent: true },
];

export const services = [
  { title: "Seminars & Summits", body: "Seminars, summits, product launches, exhibitions and customer events — physical, hybrid or live-streamed." },
  { title: "Audience & Lead Generation", body: "Targeted IT decision-maker database, email invitations, telemarketing follow-up and daily registration reports." },
  { title: "PR & Media", body: "Press conferences, media invitations and coverage across Thai tech and business outlets." },
  { title: "Creative & Content", body: "Key visuals, event microsites, social content, photo and video — designed in-house, revised with you." },
];

export const industries = [
  "Automotive", "Telco", "Manufacturing", "Real Estate", "Retail & Food",
  "Finance", "Healthcare & Non-profit", "Trade Fairs",
];

export const trustedBy = ["Cisco", "Oracle", "Dell", "Huawei", "Lenovo", "UiPath", "Cohesity", "NTT DATA"];

export const clients = [
  "Cisco", "Dell", "Oracle", "Huawei", "Lenovo", "Fujitsu", "UiPath", "Cohesity", "NTT DATA",
  "Infor", "Tricentis", "Ping Identity", "Sitecore", "Aruba", "Westcon", "STT GDC", "Bosch", "SCG",
  "Benz BKK", "Midea", "Malee", "TIPCO", "UOB", "Ying Charoen Market",
];

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
