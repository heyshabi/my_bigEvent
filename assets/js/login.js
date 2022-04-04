$(function () {
    // 点击注册链接隐藏
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })


    //点击登录链接
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //从layui提取from
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        //验证2个密码是否一致
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    //监听表单事件
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        var data = { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password').val() };
        $.post('/my/updatepwd', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功');
            //注册成功触发点击返回登录页面
            $('#link_login').click()
        })
    })
    //监听登录表单提交事件
    $('#form-login').submit(function (e) {
        //阻止默认提交
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功');
                //登录后获取token值
                localStorage.setItem('token', res.token);
                //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})