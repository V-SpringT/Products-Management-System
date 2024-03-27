module.exports = (query) => {
    let filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Họat động",
            status:"active",
            class:""
        },
        {
            name: "Dừng họat động",
            status: "inactive",
            class: ""
        },
        {
            name: "Đã xóa",
            status: "deleted",
            class: ""
        }
    ]
    
    if(query.status){
        const index = filterStatus.findIndex(item => item.status == query.status)
        filterStatus[index].class = "active"
    }
    else{
        const index = filterStatus.findIndex(item => item.status == "")
        filterStatus[index].class = "active"
    }

    return filterStatus;
}