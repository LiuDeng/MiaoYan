import {Constants} from "../constants";
import {accessLocalStorage} from "../util/compatibility";
import {setContentTheme} from "./setContentTheme";
import {setTheme} from "./setTheme";

declare global {
  interface Window {
    visualViewport: HTMLElement;
  }
}

export const initUI = (vditor: IVditor) => {
  vditor.element.innerHTML = "";
  vditor.element.classList.add("vditor");
  // 支持 RTL
  if (vditor.options.rtl) {
    vditor.element.setAttribute("dir", "rtl")
  }
  setTheme(vditor);
  setContentTheme(vditor.options.preview.theme.current, vditor.options.preview.theme.path);
  if (typeof vditor.options.height === "number") {
    vditor.element.style.height = vditor.options.height + "px";
  } else {
    vditor.element.style.height = vditor.options.height;
  }
  if (typeof vditor.options.minHeight === "number") {
    vditor.element.style.minHeight = vditor.options.minHeight + "px";
  }
  if (typeof vditor.options.width === "number") {
    vditor.element.style.width = vditor.options.width + "px";
  } else {
    vditor.element.style.width = vditor.options.width;
  }


  const contentElement = document.createElement("div");
  contentElement.className = "vditor-content";



  contentElement.appendChild(vditor.ir.element.parentElement);

  vditor.element.appendChild(contentElement);

  document.execCommand("DefaultParagraphSeparator", false, "p");

};

export const setPadding = (vditor: IVditor) => {
  const minPadding = window.innerWidth <= Constants.MOBILE_WIDTH ? 10 : 35;
  if (vditor.ir.element.parentElement.style.display !== "none") {
    const padding = (vditor.ir.element.parentElement.clientWidth
      - vditor.options.preview.maxWidth) / 2;
    vditor.ir.element.style.padding = `10px ${Math.max(minPadding, padding)}px`;
  }

};

export const setTypewriterPosition = (vditor: IVditor) => {
  if (!vditor.options.typewriterMode) {
    return;
  }
};

let resizeCb: () => void;

export function UIUnbindListener() {
  window.removeEventListener("resize", resizeCb);
}

const afterRender = (vditor: IVditor) => {
  setTypewriterPosition(vditor);
  UIUnbindListener();
  window.addEventListener("resize", resizeCb = () => {
    setPadding(vditor);
    setTypewriterPosition(vditor);
  });

  // set default value
  let initValue = accessLocalStorage() && localStorage.getItem(vditor.options.cache.id);
  if (!vditor.options.cache.enable || !initValue) {
    if (vditor.options.value) {
      initValue = vditor.options.value;
    } else if (vditor.originalInnerHTML) {
      initValue = vditor.lute.HTML2Md(vditor.originalInnerHTML);
    } else if (!vditor.options.cache.enable) {
      initValue = "";
    }
  }
  return initValue || "";
};
