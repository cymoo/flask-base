
// highlight menu-item selected
function highlightMenu(menuSelector, paths, activeClassName='active') {
    let menu = document.querySelector(menuSelector)
    if (menu) {
        let pathname = location.pathname
        let links = menu.querySelectorAll('a')
        for (let i = 0; i < paths.length; i++) {
            if (paths[i] === pathname) {
                links[i].classList.add(activeClassName)
                break
            }
        }
    }
}


module.exports = {
    'highlightMenu': highlightMenu
}