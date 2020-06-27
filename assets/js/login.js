$(function () {
    // 点击去注册按钮
    $('#link_reg').on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show()
    })

    // 点击去登陆按钮
    $('#link_login').on('click', function () {
        $('.login_box').show()
        $('.reg_box').hide()
    })

    // 密码的验证规则
    const form = layui.form
    const layer = layui.layer
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg_box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    // 监听注册点击事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        const inputParams = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', inputParams, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            $('#link_login').click()
        })
    })
    // 监听登陆点击事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登陆成功')
                localStorage.setItem('token', res.token)
                location.href = '/bigNews/index.html'
            }

        })
    })
})