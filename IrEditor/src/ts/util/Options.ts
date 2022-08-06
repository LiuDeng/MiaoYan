import { Constants } from "../constants";
import { merge } from "./merge";

export class Options {
  public options: IOptions;
  private defaultOptions: IOptions = {
    rtl: false,
    after: undefined,
    cache: {
      enable: true,
    },
    cdn: Constants.CDN,
    classes: {
      preview: "",
    },

    fullscreen: {
      index: 90,
    },
    height: "auto",
    icon: null,
    lang: "zh_CN",
    mode: "ir",
    placeholder: "",
    preview: {
      actions: ["desktop", "tablet", "mobile", "mp-wechat", "zhihu"],
      delay: 1000,
      hljs: Constants.HLJS_OPTIONS,
      markdown: Constants.MARKDOWN_OPTIONS,
      math: Constants.MATH_OPTIONS,
      maxWidth: 800,
      mode: "both",
      theme: Constants.THEME_OPTIONS,
    },
    theme: "classic",
    undoDelay: 800,
    value: "",
    width: "auto",
  };

  constructor(options: IOptions) {
    this.options = options;
  }

  public merge(): IOptions {
    if (this.options) {

      if (this.options.preview?.theme?.list) {
        this.defaultOptions.preview.theme.list = this.options.preview.theme.list;
      }

    }

    const mergedOptions = merge(this.defaultOptions, this.options);

    if (mergedOptions.cache.enable && !mergedOptions.cache.id) {
      throw new Error(
        "need options.cache.id, see https://ld246.com/article/1549638745630#options",
      );
    }

    return mergedOptions;
  }

}
