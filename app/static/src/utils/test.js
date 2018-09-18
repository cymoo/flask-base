/* JUST FOR TEST */
// NOTE: 需要设置publicPath
console.log('this module has loaded; see the network tab in dev tools')

export default () => {
    console.log('hello lazy loading using import()')
