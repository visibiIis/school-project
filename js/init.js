$(function()
{
	$('.menu-btn, .menu').click(function()
	{
		$('.menu').toggleClass('menu-active');
		$('.menu-btn').toggleClass('menu-btn-active');
		$('.menu-lock').toggleClass('menu-lock-active');
	});

	// $('.menu-btn').click(function(){
	// 	$('.menu-btn').fadeOut('.menu-btn');
	// })

	// $('.menu > .close').click(function(){
	// 	$('.menu-btn').fadeIn('.menu-btn');
	// })
})