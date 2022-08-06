export const getMarkdown = (vditor: IVditor) => {
  return vditor.lute.VditorIRDOM2Md(vditor.ir.element.innerHTML);
};
