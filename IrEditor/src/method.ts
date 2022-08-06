import {codeRender} from "./ts/markdown/codeRender";
import {highlightRender} from "./ts/markdown/highlightRender";
import {mathRender} from "./ts/markdown/mathRender";
import {mermaidRender} from "./ts/markdown/mermaidRender";
import {plantumlRender} from "./ts/markdown/plantumlRender";
import {md2html, previewRender} from "./ts/markdown/previewRender";
import {previewImage} from "./ts/preview/image";

class Vditor {

    public static previewImage = previewImage;
    /** 为 element 中的代码块添加复制按钮 */
    public static codeRender = codeRender;
    /** 为 element 中的代码块进行高亮渲染 */
    public static highlightRender = highlightRender;
    /** 对数学公式进行渲染 */
    public static mathRender = mathRender;
    /** 流程图/时序图/甘特图渲染 */
    public static mermaidRender = mermaidRender;
    /** plantuml渲染 */
    public static plantumlRender = plantumlRender;

    /** Markdown 文本转换为 HTML，该方法需使用[异步编程](https://ld246.com/article/1546828434083?r=Vaness) */
    public static md2html = md2html;
    /** 页面 Markdown 文章渲染 */
    public static preview = previewRender;
}

export default Vditor;
