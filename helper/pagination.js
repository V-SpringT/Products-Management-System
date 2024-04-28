module.exports = (countProducts,query,limitedItem) =>{
    const paginationObject = {
        currentPage: 1,
        limitedItem: limitedItem
    }
    
    const totalPage = Math.ceil(countProducts/paginationObject.limitedItem);
    paginationObject.totalPage = totalPage;

    if(query.page){
        paginationObject.currentPage = parseInt(query.page);
    }
    paginationObject.skip = (paginationObject.currentPage - 1)*paginationObject.limitedItem;

    return paginationObject;
}