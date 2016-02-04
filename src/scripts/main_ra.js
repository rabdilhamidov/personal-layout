$(function () { 

	feedback_form_handler();

	// HOMEPAGE
	if($('body.home').length){
		// Большой слайдер
		var slider = $('.main-slider ul').bxSlider({
			pager: false,
			controls: false, 
			onSliderLoad: function (currentIndex) {
			  // Центровка слайдов
			  center_slide();
			}
		}); 
		// 1 слайдер : пр-во сайтов
		var slider1 = $('.slider-1 ul').bxSlider({
			pager: false,
			controls: false, 
			minSlides: 3,
			maxSlides: 3,
			slideWidth: 320,
			slideMargin: 30
		}); 
		// 2 слайдер : Дизайн
		var slider2= $('.slider-2 ul').bxSlider({
			pager: false,
			controls: false, 
			minSlides: 3,
			maxSlides: 3,
			slideWidth: 320,
			slideMargin: 30
		}); 
		// 3 слайдер : Фото
		var slider3= $('.slider-3 ul').bxSlider({
			pager: false,
			controls: false, 
			minSlides: 3,
			maxSlides: 3,
			slideWidth: 320,
			slideMargin: 30
		});
		//-- 
		// 4 слайдер : Блог
		var slider_blog= $('.slider-blog ul').bxSlider({
			pager: false,
			controls: false, 
			minSlides: 3,
			maxSlides: 3,
			slideWidth: 320,
			slideMargin: 30
		});
		//--

		/*
		*/
		$(document).ready(function () {

		})
		// HOME
		// Большой слайдер
		.on('click', '.main-slider .controls a', function (event) {
			event.preventDefault();
			$(this).hasClass('prev') && slider.goToPrevSlide();
			$(this).hasClass('next') && slider.goToNextSlide();
		})
		//  1 слайдер : пр-во сайтов
		.on('click', '.slider-1 .controls a', function (event) {
			event.preventDefault();
			$(this).hasClass('prev') && slider1.goToPrevSlide();
			$(this).hasClass('next') && slider1.goToNextSlide();
		})
		//  2 слайдер : Дизайн
		.on('click', '.slider-2 .controls a', function (event) {
			event.preventDefault();
			$(this).hasClass('prev') && slider2.goToPrevSlide();
			$(this).hasClass('next') && slider2.goToNextSlide();
		})
		//  3 слайдер : Фото
		.on('click', '.slider-3 .controls a', function (event) {
			event.preventDefault();
			$(this).hasClass('prev') && slider3.goToPrevSlide();
			$(this).hasClass('next') && slider3.goToNextSlide();
		})
		//  4 слайдер : Блог
		.on('click', '.slider-blog .controls a', function (event) {
			event.preventDefault();
			$(this).hasClass('prev') && slider_blog.goToPrevSlide();
			$(this).hasClass('next') && slider_blog.goToNextSlide();
		})
	  	
	}
	// HOMEPAGE


	$(document).ready(function () {

	})
	//форма авторзации
	.on('click', '.login a.login', function (event) {
		event.preventDefault();
		if($(this).next('.login-form').is(":hidden")){
			$(this).next('.login-form').fadeIn(300);
		}else{
			$(this).next('.login-form').fadeOut(300);
		}
	})


  	// подпись картинки-анонса
	.on('mouseenter', '.chapter figure', function (event) {
		event.preventDefault();
		if($(this).find('figcaption').length){
			$(this).find('figcaption').slideDown(300);
		}
	})
	.on('mouseleave', '.chapter figure', function (event) {
		event.preventDefault();
		$(this).find('figcaption').slideUp(300);
	})
  	
  	// Укрупнение-закрытие полноэкранного изображения
	.on('click', '.chapter figure a.imglink', function (event) {
		event.preventDefault();

		$('.fullscreen').load(
			'/ajax/fullScreenImg.php',
			{'imgSrc': $(this).attr('href')},
			function(response, status, xhr){
				if (status == "error") {
					console.log('Error: ' + xhr.status + " " + xhr.statusText);
				}else{
					console.log("All fun!\r\n" + response);
					fullscreenImg($('.fullscreen .img-block img'));
					$('.fullscreen .help').show();
					$('.fullscreen .help').fadeOut(2000);
				}
			}
		); 
	})

	// закрытие полноэкранного изображение по клику на него
	.on('click', '.fullscreen', function (event) {
		// event.preventDefault();
		$(this).fadeOut(300, function(){
			$(".fullscreen .img-block img").remove();
		});
	})

	//закрытие полноэкранного изображение по Esc
	.on('keydown', function (event) {
		if (event.which == 27){
		    $('.fullscreen').fadeOut(300, function(){
				$(".fullscreen .img-block img").remove();
			});
		}
	})

	// удаление комментария
	.on('click', '.post-comment-controls .close1', function (event) {
		event.preventDefault();
		var route = Routing.generate('ajax_comment_delete', { id: $(this).data('id') });
		// console.log('Route: '+route);

		var  this_comment = $(this).parent().parent().parent('.post-comment');
		$(this_comment).append('<div class = "comment-edit-progress"><span class="spinner"></span></div>');
		
		var preloader = $(this_comment).children('.comment-edit-progress');
		$(preloader).fadeIn(300, function(){
			$.ajax({
				type: "POST",
				url: route,
				success: function(data){
				    console.log( "JSON.stringify(data): " + JSON.stringify(data) );
				    console.log( "id: " + data.answer.id + "; report: " + data.answer.report );
				    if(data.answer.report){
				    	$(this_comment).slideUp(300, function(){
					    	$(preloader).detach();
					    	$(this_comment).detach();
				    	});
				    }
				},
				error: function( jqXHR, textStatus ){
			        console.log("Request failed: " + textStatus + "; Status: " + jqXHR.status);
			    }
			});
		})
	})

	// изменение комментария
	.on('click', '.post-comment-controls .edit', function (event) {
		event.preventDefault();
		console.log('.post-comment-controls .edit click');

		var  this_comment = $(this).parent().parent().parent('.post-comment');
		// $(this_comment).append('<div class = "comment-edit-progress"><span class="spinner"></span></div>');
		//...
	})
	;

	$(window).resize( function() {
		// рассчет полноэкранного изображения
		if($('.fullscreen').is(":visible")){
			fullscreenImg($('.fullscreen .img-block img'));
		}
		// слайдов главного слайдера
		if($('.main-slider').length){
			center_slide();
		}
	});

	$(window).load( function() {
		// слайдов главного слайдера
		if($('.main-slider').length){
			center_slide();
		}
	});
});


