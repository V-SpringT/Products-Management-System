const Artical = require("../../model/artical.model")
module.exports.index = async (req,res) => {
    const articals = await Artical.find({deleted: false, status: "active"})
    console.log(articals)
    res.render("client/page/artical/index",{
        pageTitle: "Trang bài viết",
        articals: articals
    })
}