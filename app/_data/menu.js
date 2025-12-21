// No type imports needed  

export const groupedMenus = [
  {
    name: "News",
    path: "/news",
  },

  {
    name: "Insights",
    subMenus: [
      { name: "Market Insights", path: "/market-insights" },
      { name: "Market Outlook", path: "/market-outlook" },
      { name: "Merger & Acquisition", path: "/merger-acquisition" },
      { name: "Spotlight", path: "/spotlight" },
      { name: "Weekly Articles", path: "/weekly-article" },
    ],
  },

  {
    name: "Services",
    path: "/services",
  },

  {
    name: "Blogs",
    path: "/blogs",
  },

  {
    name: "Company",
    subMenus: [
      { name: "About Us", path: "/about" },
      { name: "Career", path: "/career" },
    ],
  },
];

export const accountMenu = {
  name: "Account",
  path: "/account",
};
