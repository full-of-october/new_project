$( document ).ready(function() {
  console.log('bootstrap', bootstrap)
  console.log($('.autoplay'))
  $('.autoplay').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  });
});