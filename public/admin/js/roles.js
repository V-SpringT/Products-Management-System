// Permissions
const tablePermissions = document.querySelector("[table-permissions]")
if(tablePermissions){
    const buttonSubmit = document.querySelector("[button-submit]")
    buttonSubmit.addEventListener("click",()=>{
        let permissions = []

        const rows = tablePermissions.querySelectorAll("[data-name]")
        rows.forEach(row => {
            const name = row.getAttribute("data-name")
            const inputs = row.querySelectorAll("input")
            if(name == "id"){
                inputs.forEach((input) => {
                    const id = input.value
                    permissions.push({
                        id : id,
                        permissions: []
                    })
                })
            }
            else{
                inputs.forEach((input,index)=>{
                    const checked = input.checked
                    if(checked) permissions[index].permissions.push(name)
                })
            }
        })
        console.log(permissions)

        if(permissions.length > 0){
            const form = document.querySelector("#form-change-permissions")
            const inputPermissions = form.querySelector("input[name='permissions']")
            inputPermissions.value = JSON.stringify(permissions)

            form.submit()
        }
    })
}
//End Permissions


// display permissions
const dataRoles = document.querySelector("[data-roles]")
if(dataRoles){
    const roles = JSON.parse(dataRoles.getAttribute("data-roles")); 
    const tablePermissions = document.querySelector("[table-permissions]")

    roles.forEach((role,index) => {
        role.permissions.forEach(per => {
            const checked = tablePermissions.querySelector(`[data-name=${per}]`)
            const checkedInput = checked.querySelectorAll("input")[index]
            checkedInput.checked = true
        })
    })
}
// end display permissions
