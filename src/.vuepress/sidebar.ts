import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "使用说明",
      icon: "book",
      prefix: "guide/",
      link: "guide/",
      children: [
        "guide/README",
        {
          text: "Homebrew 工具集",
          icon: "tools",
          link: "guide/tools/",
        },
      ],
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