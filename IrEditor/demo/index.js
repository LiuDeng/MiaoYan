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
    tab: "\t",
  })
}
initVditor("zh_CN")
window.setLang = (language) => {
  window.vditor.destroy()
  initVditor(language)
}
