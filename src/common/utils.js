
const isHebrew = text => /[א-ת]+/.test(text);
export const isRtl = text => isHebrew(text);
export const isNum = text => /[0-9]/.test(text);


export const validateRequired = (val) => {
    return val && val.trim().length > 0;
};
export const validateEmail = (val) => {
    return validateRequired(val) && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val);
};
export const validateName = (val) => {
    return validateRequired(val); // && val.trim().length >= 5;
};
export const validatePassword = (val) => {
    return validateRequired(val) && val.trim().length >= 6;
};
