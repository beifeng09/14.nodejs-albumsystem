function error(req, res) {
    res.render('error.ejs', {
        msg: req.query.msg
    });
}

module.exports = error;