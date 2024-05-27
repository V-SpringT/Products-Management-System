// Show alert 
const showAlert = document.querySelector("[show-alert]")
console.log(showAlert)
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

//featured slider
  const featuredBox = document.querySelector(".featured-box")
  if(featuredBox){
    $('.featured-box').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnFocus: false,
      infinite: true,
      draggable: false,
      prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
      nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
    });
  }

// sale slider
  const saleProducts = document.querySelector(".sale-products")
  if(saleProducts){
    $('.sale-products').slick({
      slidesToShow: 4,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnFocus: false,
      infinite: true,
      draggable: false,
      arrows: false,
      dots: true,
    });
  }


  // lastest products  
  const lastestBox = document.querySelector(".lastest-box")
  if(lastestBox){
    $('.lastest-box').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      draggable: false,
      prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
      nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
    });
  }
  // end lastest products 



  // description img 
  const descriptionImg = document.querySelector("#desc-img")
  if(descriptionImg){
    $('#desc-img').slick({
      autoplay: true,
      autoplaySpeed: 2000,
      fade: true,
      draggable: false,
      arrows: false,
      pauseOnFocus: false,
      dots: true,
      infinite: true,
    });
  }
//countdouwn
  const days = document.querySelector("#days")
  const hours = document.querySelector("#hours")
  const minutes = document.querySelector("#minutes")
  const seconds = document.querySelector("#seconds")
  const curYear = new Date().getFullYear()
  const newYear = new Date(`January 01 ${curYear + 1} 00:00:00`)
  function countdouwn() {
    const curTime = new Date()
    const total = Math.floor((newYear - curTime)/1000)
    const d = Math.floor(total / 60 / 60 / 24)
    const h = Math.floor(total / 60 / 60) % 24
    const m = Math.floor(total / 60) % 60
    const s = Math.floor(total) % 60
    days.innerHTML = d;
    hours.innerHTML = h;
    minutes.innerHTML = m;
    seconds.innerHTML = s;
  }
  if(days && hours && minutes && seconds){
    setInterval(()=>{
      countdouwn()
    },1000)
  }

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



// sort 
const sort = document.querySelector(".sort")
if(sort){
    let url = new URL(window.location.href)
    const sortSelect = sort.querySelector("[sort-select]")
    sortSelect.addEventListener("change",(e)=>{
        const [sortKey,sortValue] = e.target.value.split("-")
        url.searchParams.set("sortKey",sortKey)
        url.searchParams.set("sortValue",sortValue)

        window.location.href = url.href;
    })

    /*set value select tag*/

    const sortKey = url.searchParams.get("sortKey")
    const sortValue = url.searchParams.get("sortValue")

    if(sortKey && sortValue){
        const stringSort = `${sortKey}-${sortValue}`
        const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`)
        optionSelected.selected=true;
    }


}

//end sort 


// brand filter
const brandFilter = document.querySelector(".filter-brand")

if(brandFilter){
  let url = new URL(window.location.href)
  const brandCb = brandFilter.querySelectorAll(".brand-checkbox")
  brandCb.forEach(cb =>{
    cb.addEventListener("click",(e)=>{
      const checkedValue = []
      const cbSelected = brandFilter.querySelectorAll("input[type='checkbox']:checked")
      if(cbSelected.length > 0){
        cbSelected.forEach(checked => {
          checkedValue.push(checked.value)
        })
      }
      url.searchParams.set("brand",checkedValue.join("-"))
      window.location.href = url.href;
    })
    
})

  /* Set value */
  const brand = url.searchParams.get("brand")
  let brandVal = []
  if(brand)
    brandVal = brand.split("-") 
  if(brandVal.length > 0){
    brandVal.forEach(check =>{
      const checkedInput = brandFilter.querySelector(`input[value='${check}']`)
      checkedInput.checked = true;
    })
    
  }


}

// end brand filter


// type filter
const typeFilter = document.querySelector(".filter-type")

if(typeFilter){
  let url = new URL(window.location.href)
  const typeCb = typeFilter.querySelectorAll(".type-checkbox")
  typeCb.forEach(cb =>{
    cb.addEventListener("click",(e)=>{
      const checkedValue = []
      const cbSelected = typeFilter.querySelectorAll("input[type='checkbox']:checked")
      if(cbSelected.length > 0){
        cbSelected.forEach(checked => {
          checkedValue.push(checked.value)
        })
      }
      url.searchParams.set("type",checkedValue.join("-"))
      window.location.href = url.href;
    })
    
})

  /* Set value */
  const type = url.searchParams.get("type")
  let typeVal = []
  if(type)
    typeVal = type.split("-") 
  if(typeVal.length > 0){
    
    typeVal.forEach(check =>{
      const checkedInput = typeFilter.querySelector(`input[value='${check}']`)
      checkedInput.checked = true;
    })
    
  }
}
// end type filter


// price ratio 
const priceRadio = document.querySelector(".price-radio")
if(priceRadio) {
  let url = new URL(window.location.href)
  const radio = priceRadio.querySelectorAll("input[type='radio']")
  radio.forEach(rd => {
    rd.addEventListener("change",(e)=>{
      url.searchParams.set("priceRadio",e.target.value)
      window.location.href = url.href;
    })
  })

  /*set value*/

  const idxRadio = url.searchParams.get("priceRadio")
  if(idxRadio){
    const radioChecked = priceRadio.querySelector(`input[value='${idxRadio}']`)
    radioChecked.checked = true;
  }
}
// end price ratio 


// price text filter
const priceInput = document.querySelector(".price-input")
if(priceInput){
  let url = new URL(window.location.href)
  const minPrice = priceInput.querySelector(".min-price")
  const maxPrice = priceInput.querySelector(".max-price")
  const sub = priceInput.querySelector(".btn-sub")
  if(sub && minPrice && maxPrice){
    sub.addEventListener("click",(e)=>{
      const StrPrice = minPrice.value + "-" + maxPrice.value
      url.searchParams.set("priceInput",StrPrice)
      window.location.href = url.href;
    })
  }

  /* set value */
  const ValInput = url.searchParams.get("priceInput")
  if(ValInput){
    const [minV, maxVal] = ValInput.split("-")
    minPrice.value = minV
    maxPrice.value = maxVal
  }
    
}
// end price text filter


//add to cart
  const formAddToCart = document.querySelector("[add-cart]")
  if(formAddToCart){
    const addCart = document.querySelectorAll(".inner-cart")
    if(addCart.length >0){
      addCart.forEach(item =>{
        item.addEventListener("click",()=>{
          const id = item.getAttribute("value")
          const url = formAddToCart.getAttribute("action")
          formAddToCart.action = url+id
          formAddToCart.submit();
        }) 
      })
      
    }
  }
//end add to cart