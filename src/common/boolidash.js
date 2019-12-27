
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

// http://www.robweir.com/blog/2010/02/microsoft-random-browser-ballot.html
export const shuffle = (array) => array.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);


export const keyBy = (array, key) => (array || []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {});
export const uniqBy = (arr, fn) => [...new Map(arr.reverse().map((x) => [typeof fn === 'function' ? fn(x) : x[fn], x])).values()];
