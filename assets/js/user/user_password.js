$(function () {
    // 密码的校验规则
    let form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if ($('[name=oldPwd]').val() == value) {
                return '新密码不能与旧密码相同'
            }
        },
        rePwd: function (value) {
            if ($('[name=newPwd]').val() !== value) {
                return '新密码两次输入不一致'
            }
        }
    })
})

// 给表单注册提交事件（点击修改密码可以实现修改密码）
let layer = layui.layer
$('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: '/my/updatepwd',
        data: $(this).serialize(),
        success: function (res) {
            // const {status,message} = res
            if (res.status !== 0) {
                console.log(res);
                return layer.msg(res.message)
            }
            layer.msg('更新密码成功！')
            // 重置表单
            $('.layui-form')[0].reset()
        }
    })
})