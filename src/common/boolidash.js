
export const toObject = (obj, keyName) => {
    const map = {};
    const key = obj[keyName];
    map[key] = obj;
    return map;
};

export const slice0 = (obj) => {
    const restMap = { ...obj };
    const key1 = Object.keys(restMap)[0];
    let item1 = {};
    item1[key1] = restMap[key1];
    delete restMap[key1];

    return [item1, restMap];
};
