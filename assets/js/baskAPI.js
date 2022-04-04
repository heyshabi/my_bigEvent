//当用到post，get，ajax请求都会调用这个函数
//这样网站如果有变 只需修改这里即可
$.ajaxPrefilter(function (options) {
    options.url = 'http://127.0.0.1:3070' + options.url;
})