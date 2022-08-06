/// <reference types="./types" />
declare class Vditor {
    static previewImage: (oldImgElement: HTMLImageElement, lang?: "en_US" | "ja_JP" | "ko_KR" | "ru_RU" | "zh_CN" | "zh_TW", theme?: string) => void;
    /** 为 element 中的代码块添加复制按钮 */
    static codeRender: (element: HTMLElement) => void;
    /** 为 element 中的代码块进行高亮渲染 */
    static highlightRender: (hljsOption?: IHljs, element?: HTMLElement | Document, cdn?: string) => void;
    /** 对数学公式进行渲染 */
    static mathRender: (element: HTMLElement, options?: {
        cdn?: string;
        math?: IMath;
    }) => void;
    /** 流程图/时序图/甘特图渲染 */
    static mermaidRender: (element: HTMLElement, cdn: string, theme: string) => void;
    /** plantuml渲染 */
    static plantumlRender: (element?: HTMLElement | Document, cdn?: string) => void;
    /** Markdown 文本转换为 HTML，该方法需使用[异步编程](https://ld246.com/article/1546828434083?r=Vaness) */
    static md2html: (mdText: string, options?: IPreviewOptions) => Promise<string>;
    /** 页面 Markdown 文章渲染 */
    static preview: (previewElement: HTMLDivElement, markdown: string, options?: IPreviewOptions) => Promise<void>;
}
export default Vditor;
