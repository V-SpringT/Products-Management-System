let cnt=0
function createTree(arr, parID){
    const tree =[]
    for(const item of arr) {
        if(item.parent_id == parID){
            cnt+=1
            let newItem = item
            newItem.index = cnt
            const childItem = createTree(arr,item.id)
            if(childItem.length > 0){
                newItem["children"] = childItem
            }
            tree.push(newItem)
        }
    }
    return tree
}

module.exports.tree = (arr,parID="") =>{
    cnt=0;
    return createTree(arr,parID);
}