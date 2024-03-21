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

        if(inputsChecked.length > 0){
            let ids = [];
            
            const inputIDs = formChangeMulti.querySelector("input[name='ids']")

            inputsChecked.forEach(inp => {
                const id = inp.value
                ids.push(id);
            })
            inputIDs.value = ids.join(", ")

            formChangeMulti.submit();
        }else{
            alert("Chọn ít nhất 1 bản ghi")
        }
    })
}

// End form multi 
