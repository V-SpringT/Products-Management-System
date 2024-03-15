module.exports = (query) =>{
    const searchObject = {
        keyword: ""
    }

    if(query.keyword){
        let keyword = query.keyword;

        const regrex = new RegExp(keyword,"i");
        searchObject.regrex = regrex;
        searchObject.keyword = keyword; 
    }

    return searchObject;
}