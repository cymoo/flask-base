/*
序列化表单
1. 对表单字段的名称和值进行 URL 编码，使用和号(&)分隔。
2. 不发送禁用的表单字段。
3. 只发送勾选的复选框和单选按钮。
4. 不发送 type 为'reset'和'button'的按钮。
5. 多选选择框中的每个选中的值单独一个条目。
6. 在单击提交按钮提交表单的情况下，也会发送提交按钮否则，不发送提交按钮。也包括 type 为'image'的<input>元素。
7. <select>元素的值，就是选中的<option>元素的 value 特性的值。如果<option>元素没有 value 特性，则是<option>元素的文本值。
8. 在表单序列化过程中，一般不包含任何按钮字段，因为结果字符串很可能是通过其他方式提交的 除此之外的其他上述规则都应该遵循。
 */
export function serializeForm(form){
        let parts = [],
            field = null,
            i,
            len,
            j,
            optLen,
            option,
            optValue
        for (i = 0, len = form.elements.length; i < len; i++) {
            field = form.elements[i]
            switch(field.type){
                case 'select-one':
                case 'select-multiple':
                    if (field.name.length){
                        for (j = 0, optLen = field.options.length; j < optLen; j++) {
                            option = field.options[j]
                            if (option.selected) {
                                optValue = ""
                                if (option.hasAttribute) {
                                    optValue = (option.hasAttribute('value') ? option.value : option.text)
                                } else {
                                    optValue = (option.attributes['value'].specified ? option.value : option.text)
                                }
                                parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(optValue))
                            }
                        }
                    }
                    break
                case undefined:             // 字段集
                case 'file':                // 文件输入
                case 'submit':              // 提交按钮
                case 'reset':               // 重置按钮
                case 'button':              // 自定义按钮
                    break
                case 'radio':               // 单选按钮
                case 'checkbox':            // 复选按钮
                    if (!field.checked){
                        break
                    }
                // 执行默认操作
                default:
                    // 不包含没有名字的表单字段
                    if (field.name.length){
                        parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value))
                    }
            }
        }
        return parts.join('&')
}

