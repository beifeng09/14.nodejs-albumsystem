function block(req, res, next) {
    // 与nav_check一样 都是所有请求通用的 这里负责的是各种功能的拦截 只有登录之后才可以使用的
    if (req.session.username) {
        // 如果登录了 就可以放行
        next();
        return;
    }
    // 如果没有登录就跳转到登录页面
    res.redirect("/web/index.html");
}
module.exports = block;