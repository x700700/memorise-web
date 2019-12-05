
const isHebrew = text => /[א-ת]+/.test(text);
export const isRtl = text => isHebrew(text);
