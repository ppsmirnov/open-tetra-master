export const area = (clientRect1, clientRect2) => {

    const xOverlap = Math.max(0,
        Math.min(clientRect1.right,clientRect2.right) - Math.max(clientRect1.left,clientRect2.left));
    const yOverlap = Math.max(0, Math.min(clientRect1.bottom, clientRect2.bottom) -
        Math.max(clientRect1.top, clientRect2.top));

    return xOverlap * yOverlap;
};