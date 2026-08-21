import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "使用说明",
      icon: "book",
      link: "/guide/",
      children: [
        "/guide/",
        {
          text: "Homebrew 工具集",
          icon: "tools",
          link: "guide/tools/",
          children: [
            "guide/tools/bazel",
            "guide/tools/boost",
            "guide/tools/btop",
            "guide/tools/cling",
            "guide/tools/cmake",
            "guide/tools/docker-desktop",
            "guide/tools/emscripten",
            "guide/tools/exercism",
            "guide/tools/fastfetch",
            "guide/tools/gh",
            "guide/tools/gnupg",
            "guide/tools/gnuplot",
            "guide/tools/go",
            "guide/tools/htop",
            "guide/tools/imagemagick",
            "guide/tools/latexindent",
            "guide/tools/libsodium",
            "guide/tools/nasm",
            "guide/tools/ninja",
            "guide/tools/ntl",
            "guide/tools/pandoc",
            "guide/tools/pv",
            "guide/tools/ripgrep",
            "guide/tools/tectonic",
            "guide/tools/tldr",
            "guide/tools/typst",
            "guide/tools/wget",
            "guide/tools/xmake",
            "guide/tools/yasm",
          ],
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