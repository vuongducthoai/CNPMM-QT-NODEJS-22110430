const getHomePage = async (req, res) => {
    return res.render('index.ejs')
}

module.exports = {
    getHomePage,
}

