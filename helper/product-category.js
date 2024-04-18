const Category = require("../model/products-category.model")

module.exports.getSubCategory = async (parId) =>{
    const getCategory = async (parId) =>{
        const subs = await Category.find({
            parent_id: parId,
            deleted: false,
            status: "active"
        })
        let allSub = [...subs]

        for(const sub of subs){
            const childs = await getCategory(sub.id)
            allSub = allSub.concat(childs)
        }
        return allSub
    }
    const result = await getCategory(parId);
    return result
}