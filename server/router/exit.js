function exit(req, res) {
    // 当点击的时候 说明用户要退出了 清空session即可
    req.session.username = '';
    req.session.head_pic = '';
    // 跳转页面
    res.redirect('/web/index.html');
}
module.exports = exit;