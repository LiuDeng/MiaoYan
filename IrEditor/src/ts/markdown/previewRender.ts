import { Constants } from "../constants";
import { setContentTheme } from "../ui/setContentTheme";
import { addScript } from "../util/addScript";
import { merge } from "../util/merge";
import { anchorRender } from "./anchorRender";
import { codeRender } from "./codeRender";
import { highlightRender } from "./highlightRender";
import { mathRender } from "./mathRender";
import { mermaidRender } from "./mermaidRender";
import { plantumlRender } from "./plantumlRender";
import { setLute } from "./setLute";

const mergeOptions = (options?: IPreviewOptions) => {
  const defaultOption: IPreviewOptions = {
    anchor: 0,
    cdn: Constants.CDN,
    customEmoji: {},
    emojiPath: `${
      (options && options.emojiPath) || Constants.CDN
    }/dist/images/emoji`,
    hljs: Constants.HLJS_OPTIONS,
    icon: "ant",
    lang: "zh_CN",
    markdown: Constants.MARKDOWN_OPTIONS,
    math: Constants.MATH_OPTIONS,
    mode: "light",
    speech: {
      enable: false,
    },
    theme: Constants.THEME_OPTIONS,
  };
  return merge(defaultOption, options);
};

export const md2html = (mdText: string, options?: IPreviewOptions) => {
  const mergedOptions = mergeOptions(options);
  return addScript(`${mergedOptions.cdn}/dist/js/lute/lute.min.js`, "vditorLuteScript").then(() => {
    const lute = setLute({
      autoSpace: mergedOptions.markdown.autoSpace,
      codeBlockPreview: mergedOptions.markdown.codeBlockPreview,
      fixTermTypo: mergedOptions.markdown.fixTermTypo,
      footnotes: mergedOptions.markdown.footnotes,
      headingAnchor: mergedOptions.anchor !== 0,
      inlineMathDigit: mergedOptions.math.inlineDigit,
      lazyLoadImage: mergedOptions.lazyLoadImage,
      linkBase: mergedOptions.markdown.linkBase,
      linkPrefix: mergedOptions.markdown.linkPrefix,
      listStyle: mergedOptions.markdown.listStyle,
      mark: mergedOptions.markdown.mark,
      mathBlockPreview: mergedOptions.markdown.mathBlockPreview,
      paragraphBeginningSpace: mergedOptions.markdown.paragraphBeginningSpace,
      sanitize: mergedOptions.markdown.sanitize,
      toc: mergedOptions.markdown.toc,
    });
    if (options?.renderers) {
      lute.SetJSRenderers({
        renderers: {
          Md2HTML: options.renderers,
        },
      });
    }
    lute.SetHeadingID(true);
    return lute.Md2HTML(mdText);
  });
};

export const previewRender = async (previewElement: HTMLDivElement, markdown: string, options?: IPreviewOptions) => {
  const mergedOptions: IPreviewOptions = mergeOptions(options);
  let html = await md2html(markdown, mergedOptions);
  if (mergedOptions.transform) {
    html = mergedOptions.transform(html);
  }
  previewElement.innerHTML = html;
  previewElement.classList.add("vditor-reset");

  setContentTheme(mergedOptions.theme.current, mergedOptions.theme.path);
  if (mergedOptions.anchor === 1) {
    previewElement.classList.add("vditor-reset--anchor");
  }
  codeRender(previewElement);
  highlightRender(mergedOptions.hljs, previewElement, mergedOptions.cdn);
  mathRender(previewElement, {
    cdn: mergedOptions.cdn,
    math: mergedOptions.math,
  });
  mermaidRender(previewElement, mergedOptions.cdn, mergedOptions.mode);
  plantumlRender(previewElement, mergedOptions.cdn);

  if (mergedOptions.anchor !== 0) {
    anchorRender(mergedOptions.anchor);
  }
  if (mergedOptions.after) {
    mergedOptions.after();
  }
};
