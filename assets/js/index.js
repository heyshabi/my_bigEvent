// const { render } = require("express/lib/application");

$(function () {
    getUserInfo();
    var layer = layui.layer;
    //实现点击退出功能
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
            //退出后跳转登录页面 清空本地存储token
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
        });
    })

})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户失败')
            }
            renderAvatar(res.data);
        }
        //无论成功或失败 都会调用complete
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 & res.responseJSON.message === '身份验证失败') {
        //         //清空token
        //         localStorage.removeItem('token');
        //         location.href = '/login.html';
        //     }
        // }
    })
}
//渲染头像
function renderAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toupperCase()
        $('.text-avatar').html(first).show()
    }
}
