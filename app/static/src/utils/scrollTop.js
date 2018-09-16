/* duration: 动画持续的时间, 默认为1000ms */
export function scrollToTop(ele, duration) {
    const MIN_INTERVAL = 16
    if (duration === undefined) { duration = 300 }
    let currentTop = ele.scrollTop
    let step = Math.floor(currentTop / (duration / MIN_INTERVAL))

    function _scroll() {
        currentTop -= step
        if (currentTop <= step) { ele.scrollTop = 0 }
        else {
            ele.scrollTop = currentTop
            setTimeout(_scroll, MIN_INTERVAL)
        }
    }
    setTimeout(_scroll, MIN_INTERVAL)
}
