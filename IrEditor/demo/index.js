import Vditor from "../src/index"
import "../src/assets/less/index.less"

// new VConsole()

const initVditor = (language) => {
  window.vditor = new Vditor("vditor", {
    _lutePath: "src/js/lute/lute.min.js",
    cdn: "http://localhost:9000",
    toolbar: [],
    lang: language,
    mode: "ir",
    height: window.innerHeight + 100,

    preview: {
      markdown: {
        toc: true,
        mark: true,
        footnotes: true,
        autoSpace: true,
      },
      math: {
        engine: "KaTeX",
      },
    },
    hint: {
      emojiPath: "https://unpkg.com/vditor@1.8.3/dist/images/emoji",
      emojiTail:
        '<a href="https://ld246.com/settings/function" target="_blank">设置常用表情</a>',
      emoji: {
        sd: "💔",
        j: "https://unpkg.com/vditor@1.3.1/dist/images/emoji/j.png",
      },
      parse: false,
      extend: [],
    },
    tab: "\t",
  })
}
initVditor("zh_CN")
window.setLang = (language) => {
  window.vditor.destroy()
  initVditor(language)
}
