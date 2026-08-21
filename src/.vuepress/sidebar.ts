import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "使用说明",
      icon: "book",
      prefix: "guide/",
      link: "guide/",
      children: "structure",
    },
    // 添加你的侧边栏结构，例如：
    // {
    //   text: "文章",
    //   icon: "book",
    //   prefix: "posts/",
    //   children: "structure",
    // },
  ],
});