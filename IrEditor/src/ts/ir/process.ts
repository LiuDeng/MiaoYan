import {Constants} from "../constants";
import {getMarkdown} from "../markdown/getMarkdown";
import {accessLocalStorage} from "../util/compatibility";
import {hasClosestBlock, hasClosestByAttribute} from "../util/hasClosest";
import {getEditorRange, getSelectPosition} from "../util/selection";
import {input} from "./input";

export const processHint = (vditor: IVditor) => {
    vditor.hint.render(vditor);
    const startContainer = getEditorRange(vditor).startContainer;
    // 代码块语言提示
    const preBeforeElement = hasClosestByAttribute(startContainer, "data-type", "code-block-info");
    if (preBeforeElement) {
        if (preBeforeElement.textContent.replace(Constants.ZWSP, "") === "" && vditor.hint.recentLanguage) {
            preBeforeElement.textContent = Constants.ZWSP + vditor.hint.recentLanguage;
            const range = getEditorRange(vditor);
            range.selectNodeContents(preBeforeElement);
        } else {
            const matchLangData: IHintData[] = [];
            const key =
                preBeforeElement.textContent.substring(0, getSelectPosition(preBeforeElement, vditor.ir.element).start)
                    .replace(Constants.ZWSP, "");
            Constants.CODE_LANGUAGES.forEach((keyName) => {
                if (keyName.indexOf(key.toLowerCase()) > -1) {
                    matchLangData.push({
                        html: keyName,
                        value: keyName,
                    });
                }
            });
            vditor.hint.genHTML(matchLangData, key, vditor);
        }
    }
};

export const processAfterRender = (vditor: IVditor, options = {
    enableAddUndoStack: true,
    enableHint: false,
    enableInput: true,
}) => {
    if (options.enableHint) {
        processHint(vditor);
    }

    clearTimeout(vditor.ir.processTimeoutId);
    vditor.ir.processTimeoutId = window.setTimeout(() => {
        if (vditor.ir.composingLock) {
            return;
        }
        const text = getMarkdown(vditor);
        if (typeof vditor.options.input === "function" && options.enableInput) {
            vditor.options.input(text);
        }

        if (vditor.options.cache.enable && accessLocalStorage()) {
            localStorage.setItem(vditor.options.cache.id, text);
            if (vditor.options.cache.after) {
                vditor.options.cache.after(text);
            }
        }
        if (options.enableAddUndoStack) {
            vditor.undo.addToUndoStack(vditor);
        }
    }, vditor.options.undoDelay);
};

export const processHeading = (vditor: IVditor, value: string) => {
    const range = getEditorRange(vditor);
    const headingElement = hasClosestBlock(range.startContainer) || range.startContainer as HTMLElement;
    if (headingElement) {
        const headingMarkerElement = headingElement.querySelector(".vditor-ir__marker--heading");
        if (headingMarkerElement) {
            headingMarkerElement.innerHTML = value;
        } else {
            headingElement.insertAdjacentText("afterbegin", value);
            range.selectNodeContents(headingElement);
            range.collapse(false);
        }
        input(vditor, range.cloneRange());
    }
};

const removeInline = (range: Range, vditor: IVditor, type: string) => {
    const inlineElement = hasClosestByAttribute(range.startContainer, "data-type", type) as HTMLElement;
    if (inlineElement) {
        inlineElement.firstElementChild.remove();
        inlineElement.lastElementChild.remove();
        range.insertNode(document.createElement("wbr"));
        const tempElement = document.createElement("div");
        tempElement.innerHTML = vditor.lute.SpinVditorIRDOM(inlineElement.outerHTML);
        inlineElement.outerHTML = tempElement.firstElementChild.innerHTML.trim();
    }
};

