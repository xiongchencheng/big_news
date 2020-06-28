// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://127.0.0.1:3007' + options.url
    if (options.url.includes('/my/')) {
        Authorization: localStorage.getItem('token') || ''
    }
    // 挂载ajax请求的complete回调函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '获取用户信息失败') {
            // 清空token
            localStorage.removeItem('token')
            // 强制跳转到登陆页面
            location.href = '/bigNews/login.html'
        }
    }
})