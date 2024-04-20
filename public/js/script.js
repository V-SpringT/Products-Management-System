
//featured slider
$('.slick-slider').slick({
    slidesToShow: 3,
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

// sale slider
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

  // lastest products  
  $('.products').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    draggable: false,
    prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
    nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
  });
  // end lastest products 
  // description img 
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
  setInterval(()=>{
    countdouwn()
  },1000)