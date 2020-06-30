$(function () {
    let layer = layui.layer
    let form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 10) {
                return '昵称长度必须在1-10之间！'
            }
        }
    })
    // initUserInfo函数
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置表单的数据
    $('#resetBtn').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        initUserInfo()
    })

    // 监听表单的提交更新事件
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        // 发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更新用户信息成功！')
                window.parent.getUserInfo()
            }
        })
    })
})