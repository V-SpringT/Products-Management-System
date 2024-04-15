// delete button
const buttonDelete = document.querySelectorAll("[btn-delete]")    
if(buttonDelete.length > 0){
    const formDeleteItem = document.querySelector("#form-delete-item")
    const path = formDeleteItem.getAttribute("data-path")
    buttonDelete.forEach(btn=>{
        btn.addEventListener("click",()=>{
            const isConfirm = confirm("Bạn chắc chắn muốn xóa danh mục này")
            if(isConfirm){
                const id = btn.getAttribute("data-id")
                const action = `${path}/${id}?_method=DELETE`;

                formDeleteItem.action = action;
                formDeleteItem.submit()
            }
        });
    });
}

// end delete button

// restore button 
// Restore Item
const buttonRestore = document.querySelectorAll("[btn-restore]")   
if(buttonRestore.length > 0){
    const formRestoreItem = document.querySelector("#form-restore-item")
    console.log(formRestoreItem)
    const pathRestore = formRestoreItem.getAttribute("data-path")
    
    buttonRestore.forEach(btn => {
        btn.addEventListener("click",()=>{
            const isConfirm = confirm("Bạn muốn khôi phục danh mục này")
            if(isConfirm){
                const id = btn.getAttribute("data-id")
                const action = `${pathRestore}/${id}`
                
                formRestoreItem.action = action;
                formRestoreItem.submit()
            }
        })
    })
}
// end restore button