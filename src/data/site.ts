// Static company data (names, contacts, images). All visitor-facing text lives in src/i18n/dictionaries.

/** Images live in public/img (copied from pr-one.com, resized to WebP).
 *  Set NEXT_PUBLIC_ASSET_BASE to serve them from a CDN instead. */
export const ASSET_BASE = (process.env.NEXT_PUBLIC_ASSET_BASE || "/img").replace(/\/$/, "");
export const asset = (path: string) => encodeURI(`${ASSET_BASE}/${path}`);

export const team = [
  { name: "Wanya Chareonpo", role: "md", phone: "+66 81 300 2633", email: "wanya@pr-one.com", photo: "team/wanya600.webp" },
  { name: "Patthira Buri", role: "prDirector", phone: "+66 81 636 0452", email: "patthira@pr-one.com", photo: "team/ann2026-600.webp" },
  { name: "Chuenboon Ponglumchiak", role: "eventDirector", phone: "+66 61 928 2441", email: "chuenboon@pr-one.com", photo: "team/kaew.webp" },
  { name: "Neelawan Satiranon", role: "eventManager", phone: "+66 81 308 5723", email: "neelawan@pr-one.com", photo: "team/bb.webp" },
  { name: "Tanitha Vittayanon", role: "prManager", phone: "+66 86 993 5744", email: "tanitha@pr-one.com", photo: "team/tanitha2026.webp" },
  { name: "Pentida Wisessmit", role: "design", phone: "+66 92 442 3655", email: "pentida@pr-one.com", photo: "team/pentida2026600.webp" },
  { name: "Nampetch Thainiyom", role: "eventAssistant", phone: "+66 61 019 9227", email: "nampetch@pr-one.com", photo: "team/nampetch-600.webp" },
];


export const trustedBy = ["Cisco", "Oracle", "Dell", "Huawei", "Lenovo", "UiPath", "Cohesity", "NTT DATA"];

