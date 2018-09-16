export function queryStringToObj() {
    let qs = (location.search.length > 0 ? location.search.substring(1): '')
    let args = {};
    let items = qs.length ? qs.split('&') : [];
    let item = null;
    let name = null;
    let value = null;
    let len = items.length;

    for (let i=0; i<len; i++) {
        item = items[i].split('=')
        name = decodeURIComponent(item[0])
        value = decodeURIComponent(item[1])

        if (name.length) {
            args[name] = value
        }
    }
    return args
}

export function objToQueryString(obj) {
    let items = [];
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            items.push(k+'='+obj[k])
        }
    }
    return items.join('&')
}
