// $自调用
$(function () {
    getUserInfo()
    // 获取第三方layui的layer方法
    let layer = layui.layer
    // 点击按钮 实现退出功能
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登陆?', { icon: 3, title: '提示' }, function (index) {
            // 清除本地存储的token
            localStorage.removeItem('token')
            // 重新跳转到登陆页面
            location.href = '/bigNews/login.html'
            layer.close(index);
        });
    })
})

// getUserInfo函数
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        // 该代码块已经抽离到baseAPI.js中
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                // console.log(res);
                return layer.msg('获取用户信息失败')
            }
            // 调用renderAvatar 渲染用户头像
            renderAvatar(res.data)
        },
        // 该代码块已经抽离到baseAPI.js中
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '获取用户信息失败') {
        //         // 清空token
        //         localStorage.removeItem('token')
        //         // 强制跳转到登陆页面
        //         location.href = '/bigNews/login.html'
        //     }
        // }
    })
}

// renderAvatar函数
function renderAvatar(user) {
    // 获取用户名称
    let name = user.nickname || user.username
    // 设置欢迎的文本
    $('#welcome').html(`欢迎&nbsp;&nbsp; ${name}`)
    // 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}





