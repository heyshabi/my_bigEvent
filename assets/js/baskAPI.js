//当用到post，get，ajax请求都会调用这个函数
//这样网站如果有变 只需修改这里即可
$.ajaxPrefilter(function (options) {
    options.url = 'http://127.0.0.1:3070' + options.url;
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        if (res.responseJSON.status === 1 & res.responseJSON.message === '身份验证失败') {
            //清空token
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
})