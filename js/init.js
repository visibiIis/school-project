$(function()
{
	$('header').removeClass('fixed');
	$(window).scroll(function(){
		if($(this).scrollTop() > 20) {
			$('header').addClass('fixed').fadeIn('fast');
		} else {
			$('header').removeClass('fixed').fadeIn('fast');
		}
	});

	// Открытие/скрытие бургер-меню
	$('.menu-btn, .menu').click(function()
	{
		$('.menu').toggleClass('menu-active');
		$('.menu-btn').toggleClass('menu-btn-active');
		$('.menu-lock').toggleClass('menu-lock-active');
	});

	// Костыль по отмене действия перетаскивания картинок на странице
	$("img").mousedown(function(){
	    return false;
	});

	if($('.main-photoslider').length > 0) {
		$('.main-photoslider').slick({
			dots: true,
	      infinite: true,
	      autoplay: true,
	      autoplaySpeed: 7999,
	      draggable: false,
		});
	}
})