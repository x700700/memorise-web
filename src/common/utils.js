import consts from "./consts";

const isHebrew = text => /[א-ת]+/.test(text);
export const isRtl = text => isHebrew(text);
export const isNum = text => /^[0-9]/.test(text);

export const captializeWords = words => (words || '').trim().slice(0, consts.ui.inputMaxLength).split(' ').map( w =>  w.substring(0,1).toUpperCase()+ w.substring(1)).join(' ');

export const validateRequired = (val) => {
    return val && val.trim().length > 0;
};
export const validateEmail = (val) => {
    return validateRequired(val) && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val);
};
export const validateName = (val) => {
    return /^[\w-_]{5,}$/.test(val);
};
export const validatePassword = (val) => {
    return validateRequired(val) && val.trim().length >= 6;
};
