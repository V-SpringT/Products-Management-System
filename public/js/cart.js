// update quantity cart 
const inputsQuantity = document.querySelectorAll("input[name='quantity']")
if(inputsQuantity.length >0){
    inputsQuantity.forEach(input =>{
        input.addEventListener("change",(e)=>{
            const productID = input.getAttribute("product-id")
            console.log(productID)
            const quantity = input.value 

            window.location.href = `/cart/update/${productID}/${quantity}`
        })
    })
}
// end update quantity cart 