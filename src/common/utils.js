
const isHebrew = text => /[א-ת]+/.test(text);
export const isRtl = text => isHebrew(text);

export const isNum = text => /[0-9]/.test(text);
