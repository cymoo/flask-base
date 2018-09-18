import getElementLeft from './utils/getElementLeft.js'

/* test lazy loading */
function component() {
    let btn = document.createElement('button')
    btn.innerText = 'click me and see the network panel'
    btn.addEventListener('click', () => {
        import('./utils/hello.js').then(module => {
            let add = module.default
            console.log(`sum of 1, 2, 3: ${add(1, 2, 3)}`)
        })
    })
    return btn
}

document.body.appendChild(component())