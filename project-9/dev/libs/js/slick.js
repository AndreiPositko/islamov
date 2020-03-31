$(document).ready(function(){
  $('.feedback-slider').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
   responsive: [
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    }
   ]
    
    
  // nextArrow:
	
	// `<button type="button" class="slick-next">
	// 	<img class="" src="img/feedback/arrow-next.png" alt="Фото отзыва">
	// </button>`
	
});
});
