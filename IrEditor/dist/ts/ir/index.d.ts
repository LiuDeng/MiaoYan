/// <reference types="./types" />
declare class IR {
    range: Range;
    element: HTMLPreElement;
    processTimeoutId: number;
    composingLock: boolean;
    preventInput: boolean;
    constructor(vditor: IVditor);
    private copy;
    private bindEvent;
}
export { IR };
