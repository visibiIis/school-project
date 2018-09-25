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

   // Выбор картинок по категориям
   $('.category-list').find('a').click(function(event)
	{
		event.preventDefault();

		count = $('.category-list').find('a');

		$(count).each(function()
		{
			if ($(this).hasClass('active')) 
			{
				$(this).removeClass('active');
			}
		});

		$(this).addClass('active');
	});

	function filterPhotos(photo)
	{
		active = '';

		if (active != photo)
		{
			$('.photos img').filter('.' + photo).removeClass('unactive');
			$('.photos img').filter(':not(.' + photo + ')').addClass('unactive');
			active = photo;
		}

		if (active == 'all') 
		{
			$('.photos img').removeClass('unactive');
		}

		$('.photos').masonry(
		{
			itemSelector: '.photo-item:not(.unactive)',
			columnWidth: columnWidth,
			gutter: gutterSizer,
	   });
	}
	 
	$('.category-list .logo').click(function() { filterPhotos('logo'); });
	$('.category-list .mobile-app').click(function() { filterPhotos('mobile-app'); });
	$('.category-list .wordpress').click(function() { filterPhotos('wordpress'); });
	$('.category-list .web-design').click(function() { filterPhotos('web-design'); });
	$('.category-list .ui-ix').click(function() { filterPhotos('ui-ix'); });
	$('.category-list .branding').click(function() { filterPhotos('branding'); });
	$('.category-list .all').click(function() { filterPhotos('all'); });

})