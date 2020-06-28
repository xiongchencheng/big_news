$(function () {
    function getUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'GET',
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function (res) {
                const { status, data } = res
                if (status !== 0) {
                    return latui.layer.msg('获取用户信息失败')
                }
                // 调用renderAvatar 渲染用户头像
                renderAvatar(data)
            },
            // complete: function (res) {
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '获取用户信息失败') {
            //         // 清空token
            //         localStorage.removeItem('token')
            //         // 强制跳转到登陆页面
            //         location.href = '/bigNews/login.html'
            //     }
            // }
        })
        // let layer = layui.layer
        $('#btnLogout').on('click', function () {
            layer.confirm('确定退出登陆?', {icon: 3, title:'提示'}, function(index){
                // 清除本地存储的token
                localStorage.removeItem('token')
                // 重新跳转到登陆页面
                location.href = '/bigNews/login.html'
                layer.close(index);
              });
        })
    }

    function renderAvatar(user) {
        // 获取用户名称
        let name = user.nickname || user.username
        // 设置欢迎的文本
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 按需渲染用户的头像
        if (user.user_pic !== null) {
            // 渲染图片头像
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            // 渲染文本头像
            $('.layui-nav-img').hide()
            let first = name[0].toUpperCase
            $('.text-avatar').html(first).show()
        }
    }

})