/** Client logos from pr-one.com (paths under ASSET_BASE). */
export const clients = [
  { name: "UiPath", logo: "clients/uipath.webp" },
  { name: "ServiceNow", logo: "clients/client-6.webp" },
  { name: "Trimble SketchUp", logo: "clients/client-7.webp" },
  { name: "Hitachi Digital Services", logo: "clients/hds-logo-digital-acceleratered.webp" },
  { name: "HPE Aruba", logo: "clients/aruba.webp" },
  { name: "Cohesity", logo: "clients/cohesity-data-management.webp" },
  { name: "Cisco", logo: "clients/cisco.webp" },
  { name: "Dell", logo: "clients/dell.webp" },
  { name: "Yip In Tsoi", logo: "clients/yipinsoi.webp" },
  { name: "NHB", logo: "clients/nhb.webp" },
  { name: "Fujitsu", logo: "clients/fujitsu-logo.webp" },
  { name: "DGA", logo: "clients/aw-dga-logo.webp" },
  { name: "itSMF", logo: "clients/itsmf.webp" },
  { name: "Lenovo", logo: "clients/lenovo.webp" },
  { name: "G-Able", logo: "clients/gable.webp" },
  { name: "Four Pattana Premium", logo: "clients/fpatana.webp" },
  { name: "NASDA", logo: "clients/nasda-logo.webp" },
  { name: "Polycom", logo: "clients/304px-polycom-logo-2012-svg.webp" },
  { name: "Sitecore", logo: "clients/sitecore.webp" },
  { name: "FindExpo", logo: "clients/findexpo.webp" },
  { name: "Oracle", logo: "clients/oracle.webp" },
  { name: "Client", logo: "clients/kstj.webp" },
  { name: "Trecon", logo: "clients/cropped-trecon-logo.webp" },
  { name: "Huawei", logo: "clients/huawei.webp" },
  { name: "CEMS Global", logo: "clients/cems-global.webp" },
  { name: "Cloudflare", logo: "clients/client-2.webp" },
  { name: "UOB The FinLab", logo: "clients/uob-finlab.webp" },
  { name: "SIPA", logo: "clients/sipa-logo.webp" },
  { name: "TIPCO", logo: "clients/tipco.webp" },
  { name: "TMA", logo: "clients/tma.webp" },
  { name: "Client", logo: "clients/macou-1.webp" },
  { name: "Benz BKK Group", logo: "clients/benz-bkk-group.webp" },
  { name: "Infor", logo: "clients/infor-primary.webp" },
  { name: "SVOA", logo: "clients/svoa.webp" },
  { name: "Malee", logo: "clients/malee.webp" },
  { name: "TLSG", logo: "clients/tlsg.webp" },
  { name: "Tricentis", logo: "clients/tricentis-logo-1.webp" },
  { name: "Ying Charoen Market", logo: "clients/yingcharoen-market.webp" },
  { name: "Department of Business Development", logo: "clients/dbd.webp" },
  { name: "NT Cloud", logo: "clients/nt-clound.webp" },
  { name: "TGPRO", logo: "clients/tgpro.webp" },
  { name: "Bosch", logo: "clients/logo-bosch.webp" },
  { name: "Westcon", logo: "clients/westcon.webp" },
  { name: "Organ Donation Center", logo: "clients/orgrandonate.webp" },
  { name: "&SC", logo: "clients/sc.webp" },
  { name: "SCG", logo: "clients/scg.webp" },
  { name: "Anixter", logo: "clients/anixter.webp" },
  { name: "Midea", logo: "clients/midea-logo.webp" },
  { name: "Air Macau", logo: "clients/air-macau.webp" },
  { name: "STT GDC", logo: "clients/stt-gdc-pms-coated.webp" },
  { name: "Avon", logo: "clients/avon.webp" },
  { name: "Art Group", logo: "clients/arttl.webp" },
  { name: "NTT", logo: "clients/ntt.webp" },
  { name: "Shinwa", logo: "clients/shinwa.webp" },
  { name: "SunGard", logo: "clients/sungard.webp" },
  { name: "The Coast", logo: "clients/thecoast.webp" },
  { name: "Menam", logo: "clients/menam.webp" },
  { name: "Emperor", logo: "clients/emperor.webp" },
  { name: "Printsiri", logo: "clients/printsiri.webp" },
  { name: "JobsDB", logo: "clients/jobdb.webp" },
  { name: "Ping Identity", logo: "clients/ping.webp" },
  { name: "Client", logo: "clients/168.webp" },
  { name: "dtac", logo: "clients/dtac-logo1.webp" },
  { name: "CAT Telecom", logo: "clients/cat.webp" },
  { name: "TGPRO New Energy", logo: "clients/tgpro-new-energy-logo.webp" },
  { name: "ASA", logo: "clients/asa.webp" },
];

export const companyLogo = "brand/pr-one-logo.webp";

export const socials = {
  lineId: "@[LINE-ID]",
  lineUrl: "#connect",
  facebook: "#connect",
  linkedin: "#connect",
  youtube: "#connect",
  instagram: "#connect",
};

export const contacts = [
  { dept: "events", name: "Chuenboon Ponglumchiak", role: "eventDirector", email: "chuenboon@pr-one.com", phone: "+66 61 928 2441" },
  { dept: "pr", name: "Patthira Buri", role: "prDirector", email: "patthira@pr-one.com", phone: "+66 81 636 0452" },
  { dept: "management", name: "Wanya Chareonpo", role: "md", email: "wanya@pr-one.com", phone: "+66 81 300 2633" },
];

export const company = {
  name: "PR One Network Co., Ltd.",
  taxId: "0105547031240",
  address: "206 Soi Ram Inthra 57, Ram Inthra Rd., Tha Raeng, Bang Khen, Bangkok 10220",
  mainPhone: "+66 81 300 2633",
};

export const telHref = (phone: string) => "tel:" + phone.replace(/[^+\d]/g, "");
