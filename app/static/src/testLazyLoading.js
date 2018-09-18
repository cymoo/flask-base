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
