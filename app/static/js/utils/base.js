
function throttle(func, context, interval) {
    clearTimeout(func.tId)
    func.tId = setTimeout(function () {
        func.call(context)
    }, interval)
}

function sCopy(obj) {
    let newObj = {}
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            newObj[k] = obj[k]
        }
    }
    return newObj
}

module.exports = {
    'throttle': throttle,
    'sCopy': sCopy
}
