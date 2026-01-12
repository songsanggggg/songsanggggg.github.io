import { CodeTabs } from "/home/songsanggggg/Desktop/BlogScript/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.86_markdown-it@14.1.0_vuepress@2.0.0-rc.20_@vuep_aca53ab018da1be441e43f5d6782ec93/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "/home/songsanggggg/Desktop/BlogScript/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.86_markdown-it@14.1.0_vuepress@2.0.0-rc.20_@vuep_aca53ab018da1be441e43f5d6782ec93/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "/home/songsanggggg/Desktop/BlogScript/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.86_markdown-it@14.1.0_vuepress@2.0.0-rc.20_@vuep_aca53ab018da1be441e43f5d6782ec93/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
