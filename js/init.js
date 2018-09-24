$(function()
{
	// Фиксированный хедер
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

	// Выравниванине картанок "плиткой"
	var gutterSizer = $('.gutter-sizer').css('width'),
       columnWidth = $('.photo-item').css('width');

   if (gutterSizer && columnWidth) 
   {
			gutterSizer = gutterSizer.replace(/[^-0-9.]/gim,'');
			gutterSizer = Math.round(gutterSizer * 10) / 10;

			columnWidth = columnWidth.replace(/[^-0-9.]/gim,'');
			columnWidth = Math.round(columnWidth * 10) / 10;
   }

	$('.photos').masonry(
	{
			itemSelector: '.photo-item:not(.unactive)',
			columnWidth: columnWidth,
			gutter: gutterSizer,
   });

   $('.category-list').find('a').click(function(event)
	{
		event.preventDefault();
	});

   // Выбор картинок по категориям
   var active = '';
 
	function filterPhotos(photo)
	{
		if(active != photo)
		{
			$('img').filter('.' + photo).removeClass('unactive');
			$('img').filter(':not(.' + photo + ')').addClass('unactive');
			active = photo;
		}
	}
	 
	$('.logo').click(function()
	{
		filterPhotos('logo'); 

		$('.photos').masonry(
		{
			itemSelector: '.photo-item:not(.unactive)',
			columnWidth: columnWidth,
			gutter: gutterSizer,
	   });
	});

	$('.mobile-app').click(function()
	{ 
		filterPhotos('mobile-app'); 

		$('.photos').masonry(
		{
			itemSelector: '.photo-item:not(.unactive)',
			columnWidth: columnWidth,
			gutter: gutterSizer,
	   });
	});

	$('.wordpress').click(function()
	{
	 	filterPhotos('wordpress'); 

	 	$('.photos').masonry(
		{
			itemSelector: '.photo-item:not(.unactive)',
			columnWidth: columnWidth,
			gutter: gutterSizer,
	   });
	});

	$('.web-design').click(function()
	{ 
		filterPhotos('web-design'); 

		$('.photos').masonry(
		{
			itemSelector: '.photo-item:not(.unactive)',
			columnWidth: columnWidth,
			gutter: gutterSizer,
	   });
	});

	$('.ui-ix').click(function()
	{
		filterPhotos('ui-ix'); 

		$('.photos').masonry(
		{
			itemSelector: '.photo-item:not(.unactive)',
			columnWidth: columnWidth,
			gutter: gutterSizer,
	   });
	});

	$('.branding').click(function()
	{ 
		filterPhotos('branding'); 

		$('.photos').masonry(
		{
			itemSelector: '.photo-item:not(.unactive)',
			columnWidth: columnWidth,
			gutter: gutterSizer,
	   });
	});
	
	$('.all').click(function()
	{
		$('img').removeClass('unactive');

		$('.photos').masonry(
		{
			itemSelector: '.photo-item',
			columnWidth: columnWidth,
			gutter: gutterSizer,
	   });
	});

})