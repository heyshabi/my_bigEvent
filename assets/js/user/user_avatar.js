$(function () {
    var layer = layui.layer;
    //获取裁剪区域的dom元素
    var $image = $('#image');
    const options = {
        //指定裁剪框比例
        aspectRatio: 1,
        //指定预览区域
        preview: '.img-preview'
    }
    //创建裁剪区域
    $image.cropper(options);

    //上传按钮绑定点击事件
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    //改变图片选择
    $('#file').on('change', function (e) {
        var filelist = e.target.files;
        if (filelist.length === 0) {
            return layer.msg('请选择照片');
        }
        //拿到用户选择的图片
        var file = e.target.files[0];
        //将文件转化成路径
        var imgURL = URL.createObjectURL(file);
        $image.cropper('destroy').attr('src', imgURL).cropper(options)

    })
    //点击确认上传服务器
    $('#btnUpload').on('click', function () {
        var dataURL = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }).toDataURL('image/png')//转化为base64格式的字符串
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新头像失败')
                }
                layer.msg('更新成功')
                window.parent.getUserInfo();
            }
        })
    })
})