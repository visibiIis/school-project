$(function()
{
	// Фиксированный хедер
	$('header').removeClass('fixed');
	$(window).scroll(function()
	{
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
	$('img').mousedown(function()
	{
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


	// Выравниванине картинок "плиткой"
	var gutterSizer = $('.gutter-sizer').css('width'),
       columnWidth = $('.photo-item').css('width');

   if (gutterSizer && columnWidth) 
   {
		gutterSizer = gutterSizer.replace(/[^-0-9.]/gim,'');
		gutterSizer = Math.round(gutterSizer * 10) / 10;

		columnWidth = columnWidth.replace(/[^-0-9.]/gim,'');
		columnWidth = Math.round(columnWidth * 10) / 10;
   }

	$('.main-gallery .photos').masonry(
	{
		itemSelector: '.photo-item:not(.unactive)',
		columnWidth: columnWidth,
		gutter: gutterSizer,
   });


   // Выбор картинок по категориям
   $('.main-gallery .category-list').find('a').click(function(event)
	{
		event.preventDefault();

		count = $('.main-gallery .category-list').find('a');

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
			$('.main-gallery .photos img').filter('#' + photo).removeClass('unactive');
			$('.main-gallery .photos img').filter(':not(#' + photo + ')').addClass('unactive');
			active = photo;
		}

		if (active == 'all') 
		{
			$('.main-gallery .photos img').removeClass('unactive');
		}

		$('.main-gallery .photos').masonry(
		{
			itemSelector: '.photo-item:not(.unactive)',
			columnWidth: columnWidth,
			gutter: gutterSizer,
	   });
	}
	 
	$('.main-gallery .category-list .logo').click(function() { filterPhotos('logo'); });
	$('.main-gallery .category-list .mobile-app').click(function() { filterPhotos('mobile-app'); });
	$('.main-gallery .category-list .wordpress').click(function() { filterPhotos('wordpress'); });
	$('.main-gallery .category-list .web-design').click(function() { filterPhotos('web-design'); });
	$('.main-gallery .category-list .ui-ux').click(function() { filterPhotos('ui-ux'); });
	$('.main-gallery .category-list .branding').click(function() { filterPhotos('branding'); });
	$('.main-gallery .category-list .all').click(function() { filterPhotos('all'); });


	// Просмотр фотографий в виде плеера
	$('.main-gallery .photos img').on("click", function()
	{
		var source = $(this).attr('src'),
			 category = $(this).attr('id'),
			 sep_gallery = $('.separate-gallery'),
			 player = $('.separate-gallery .photos'),
			 gallery = $('.main-gallery'),
			 tags = $('.separate-gallery .photo-desc .tag-names');

		gallery.addClass('unactive');
		sep_gallery.removeClass('unactive');

		tags.append(category);

		player.append('<div class="main-view"><img src="' + source + '" alt=""></div><div class="second-view"><img src="' + source + '" alt=""></div>');

		$('[src]').each(function(){
			var image = $(this);
			if (image.attr('id') == category && image.attr('src') != source) {
				player.append('<div class="second-view"><img src="' + image.attr('src') + '" alt=""></div>');
			}
		});

		var mai_view = $('.separate-gallery .photos .main-view');


		if (this.width / this.height > 1.57714285714) {
			mai_view.find('img').css({'height': 'inherit', 'width': 'auto'});
		} else {
			mai_view.find('img').css({'height': 'auto', 'width': 'inherit'});
		}

		$('.second-view').find('img').each(function(){
			if (this.width / this.height > 1.13913043478) {
				$(this).css({'height': 'inherit', 'width': 'auto'});
			} else {
				$(this).css({'height': 'auto', 'width': 'inherit'});
			}
		});

		$('.separate-gallery .photos .second-view').on("click", function()
		{
			var qq_source = $(this).find('img').attr('src');

			player.empty();
			player.append('<div class="main-view"><img src="' + qq_source + '" alt=""></div><div class="second-view"><img src="' + qq_source + '" alt=""></div>');

			$('[src]').each(function(){
				var image = $(this);
				if (image.attr('id') == category && image.attr('src') != qq_source) {
					player.append('<div class="second-view"><img src="' + image.attr('src') + '" alt=""></div>');
				}
			});

			var mai_view = $('.separate-gallery .photos .main-view');


			if (this.width / this.height > 1.57714285714) {
				mai_view.find('img').css({'height': 'inherit', 'width': 'auto'});
			} else {
				mai_view.find('img').css({'height': 'auto', 'width': 'inherit'});
			}

			$('.second-view').find('img').each(function(){
				if (this.width / this.height > 1.13913043478) {
					$(this).css({'height': 'inherit', 'width': 'auto'});
				} else {
					$(this).css({'height': 'auto', 'width': 'inherit'});
				}
			});
		});
	});

	$('.separate-gallery .control-panel .prev').click(function()
	{
		var current = $('.separate-gallery .photos .main-view').find('img').attr('src');
			 redirect = $('.main-gallery .photos img[src = "' + current + '"]'),
			 previous = redirect.prev();

		if (previous.hasClass('photo-item')) 
		{
			var prev_source = previous.attr('src'),
				 prev_category = previous.attr('id'),
				 sep_gallery = $('.separate-gallery'),
				 player = $('.separate-gallery .photos'),
				 gallery = $('.main-gallery'),
				 tags = $('.separate-gallery .photo-desc .tag-names');

			tags.empty();
			player.empty();

			tags.append(prev_category);
			player.append('<div class="main-view"><img src="' + prev_source + '" alt=""></div><div class="second-view"><img src="' + prev_source + '" alt=""></div>');

			$('[src]').each(function(){
				var image = $(this);
				if (image.attr('id') == prev_category && image.attr('src') != prev_source) {
					player.append('<div class="second-view"><img src="' + image.attr('src') + '" alt=""></div>');
				}
			});

			var mai_view = $('.separate-gallery .photos .main-view');

			if (previous.width / previous.height > 1.57714285714) {
				mai_view.find('img').css({'height': 'inherit', 'width': 'auto'});
			} else {
				mai_view.find('img').css({'height': 'auto', 'width': 'inherit'});
			}

			$('.second-view').find('img').each(function(){
				if (this.width / this.height > 1.13913043478) {
					$(this).css({'height': 'inherit', 'width': 'auto'});
				} else {
					$(this).css({'height': 'auto', 'width': 'inherit'});
				}
			});

			$('.separate-gallery .photos .second-view').on("click", function()
		{
			var qq_source = $(this).find('img').attr('src');

			player.empty();
			player.append('<div class="main-view"><img src="' + qq_source + '" alt=""></div><div class="second-view"><img src="' + qq_source + '" alt=""></div>');

			$('[src]').each(function(){
				var image = $(this);
				if (image.attr('id') == prev_category && image.attr('src') != qq_source) {
					player.append('<div class="second-view"><img src="' + image.attr('src') + '" alt=""></div>');
				}
			});

			var mai_view = $('.separate-gallery .photos .main-view');


			if (this.width / this.height > 1.57714285714) {
				mai_view.find('img').css({'height': 'inherit', 'width': 'auto'});
			} else {
				mai_view.find('img').css({'height': 'auto', 'width': 'inherit'});
			}

			$('.second-view').find('img').each(function(){
				if (this.width / this.height > 1.13913043478) {
					$(this).css({'height': 'inherit', 'width': 'auto'});
				} else {
					$(this).css({'height': 'auto', 'width': 'inherit'});
				}
			});
		});
		} 
			else 
		{
			var previous = $('.main-gallery .photos img:last-of-type'),
				 prev_source = previous.attr('src'),
				 prev_category = previous.attr('id'),
				 sep_gallery = $('.separate-gallery'),
				 player = $('.separate-gallery .photos'),
				 gallery = $('.main-gallery'),
				 tags = $('.separate-gallery .photo-desc .tag-names');

			tags.empty();
			player.empty();

			tags.append(prev_category);
			player.append('<div class="main-view"><img src="' + prev_source + '" alt=""></div><div class="second-view"><img src="' + prev_source + '" alt=""></div>');

			$('[src]').each(function(){
				var image = $(this);
				if (image.attr('id') == prev_category && image.attr('src') != prev_source) {
					player.append('<div class="second-view"><img src="' + image.attr('src') + '" alt=""></div>');
				}
			});

			var mai_view = $('.separate-gallery .photos .main-view');

			if (previous.width / previous.height > 1.57714285714) {
				mai_view.find('img').css({'height': 'inherit', 'width': 'auto'});
			} else {
				mai_view.find('img').css({'height': 'auto', 'width': 'inherit'});
			}

			$('.second-view').find('img').each(function(){
				if (this.width / this.height > 1.13913043478) {
					$(this).css({'height': 'inherit', 'width': 'auto'});
				} else {
					$(this).css({'height': 'auto', 'width': 'inherit'});
				}
			});

			$('.separate-gallery .photos .second-view').on("click", function()
			{
				var qq_source = $(this).find('img').attr('src');

				player.empty();
				player.append('<div class="main-view"><img src="' + qq_source + '" alt=""></div><div class="second-view"><img src="' + qq_source + '" alt=""></div>');

				$('[src]').each(function(){
					var image = $(this);
					if (image.attr('id') == prev_category && image.attr('src') != qq_source) {
						player.append('<div class="second-view"><img src="' + image.attr('src') + '" alt=""></div>');
					}
				});

				var mai_view = $('.separate-gallery .photos .main-view');


				if (this.width / this.height > 1.57714285714) {
					mai_view.find('img').css({'height': 'inherit', 'width': 'auto'});
				} else {
					mai_view.find('img').css({'height': 'auto', 'width': 'inherit'});
				}

				$('.second-view').find('img').each(function(){
					if (this.width / this.height > 1.13913043478) {
						$(this).css({'height': 'inherit', 'width': 'auto'});
					} else {
						$(this).css({'height': 'auto', 'width': 'inherit'});
					}
				});
			});
		}
	});

	$('.separate-gallery .control-panel .next').click(function()
	{
		var current = $('.separate-gallery .photos .main-view').find('img').attr('src');
			 redirect = $('.main-gallery .photos img[src = "' + current + '"]'),
			 next = redirect.next();

		if (next.hasClass('photo-item')) 
		{
			var next_source = next.attr('src'),
				 next_category = next.attr('id'),
				 sep_gallery = $('.separate-gallery'),
				 player = $('.separate-gallery .photos'),
				 gallery = $('.main-gallery'),
				 tags = $('.separate-gallery .photo-desc .tag-names');

			tags.empty();
			player.empty();

			tags.append(next_category);
			player.append('<div class="main-view"><img src="' + next_source + '" alt=""></div><div class="second-view"><img src="' + next_source + '" alt=""></div>');

			$('[src]').each(function(){
				var image = $(this);
				if (image.attr('id') == next_category && image.attr('src') != next_source) {
					player.append('<div class="second-view"><img src="' + image.attr('src') + '" alt=""></div>');
				}
			});

			var mai_view = $('.separate-gallery .photos .main-view');

			if (next.width / next.height > 1.57714285714) {
				mai_view.find('img').css({'height': 'inherit', 'width': 'auto'});
			} else {
				mai_view.find('img').css({'height': 'auto', 'width': 'inherit'});
			}

			$('.second-view').find('img').each(function(){
				if (this.width / this.height > 1.13913043478) {
					$(this).css({'height': 'inherit', 'width': 'auto'});
				} else {
					$(this).css({'height': 'auto', 'width': 'inherit'});
				}
			});

			$('.separate-gallery .photos .second-view').on("click", function()
			{
				var qq_source = $(this).find('img').attr('src');

				player.empty();
				player.append('<div class="main-view"><img src="' + qq_source + '" alt=""></div><div class="second-view"><img src="' + qq_source + '" alt=""></div>');

				$('[src]').each(function(){
					var image = $(this);
					if (image.attr('id') == next_category && image.attr('src') != qq_source) {
						player.append('<div class="second-view"><img src="' + image.attr('src') + '" alt=""></div>');
					}
				});

				var mai_view = $('.separate-gallery .photos .main-view');


				if (this.width / this.height > 1.57714285714) {
					mai_view.find('img').css({'height': 'inherit', 'width': 'auto'});
				} else {
					mai_view.find('img').css({'height': 'auto', 'width': 'inherit'});
				}

				$('.second-view').find('img').each(function(){
					if (this.width / this.height > 1.13913043478) {
						$(this).css({'height': 'inherit', 'width': 'auto'});
					} else {
						$(this).css({'height': 'auto', 'width': 'inherit'});
					}
				});
			});
		} 
			else 
		{
			var next =  $('.main-gallery .photos img:first-of-type'),
				 next_source = next.attr('src'),
				 next_category = next.attr('id'),
				 sep_gallery = $('.separate-gallery'),
				 player = $('.separate-gallery .photos'),
				 gallery = $('.main-gallery'),
				 tags = $('.separate-gallery .photo-desc .tag-names');

			tags.empty();
			player.empty();

			tags.append(next_category);
			player.append('<div class="main-view"><img src="' + next_source + '" alt=""></div><div class="second-view"><img src="' + next_source + '" alt=""></div>');

			$('[src]').each(function(){
				var image = $(this);
				if (image.attr('id') == next_category && image.attr('src') != next_source) {
					player.append('<div class="second-view"><img src="' + image.attr('src') + '" alt=""></div>');
				}
			});

			var mai_view = $('.separate-gallery .photos .main-view');

			if (next.width / next.height > 1.57714285714) {
				mai_view.find('img').css({'height': 'inherit', 'width': 'auto'});
			} else {
				mai_view.find('img').css({'height': 'auto', 'width': 'inherit'});
			}

			$('.second-view').find('img').each(function(){
				if (this.width / this.height > 1.13913043478) {
					$(this).css({'height': 'inherit', 'width': 'auto'});
				} else {
					$(this).css({'height': 'auto', 'width': 'inherit'});
				}
			});

			$('.separate-gallery .photos .second-view').on("click", function()
			{
				var qq_source = $(this).find('img').attr('src');

				player.empty();
				player.append('<div class="main-view"><img src="' + qq_source + '" alt=""></div><div class="second-view"><img src="' + qq_source + '" alt=""></div>');

				$('[src]').each(function(){
					var image = $(this);
					if (image.attr('id') == next_category && image.attr('src') != qq_source) {
						player.append('<div class="second-view"><img src="' + image.attr('src') + '" alt=""></div>');
					}
				});

				var mai_view = $('.separate-gallery .photos .main-view');


				if (this.width / this.height > 1.57714285714) {
					mai_view.find('img').css({'height': 'inherit', 'width': 'auto'});
				} else {
					mai_view.find('img').css({'height': 'auto', 'width': 'inherit'});
				}

				$('.second-view').find('img').each(function(){
					if (this.width / this.height > 1.13913043478) {
						$(this).css({'height': 'inherit', 'width': 'auto'});
					} else {
						$(this).css({'height': 'auto', 'width': 'inherit'});
					}
				});
			});
		}
	});

	$('.separate-gallery .control-panel .sall').click(function()
	{

		if (document.location.href != 'portfolio.html') {
			document.location.href = 'portfolio.html';
		} else {
			$('.main-gallery').removeClass('unactive');
			$('.separate-gallery').addClass('unactive');

			$('.separate-gallery .photos, .separate-gallery .photo-desc .tag-names').empty();
		}
	});
})