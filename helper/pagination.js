module.exports = (countProducts,query) =>{
    const paginationObject = {
        currentPage: 1,
        limitItem: 5 
    }
    
    const totalPage = Math.ceil(countProducts/paginationObject.limitItem);
    paginationObject.totalPage = totalPage;

    if(query.page){
        paginationObject.currentPage = parseInt(query.page);
    }
    paginationObject.skip = (paginationObject.currentPage - 1)*paginationObject.limitItem;

    return paginationObject;
}