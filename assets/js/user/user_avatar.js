$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 给上传按钮注册点击事件
    $('#fileUp').on('click', function () {
        $('#file').click()
    })

    // 给上传文件的按钮绑定change事件
    let layer = layui.layer
    $('#file').on('change', function (e) {
        // console.log(e);
        // 上传图片后图片在files伪数组中 并且length为1
        let fileslist = e.target.files
        if (fileslist.length === 0) {
            return layer.msg('请选择照片！')
        }
        // 拿到上传的图片
        let file = e.target.files[0]
        // 将图片转换为url地址
        let imgUrl = URL.createObjectURL(file)
        // 先销毁原来的图片 再添加新的图片
        $image.cropper('destroy')    // 销毁旧的裁剪区域
            .attr('src', imgUrl)  // 重新设置图片路径
            .cropper(options)     // 重新初始化裁剪区域


    })

    $('#sure').on('click', function () {
        // 创建一个 Canvas 画布，将 Canvas 画布上的内容，转化为 base64 格式的字符串
        let dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        // 调用接口，把头像上传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功！')
                window.parent.getUserInfo()
            }
        })
    })
})

