/* 用JS模拟发起POST请求，并跳转页面 */
// TODO: 用原生JS重写
export function standardPost(url, args) {
    let form = $("<form method='post'></form>")
    form.attr({ 'action': url })
    for (let arg in args) {
        if (args.hasOwnProperty(arg)) {
            let input = $("<input type='hidden'>")
            input.attr({ 'name': arg })
            input.val(args[arg])
            form.append(input)
        }
    }
    $(document.body).append(form)
    form.submit()
}