/*
*/

function fullscreenImg(img_el, mode){
	$('.fullscreen').fadeIn(300);

	var ww = $(window).width();
	var wh = $(window).height();
	var imw = $(img_el).width();
	var imh = $(img_el).height();

	var imk = imw/imh;
	var borderw = 8; // толщина контура	
	if(mode == 1){
		// заполнение окна
		if(ww/wh > imk){
			imw = ww;
			imh = Math.round(imw/imk);
		}else{
			imh = wh;
			imw = Math.round(imh*imk);
		}
	}else{
		// вписывание изображения
		if(ww/wh > imk){
			imh = wh;
			imw = Math.round(imh*imk);
		}else{
			imw = ww;
			imh = Math.round(imw/imk);
		}
	}
	$(img_el).width(imw);
	$(img_el).height(imh);
	// console.log('ww='+ww+'; wh='+wh+'; imw='+imw+'; imh='+imh);
	$('.fullscreen .img-block').css({'margin-left': -imw/2, 'margin-top': -imh/2-borderw});
}

function center_slide() {
	var slide_img = $('.main-slider .slide').find('img');
	$(slide_img).css({'top': -.5*(slide_img.height() - $('.main-slider .slide').height())});
}

// работа с формой обратной связи в футере
function feedback_form_handler(){
	$(document).ready(function () {
		if($('form#feedback .form-report-block').length){
			var report_block = $('form#feedback .form-report-block');
			if($('.footer').find('form#feedback').length){
				$('html, body').scrollTop($('footer').position().top + 320);
			}
			$(report_block).slideDown(300);
		}
	})
	// .on('submit', 'form#feedback', feedback_submit)
	.on('click', 'form#feedback .form-report-block a.close1', function (event) {
		event.preventDefault();
		$('form#feedback .form-report-block').slideUp(300);
	})
}

function feedback_submit(event){
	// event.preventDefault();
	// console.log('Подождите, идет отправка почты...');
	// alert('Подождите, идет отправка почты...');
}
	

