// Button Status 
const buttonStatus = document.querySelectorAll("[button-status]")
if(buttonStatus.length > 0){
    let url = new URL(window.location.href);

    buttonStatus.forEach(button => {
        button.addEventListener("click", ()=>{
            const status = button.getAttribute("button-status");
            if(status){
                url.searchParams.set("status",status)
                url.searchParams.set("page",1)
            }
            else{
                url.searchParams.delete("status")
            }
            window.location.href = url.href
        });
    });
}
// End Button Status 


// form search 
const formSearch = document.getElementById("form-search")

if(formSearch){
    let url = new URL(window.location.href)
    formSearch.addEventListener("submit", (e)=>{
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if(keyword){
            url.searchParams.set("keyword",keyword)
            url.searchParams.set("page",1)
        }
        else{
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    })
}
// end form search 


// Pagination 

    const buttonPagination = document.querySelectorAll("[button-pagination]");
    if(buttonPagination){
        let url = new URL(window.location.href);
        buttonPagination.forEach(button => {
            button.addEventListener("click", ()=>{
                const page = button.getAttribute("button-pagination")
                url.searchParams.set("page",page);

                window.location.href = url.href; 
            })
        });
    }

// End Pagination 

// CheckBox multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti){
    const checkAll = checkboxMulti.querySelector("input[name='checkall']")
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']")
    checkAll.addEventListener("click",()=>{
        if(checkAll.checked){
            inputsId.forEach(btn =>{
                btn.checked = true;
            })
        }else{
            inputsId.forEach(btn =>{
                btn.checked = false;
            })
        }
    })
    inputsId.forEach(btn =>{
        btn.addEventListener("click",()=>{
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if(countChecked == inputsId.length) checkAll.checked = TextTrackCueList
            else checkAll.checked = false;
        })
    })
}

// End CheckBox multi


// Form multi 
const formChangeMulti = document.querySelector("[form-change-multi]")
if(formChangeMulti){
    formChangeMulti.addEventListener("submit",(e)=>{
        e.preventDefault();  
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked")

        const typeChange = e.target.elements.type.value;
        
        if(typeChange == "delete-all"){
            const isConfirm = confirm("Bạn có muốn xóa những sản phầm này");

            if(!isConfirm){
                return;
            }
        }

        

        if(inputsChecked.length > 0){
            let ids = [];
            
            const inputIDs = formChangeMulti.querySelector("input[name='ids']")

            inputsChecked.forEach(inp => {
                const id = inp.value
                if(typeChange == "change-position"){
                    const position = inp.closest("tr").querySelector("input[name='position']").value
                    ids.push(`${id}-${position}`)
                }
                else {
                    ids.push(id);
                }
            })
                
            inputIDs.value = ids.join(", ")

            formChangeMulti.submit();
        }else{
            alert("Chọn ít nhất 1 bản ghi")
        }
    })
}

// End form multi 


// Show alert 
const showAlert = document.querySelector("[show-alert]")
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeALert = showAlert.querySelector("[close-alert]");
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
    },time)
    
    closeALert.addEventListener("click",()=>{
        showAlert.classList.add("alert-hidden");
    })
}
// End show Alert 