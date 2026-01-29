export const SITE = {
  website: "https://blog.xjj.sh",
  author: "Eric Xing",
  profile: "https://github.com/exing567",
  desc: "1000%业余程序员的研究基地",
  title: "XJJ后花园",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 5,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // 返回按钮显示
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/exing567/myblog/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "zh-CN", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Shanghai", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
