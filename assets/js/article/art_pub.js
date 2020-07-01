$(function () {
    let layer = layui.layer
    let form = layui.form

    initCate()
    // 文本编辑器
    initEditor()
    // 定义加载文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败！')
                }
                // 调用模板引擎，渲染分类的下拉菜单
                var htmlStr = template('tpl-cate', res)
                $('[name = cate_id]').html(htmlStr)
                // 一定要记得调用 form.render() 方法
                form.render()
            }
        })
    }

    // 图片裁剪区域
    // 1. 初始化图片裁剪器
    var $image = $('#image')
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 给选择封面按钮注册事件
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
        // 监听 coverFile 的 change 事件，获取用户选择的文件列表
        $('#coverFile').on('change', function (e) {
            // 获取到文件的列表数组
            let files = e.target.files
            // 判断用户是否选择了文件
            if (files.length === 0) {
                return
            }
            // 根据文件，创建对应的 URL 地址
            let newImageUrl = URL.createObjectURL(files[0])
            // 为裁剪区域重新设置图片
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImageUrl) //给图片添加新路径
                .cropper(options)
        })
    })

    // 定义文章的发布状态
    const ART_PUB = '已发布'
    const ART_DRAFT = '草稿'
    let state = ART_PUB

    // 给存为草稿按钮注册点击事件
    $('#btn_save_draft').on('click', function () {
        state = ART_DRAFT
    })

    // 给form表单注册提交事件
    $('#form_pub').on('submit', function (e) {
        // 阻止默认提交
        e.preventDefault()
        // 创建FormData对象
        let fd = new FormData($(this)[0])
        console.log(this);
        // 将文章的发布状态存到fd中
        fd.append('state', state)
        $image.cropper('getCroppedCanvas', {
            // 创建画布
            width: 400,
            height: 280
        }).toBlob(function (blob) {
            // 将文件存储到fd
            fd.append('cover_img', blob)
            publishArticle(fd)
        })
    })

    // 发布文章
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            // 注意：如果向服务器提交的是 FormData 格式的数据，
            // 必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                debugger
                layer.msg('发布文章成功！')
                // 发布文章成功后，跳转到文章列表页面
                location.href = '/bigNews/article/art_list.html'
            }
        })
    }

})