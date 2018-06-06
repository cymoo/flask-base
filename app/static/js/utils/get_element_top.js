
// 元素距离页面顶端的高度
function getElementTop(element) {
    let actualTop = element.offsetTop
    let current = element.offsetParent
    while (current !== null) {
        actualTop += current.offsetTop
        current = current.offsetParent
    }
    return actualTop
}

module.exports = {
    'getElementTop': getElementTop
}