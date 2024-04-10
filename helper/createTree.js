function createTree(arr, parID){
    const tree =[]
    for(const item of arr) {
        if(item.parent_id == parID){
            let newItem = item
            const childItem = createTree(arr,item.id)
            if(childItem.length > 0){
                newItem["children"] = childItem
            }
            tree.push(newItem)
        }
    }
    return tree
}

module.exports = createTree