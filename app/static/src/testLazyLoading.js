<<<<<<< HEAD
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
=======
// test lazy loading
function component() {
    let button = document.createElement('button')
    button.innerText =  'Click me and look at the console'
    button.addEventListener('click', event => {
        import('./utils/hello.js').then(module => {
            let print = module.default
            print()
        })
    })
    return button
}

document.body.appendChild(component())
>>>>>>> b2c1258aa2e85a6c0006d078e0f643e70c03cfe8
