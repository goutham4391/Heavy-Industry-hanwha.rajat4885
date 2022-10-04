$(function(){
		init();
});

function init() {
		modernSvg();
		sitemapMulti();
		visTop();
		rollSlider();
		sectionEven();
		selectBox();
		gotoTop();
		headFixFlex(); // 2019-12-10 headFixFlex 추가
		layerOpen();
		funcGnb();
		rollVisTop();
		scrollHistory();
		tabMapInfo();
		mediaRoll();
		selectAll();
		viewLayerModule();
		sportLayer();
		utilLang();
		currentKeyword();
		//chkBrowser();
		listGridCenter();
		//audioPolly();/* [2021-10-25 오디오폴리] 추가 */
};

/*
 * 리스트 한개 영역에 한해서 가운데 정렬
 */
function listGridCenter(){
		if( $(".list_grid ul.swiper-wrapper").length == 0 ) return false;
		$(".list_grid ul.swiper-wrapper").each(function(i){
				if($(this).children("li").length==1){
						$(this).css("margin-left", "20px");
				}
		});
}

function modernSvg() {
		$('.img_svg').each(function(){
				var imgSrc = $(this).attr('src');
				if(!Modernizr.svg){
						var newSrc = imgSrc.replace('.svg','.png');
						$(this).attr('src', newSrc);
				}
		});
}

function currentKeyword() {
		var currentUrl = $(location).attr('href');
		var chkRe = /[_D][0][0-9]+/g;
		var chkTest = chkRe.test(currentUrl);
		var chkCurrent = currentUrl.match(chkRe);
		if(chkCurrent!=null){
				chkCurrent = chkCurrent.length > 1 ? chkCurrent[0]:chkCurrent;
		}


		/*
		 Advanced Materials			C01
		 Chemicals 					C02
		 Construction 				C03
		 Financial Services 			C04
		 Leisure & Lifestyle 		C05
		 Manufacturing & Trading 	C06
		 Solar Energy 				C07
		 Corperates					C08*
		 Sports						C09*
		 ETC							C10*
		 */

		if (chkTest != '') {

				var idxCurrent = chkCurrent.toString().slice(-1);

				if( idxCurrent > 1 && idxCurrent < 8 ) {
						$('#prodService ul li').eq(idxCurrent-1).addClass('current');
				} else {
						return;
				}
		} else {
				return;
		}

		$('#prodService ul li').each(function(){
				if($(this).hasClass('current')){
						$(this).detach().insertBefore('#prodService ul li:first-child');
				} else {
						return;
				}
		});
}

function chkBrowser() {
		//browser detect
		var browser = (function() {
				var s = navigator.userAgent.toLowerCase();
				var match = /(webkit)[ \/](\w.]+)/.exec(s) ||
						/(opera)(?:.*version)?[ \/](\w.]+)/.exec(s) ||
						/(msie) ([\w.]+)/.exec(s) ||
						/(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) ||
						[];
				return { name: match[1] || "", version: match[2] || "0" };
		}());

		// uesing
		if(browser.name != 'mozila'){
				$('.wrap_list ul li a > span, .wrap_list ul li div > span').each(function(){
						var elText = $(this).text().length;
						if($('html').attr('lang') == 'ja' || $('html').attr('lang') == 'zh') {
								if(elText > 45 ){
										if(!$(this).parents('section').hasClass('grid_news')){
												$(this).append('<span class="msieClamp">...</span>');
										} else{
												return
										}
								}
						} else {
								if(elText > 100 ){
										$(this).append('<span class="msieClamp">...</span>');
								}
						}
				});
		}
};

function sitemapMulti() {
		if($('html').attr('lang') == 'it' || $('html').attr('lang') == 'de' || $('html').attr('lang') == 'ja') {

				$('.box_sitemap .list_sitemap').eq(3).addClass('odd_site').end().eq(4).addClass('odd_site').end().eq(5).addClass('odd_site');
				$('html[lang=it] .box_sitemap .list_sitemap:first-child').css({width: 250});
				$('html[lang=de] .box_sitemap .list_sitemap:nth-child(2)').css({width: 250});
				$('html[lang=ja] .box_sitemap .list_sitemap:first-child').css({width: 250});
		}
}
function utilLang() {
		var btnLang = $('.box_menu_lang > a');

		btnLang.click(function(e){
				$(this).stop().toggleClass('active').next('div').stop().slideToggle(170,'swing');
				if($(this).hasClass('active')){
						$('.gnb_2dpt, .lyr_search').slideUp(170, 'swing');
						$('.gnb_1dpt > li > a, .box_menu_search a').removeClass('active');
				}
				e.preventDefault();
		});
		btnLang.next().find('a').each(function(){
				$(this).click(function(){
						$(this).parents('.layer_lang').stop().slideUp(170, 'swing', function(){
								$(this).prev('a').removeClass('active')
						});
				});
		});

		$('.box_menu_lang .close_gnb').each(function(){
				$(this).click(function(){
						closeLang(this);
				});
				$(this).focusout(function(){
						closeLang(this);
				});
				function closeLang(e) {
						$(e).parents('.layer_lang').stop().slideUp(170, 'swing', function(){
								$(this).prev('a').removeClass('active')
						});
				}
		});

		$(document).click(function(e){
				if($(e.target).parents('.box_menu_lang').size() === 0) {
						$('.box_menu_lang').children('.layer_lang').stop(300).slideUp(350).css({
								zIndex: 10
						}).prev('a').removeClass('active');;
				}
		});
}

function sportLayer() {
		var boxLayer = $('.cont_layer_media');
		var tabLayer = boxLayer.find('.box_layer_media');
		var tabButton = boxLayer.find('.nav_result_1dpt a');
		//var targetLayer = boxLayer.find('.cont_image');
		var rollButton = boxLayer.find('.wrap_layer_roll .btn_view_image');
		var btnVideo = boxLayer.find('.wrap_layer_roll .btn_view_video');
		var tabId;

		// Tab
		tabButton.each(function(){
				$(this).click(function(e){
						tabId = $(this).attr('href');
						$(this).parent().siblings().removeClass('active');
						$(this).parent().addClass('active');
						$(this).parents('nav').nextAll('.box_layer_media').delay(100).hide().removeAttr('tabindex');
						$(tabId).delay(100).show().attr('tabindex',-1).focus();
						e.preventDefault();
				});
				$(this).focusout(function(){
						var tabNumber = $(this).parent().index();
						var tabIndex = $(this).parents('ul').find('li').size();

						if(tabIndex > 1) {
								if( tabNumber < 1) {
										tabId = $(this).attr('href');
										$(tabId).attr('tabindex',-1).focus();
										$(tabId).find('.wrap_layer_roll li').last().focusout(function(){
												$(this).parents('.box_layer_media').prev().find('li').last().find('a').focus();
										});
								} else {
										$(tabId).find('.wrap_layer_roll li').last().focusout(function(){
												$('.close_layer').focus();
										});
								}
						} else {
								return
						}
				});

		});

		// Image
		rollButton.each(function(){
				$(this).click(function(){
						var contImage = $(this).children('img').attr('src').replace('img_sports_thumb', 'img_sports_cont');
						var txtImage = $(this).children('img').attr('alt');
						targetLayer = $(this).parents('.roll_layer_media').prev();
						targetLayer.find('img').attr('src', contImage);
						targetLayer.find('figcaption').html(txtImage);
						//$(targetLayer).attr('tabindex',-1).focus().parent('.box_layer_media').removAttr('tabindex');
				});
		});

		//Video
		btnVideo.each(function(){
				$(this).click(function(e){
						$(this).attr('id','listReturn');
						var titVideo = $(this).find('.video-tit').text();
						var contVideo = $(this).find('.el_video p').text();
						var captionVideo = $(this).find('.el_video').next().html();
						var targetLayer = $(this).attr('href');
						//var targetPlayer = '<iframe width="640" height="360" src="" frameborder="0" allowfullscreen></iframe>';
						if($('html').attr('lang') == 'zh'){
								var targetPlayer = '<object type="application/x-shockwave-flash" data="" width="640" height="360" id="sb-player" allowScriptAccess="always" title="jwplayer"><param name="movie" value="'+contVideo+'"><param name="bgcolor" value="#000000"><param name="allowfullscreen" value="true"><param name="flashvars" value="autostart=false"></object>';
								$(targetLayer).find('.area_video').empty().html(targetPlayer).children().attr('data', contVideo);
						} else {
								var targetPlayer = '<iframe width="640" height="360" src="" frameborder="0" allowfullscreen title="youtube"></iframe>';
								$(targetLayer).find('.area_video').empty().html(targetPlayer).children().attr('src', contVideo);
						}
						$(targetLayer).find('.header_video .video-tit').empty().text(titVideo);
						//$(targetLayer).find('.area_video').html(targetPlayer).children().attr('src', contVideo);
						$(targetLayer).find('.txt_caption p').empty().html(captionVideo);
						$(targetLayer).attr('tabindex',-1).focus();

						var revelTop = 0;
						$('.area_caption button').each(function(){
								$(this).click(function(){
										var targetCont = $(this).siblings('.txt_caption');
										var maxScroll = targetCont.find('p').height() -300;

										if($(this).hasClass('scroll_up')){
												if( revelTop <= 0 ) {
														revelTop = 0;
												} else {
														revelTop = revelTop - 150;
														targetCont.stop().animate({scrollTop: revelTop}, 150, 'swing');
												}
										} else {
												if ( revelTop >= maxScroll ) {
														revelTop == maxScroll;
												} else {
														revelTop = revelTop + 150;
														targetCont.stop().animate({scrollTop: revelTop}, 150, 'swing');
												}
										};

								});
						});
						$('.scroll_down').focusout(function(){
								$('#listReturn').focus().removeAttr('id');
						});
						e.preventDefault();
				});
		});

}

function viewLayerModule() {
		var elBtn = '<button type="button" class="toggle_layer" title="Layer pop up when view more clicked"></button>';
		var elTarget = $('.wrap_list ul li div');
		elTarget.each(function(){
				var elText = $(this).find('span').text().length;
				if($('html').attr('lang') == 'ja' || $('html').attr('lang') == 'zh') {
						if($(this).parents('div').hasClass('type05') || elText < 45) {
								return
						} else {
								$(this).append(elBtn)
						}
				} else {
						if($(this).parents('div').hasClass('type05') || elText < 100) {
								return
						} else {
								$(this).append(elBtn)
						}
				}
		});

		$('.toggle_layer').each(function(){
				$(this).click(function(){
						$(this).parents('li').toggleClass('active');
						$(this).prev().find('.msieClamp').toggleClass('react');/* 2014.12.29 added */
						if( $(this).parents('li').hasClass('active')) {
								return;
						} else {
								$(this).parent().delay(170).attr('style', '').end().prev('span').scrollTop(0);

						}
				});
		});
}

function selectAll() {
		$('#chkNews01').click(function(){
				var chkElem = $(this).parent().siblings('dd').find('.check');
				chkElem.prop('checked', this.checked);
				chkElem.each(function(){
						$(this).change(function(){
								if($(this).attr('chkecked', false)) {
										$('#chkNews01').prop({checked: false});
								}
						});
				});
		});
}

function mediaRoll() {
		var btnMedia = $('.roll_layer_media button, .box_media button');
		var clickCount = 0;
		var maxCount;
		btnMedia.each(function(e){
				$(this).click(function(){
						var chkWrap = $(this).parent().attr('class');
						var btnDirection = $(this).attr('class').slice(-4);
						var listLength = $(this).siblings('div').find('li').size();
						var posDirection = $(this).siblings('div').innerWidth();
						var clickInit = 0;

						if ( $(this).parent().attr('data-count') === undefined ) {
								$(this).parent().attr('data-count' , clickInit);
						} else {
								clickInit = $(this).parent().attr('data-count');
						}
						clickCount = clickInit;

						// 리스트 갯수 확인
						if($(this).parent().hasClass('roll_layer_media')) {
								if(listLength % 5 === 0 ){
										maxCount = parseInt(listLength/5);
								} else {
										maxCount = parseInt(listLength/5) + 1;
								}
						} else {
								if($(this).parent().hasClass('photo')) {
										if(listLength % 4 === 0 ){
												maxCount = parseInt(listLength/4);
										} else {
												maxCount = parseInt(listLength/4) + 1;
										}
								}else {
										if(listLength % 3 === 0 ){
												maxCount = parseInt(listLength/3);
										} else {
												maxCount = parseInt(listLength/3) + 1;
										}
								}
						}

						// 리스트 이동
						if( btnDirection == 'next' ) {
								clickCount++;
								if (clickCount >= maxCount) {
										clickCount = maxCount - 1;
								} else {
										$(this).siblings().find('ul').animate({
												marginLeft: -posDirection * clickCount
										},300, 'swing');
								}
						} else {
								clickCount--;
								if( clickCount < 0){
										clickCount = 0;
								} else {
										$(this).siblings().find('ul').animate({
												marginLeft: -(posDirection * clickCount)
										},300, 'swing');
								}
						}
						$(this).parent().attr('data-count', clickCount);

				});
		});
}

function tabMapInfo() {
		$('.menu_map_category a').each(function( i ){

				$(this).click(function(e){
						var viewArea = $(this).attr('href');
						$(this).siblings().removeClass('active');
						$('.map_cate_box').stop().slideUp(250).removeAttr('tabindex');
						$(this).addClass('active');
						$(viewArea).stop().slideDown(350).focus().attr('tabindex',-1).focus();

						var heightSize = 0;
						$(viewArea).children().each(function(){
								heightSize += ($(this).height()+13);
						});

						$(viewArea).height(heightSize);

						$(viewArea +' .tbl_map_info').last().focusout(function(){
								$('.menu_map_category a[href='+viewArea+']').next().focus();
						});
						e.preventDefault();
				});

				$(this).focusout(function(){

						var viewArea = $(this).attr('href');
						$(viewArea).attr('tabindex',-1).focus();
						$(viewArea).find('.tbl_map_info').last().focusout(function(){

								$(this).parents('.wrap_info_category').prev().find('a[href='+viewArea+']').next().focus();
						});
						$(viewArea).find('.tbl_map_info.active').last().focusout(function(){
								$(this).parents('.wrap_info_category').prev().find('a[href='+viewArea+']').next().focus();
						});
				});
		});
}

function scrollHistory() {
		$('.nav_history3 a').each(function(i){
				var addr = $(location).attr("href").indexOf("#");
				var choice = $(location).attr("href").substr(addr+11);

				if(choice != "" && choice.length < 3) {
						var findClass = "history"+choice;
						$('.col2 a').removeClass('active');
						$('.'+findClass).addClass('active');
				}

				$(this).click(function(){
						$('.col1 a').removeClass('active');
						$('.col2 a').removeClass('active');
						$(this).siblings().removeClass('active');
						$(this).addClass('active');

						$('html,body').stop().animate({ scrollTop: $($(this).attr("href")).offset().top }, 50,'swing');

						return false;
				});
		});
}

function rollVisTop() {
		btnPosition();
		function btnPosition() {
				$('.nav_vis_top .btn_nav').each(function(){
						if($(window).width() > 1240 ) {
								var btnLeft = $('.wrap_nav').offset().left;
								var btnRight = ($(window).width() - $('.wrap_nav').width()) /2;
						} else {
								var btnLeft = 50;
								var btnRight = 50;
						}
						if($(this).hasClass('prev')) {
								$(this).css({
										right: btnRight + 50
								});
						}else {
								$(this).css({
										right: btnRight
								});
						}
				});
		}
		$(window).resize(function(){
				btnPosition();
		});
		var clickCount = 0;
		$('.nav_vis_top .btn_nav').each(function(){
				$(this).click(function(){
						var movRoll = $(this).siblings().find('li').width();
						var maxCount = $(this).siblings().find('li').length - 6
						if($(this).hasClass('prev')) {
								if( clickCount >= 0) {
										clickCount = 0;
										$(this).next().find('ul').animate({
												marginLeft: 0
										});
								} else {
										clickCount++;
										$(this).next().find('ul').animate({
												marginLeft: movRoll* clickCount
										},170);
								}
						}
						else {
								if( clickCount == -maxCount) {
										$(this).prev().find('ul').animate({
												marginLeft: movRoll  * -maxCount
										},170);

								} else {
										clickCount--;
										$(this).prev().find('ul').animate({
												marginLeft: movRoll  * clickCount
										},170);
								}
						}
				});
		});
}

function funcGnb() {
		var gnbt01 = $('.gnb_1dpt > li > a');
		var gnbt02 = $('.gnb_2dpt > ul > li > a');
		var gnbt03 = $('.gnb_3dpt > li > a');

		$('.skip_navigation a').click(function(){
				var targetSkip = $(this).attr('href');
				$(targetSkip).attr('tabindex', -1);
		});

		gnbt01.each(function(){
				$(this).click(function(e){
						var posTop = $(this).parents('ul').height();
						var boxWidth = $(this).parents('ul').width() - 50;
						var target = $(this).attr('href');

						if ( target.indexOf("#gnb2") ) {
								// 2Depth 페이지가 없는 1Depth 페이지의 경우 페이지 이동만 이루어져야함.
								// Inserted by StomX
								// 2014. 12. 11
						} else {
								$(this).parent().siblings().find('a').removeClass('active');
								$(this).addClass('active');
								$('.gnb_2dpt').stop().slideUp(170, 'swing');
								$('.gnb_2dpt, .lyr_search').slideUp(170, 'swing');
								$('.gnb_1dpt > li > a, .box_menu_search a').removeClass('active');
								
								$(target).css({
										top: posTop//,
										//width: boxWidth
								}).stop().slideDown(170, 'swing', function(){

										var hList = new Array();
										var gnbHeight = $(this).children().children('li').height();
										$('.gnb_2dpt > ul').each(function(i){
												hList[i] = $(this).children('li').length;
										});
										var maxH = Math.max.apply(null,hList);
										$('.gnb_2dpt > ul').css({
												height: maxH * gnbHeight
										});
								});
								if(!$(this).children().hasClass('gnb_2dpt')){
										e.preventDefault();
								} else {
										return
								}
						}
				});
		});

		gnbt02.each(function(){
				if($(this).next('ul').hasClass('gnb_3dpt')){
						$(this).addClass('hasSub');
				}
				$(this).click(function(e){
						var posLeft = $(this).parents('ul').outerWidth() + 20;
						$('.gnb_3dpt').removeClass('view').fadeOut(170);
						$(this).parent().siblings().find('a').removeClass('active');
						$(this).addClass('active').next('ul').addClass('view').css({left:posLeft}).fadeIn(170);
						if($(this).next().hasClass('view')){
								$(this).parents('ul').next().fadeOut(170);
						} else {
								$(this).parents('ul').next().fadeIn(170);
						};
						if($(this).next().hasClass('gnb_3dpt')){
								e.preventDefault();
						} else {
								return
						}

				});
		});

		gnbt03.each(function(){
				$(this).click(function(){
						$(this).parent().siblings().find('a').removeClass('active');
						$(this).addClass('active');
				});
		});
		$('.close_gnb').click(function(){
				$(this).parents('.gnb_2dpt').stop(300).slideUp(170).prev();
				$(this).parent().prev().removeClass('active').focus();
		});

		$('.box_menu_search a').click(function(e){
				$(this).toggleClass('active');
				if($(this).hasClass('active')){
						$(this).next().slideDown(170, 'swing');
						$('.gnb_2dpt').slideUp(170, 'swing');
						$('.gnb_1dpt > li > a').removeClass('active');
				} else {
						$(this).next().slideUp(170, 'swing');
						$('.gnb_1dpt > li > a').removeClass('active');
				}
				$($(this).attr('href')).focus();
				e.preventDefault();
		});
		$('.box_menu_search .close_gnb').click(function(){
				$(this).parents('.lyr_search').slideUp(150,'swing').prev('a').focus();
		});
}

function layerOpen() {
		var targetLayer;
		layerSports();
		layerImage();
		$('.indicator_sports > a').each(function(){
				$(this).click(function(e){
						var footIndex = $(this).next().find('li').length;
						var footLeft = ($(window).width() - $('.layer_map_info').outerWidth()) /2;
						var footTop = ($(window).outerHeight() - $('.layer_map_info').outerHeight()) /2 -50;

						$('.cont_video').hide().removeAttr('tabindex');
						$('.cont_image').show().removeAttr('tabindex');
						targetClass = $(this).attr('class');
						var findClass = targetClass.indexOf('iden');
						var extClass = targetClass.substr(findClass, 6)

						targetLayer = $(this).attr('href');
						$(this).attr('id','tReturn');
						if($(targetLayer).find('.layer_map_cont > div').hasClass('active')) {
								$(targetLayer).find('.layer_map_cont > div').hide();
								$(targetLayer).find('.layer_map_cont > div.active' +'.' +extClass).show();
						} else {
								$(targetLayer).find('.layer_map_cont > div').hide();
								$('.' + extClass).show();
						}
						$('.mask_layer').fadeIn(350,'swing',function(){
								$(targetLayer).css({
										left: footLeft,
										top: footTop
								}).fadeIn(350).attr('tabindex',-1).focus();
						});
						if($(this).parent().hasClass('.indicator_footprint')){
								$('body').css({
										overflow: 'hidden',
										paddingRight: 15
								});
						}

						// Video
						var initVideo = $(targetLayer).find('.wrap_layer_roll li:first-child .el_video p').text();
						//$(targetLayer).focus().find('.area_video iframe').attr('src', initVideo);

						if($('html').attr('lang') == 'zh'){
								var targetPlayer = '<object type="application/x-shockwave-flash" data="" width="640" height="360" id="sb-player" allowScriptAccess="always"><param name="movie" value="'+initVideo+'"><param name="bgcolor" value="#000000"><param name="allowfullscreen" value="true"><param name="flashvars" value="autostart=false"></object>';
								$(targetLayer).focus().find('.area_video').empty().html(targetPlayer).children().attr('data', initVideo)
						} else {
								$(targetLayer).focus().find('.area_video iframe').attr('src', initVideo);
						}
						e.preventDefault();
				});
		});

		$(window).resize(function(){
				var footLeft = ($(window).width() - $('.layer_map_info').outerWidth()) /2;
				var footTop = ($(window).outerHeight() - $('.layer_map_info').outerHeight()) /2;
				$('.layer_map_info').css({
						left: footLeft,
						top: footTop
				});
		});

		$('.close_layer').each(function(){

				$(this).click(function(){
						$(this).parents('.layer_map_info, .layer_video').fadeOut(350,'swing',function(){
								$('.mask_layer').fadeOut(350);
								if($('html').attr('lang') =='zh'){
										$('.area_video').find('object').attr('data', '');
								} //else {
								$('.area_video').find('iframe').attr('src', '');
								//}
								$(targetLayer).attr('tabindex','');
								$('#tReturn').focus().removeAttr('id','');
						});
						$(this).prev('.layer_map_cont').find('.nav_result_1dpt > li').removeClass().first().addClass('active');

						$('body').css({
								overflow: 'auto',
								paddingRight: 0
						});
				});

				$(this).keydown(function(e){
						if(e.keyCode =='9'){
								return false
						}
				})
		});
}

function layerSports() {
		$('.btn_video_figure, .btn_play_video').each(function(){

				$(this).click(function(e){
						$(this).attr('id','tReturn');

						var titVideo = $(this).find('.video-tit').text();
						var contVideo = $(this).find('.el_video p').text();
						var captionVideo = $(this).find('.el_video').next().html();
						var targetLayer = $(this).attr('href');

						var kollusBol = contVideo.indexOf("kollus");
						if($('html').attr('lang') == 'zh' && kollusBol == -1){
								var targetPlayer = '<object type="application/x-shockwave-flash" data="" width="640" height="360" id="sb-player" allowScriptAccess="always" title="jwplayer"><param name="movie" value="'+contVideo+'"><param name="bgcolor" value="#000000"><param name="allowfullscreen" value="true"><param name="flashvars" value="autostart=false"></object>';
								$(targetLayer).find('.area_video').empty().html(targetPlayer).children().attr('data', contVideo);
						} else {
								var targetPlayer = '<iframe width="640" height="360" src="" frameborder="0" allowfullscreen title="youtube"></iframe>';
								$(targetLayer).find('.area_video').empty().html(targetPlayer).children().attr('src', contVideo);
						}

						$(targetLayer).find('.header_video .video-tit').empty().text(titVideo);
						$(targetLayer).find('.txt_caption p').empty().html(captionVideo);


						var footLeft = ($(window).width() - $('.layer_video').outerWidth()) /2;
						var footTop = ($(window).height() - $('.layer_video').outerHeight()) /2;
						targetLayer = $(this).attr('href');
						$(targetLayer + ' .cont_video').show();
						$(targetLayer + ' .cont_image').hide();

						var revelTop = 0;
						$('.area_caption button').each(function(){
								$(this).click(function(){
										var targetCont = $(this).siblings('.txt_caption');
										var maxScroll = targetCont.find('p').height() -300;

										if($(this).hasClass('scroll_up')){
												if( revelTop <= 0 ) {
														revelTop = 0;
												} else {
														revelTop = revelTop - 150;
														targetCont.stop().animate({scrollTop: revelTop}, 150, 'swing');
												}
										} else {
												if ( revelTop >= maxScroll ) {
														revelTop == maxScroll;
												} else {
														revelTop = revelTop + 150;
														targetCont.stop().animate({scrollTop: revelTop}, 150, 'swing');
												}
										};

								});
						});


						$('.mask_layer').fadeIn(350,'swing',function(){
								$(targetLayer).css({
										left: footLeft,
										top: footTop
								}).fadeIn(350).attr('tabindex',-1).focus();
						});
						e.preventDefault();
				});
		});
		$('.btn_video_figure_children').each(function(){
				$(this).click(function(e){
						$(this).parent().children(".btn_video_figure").attr('id','tReturn');

						var titVideo = $(this).parent().children(".btn_video_figure").find('.video-tit').text();
						var contVideo = $(this).parent().children(".btn_video_figure").find('.el_video p').text();
						var captionVideo = $(this).parent().children(".btn_video_figure").find('.el_video').next().html();
						var targetLayer = $(this).parent().children(".btn_video_figure").attr('href');
						var kollusBol = contVideo.indexOf("kollus");
						if($('html').attr('lang') == 'zh' && kollusBol == -1){
								var targetPlayer = '<object type="application/x-shockwave-flash" data="" width="640" height="360" id="sb-player" allowScriptAccess="always" title="jwplayer"><param name="movie" value="'+contVideo+'"><param name="bgcolor" value="#000000"><param name="allowfullscreen" value="true"><param name="flashvars" value="autostart=false"></object>';
								$(targetLayer).find('.area_video').empty().html(targetPlayer).children().attr('data', contVideo);
						} else {
								var targetPlayer = '<iframe width="640" height="360" src="" frameborder="0" allowfullscreen title="youtube"></iframe>';
								$(targetLayer).find('.area_video').empty().html(targetPlayer).children().attr('src', contVideo);
						}

						$(targetLayer).find('.header_video .video-tit').empty().text(titVideo);
						$(targetLayer).find('.txt_caption p').empty().html(captionVideo);


						var footLeft = ($(window).width() - $('.layer_video').outerWidth()) /2;
						var footTop = ($(window).height() - $('.layer_video').outerHeight()) /2;
						targetLayer = $(this).attr('href');
						$(targetLayer + ' .cont_video').show();
						$(targetLayer + ' .cont_image').hide();

						var revelTop = 0;
						$('.area_caption button').each(function(){
								$(this).click(function(){
										var targetCont = $(this).siblings('.txt_caption');
										var maxScroll = targetCont.find('p').height() -300;

										if($(this).hasClass('scroll_up')){
												if( revelTop <= 0 ) {
														revelTop = 0;
												} else {
														revelTop = revelTop - 150;
														targetCont.stop().animate({scrollTop: revelTop}, 150, 'swing');
												}
										} else {
												if ( revelTop >= maxScroll ) {
														revelTop == maxScroll;
												} else {
														revelTop = revelTop + 150;
														targetCont.stop().animate({scrollTop: revelTop}, 150, 'swing');
												}
										};

								});
						});


						$('.mask_layer').fadeIn(350,'swing',function(){
								$(targetLayer).css({
										left: footLeft,
										top: footTop
								}).fadeIn(350).attr('tabindex',-1).focus();
						});
						e.preventDefault();
				});
		});
};

function layerImage() {
		$('.btn_view_image').each(function(){
				$(this).click(function(e){
						$(this).attr('id','tReturn');
						$('.cont_video').hide();
						$('.cont_image').show();
						targetLayer = $(this).attr('href');
						var titImage = $(this).find('span').text();
						var footLeft = ($(window).width() - $('.layer_video').outerWidth()) /2;
						var footTop = ($(window).outerHeight() - $('.layer_video').outerHeight()) /2;
						var contImage = $(this).children('img').attr('src').replace('img_thumb_sport', 'img_cont_sprots');
						$(targetLayer).find('.cont_image img').attr('src', contImage);
						$(targetLayer).find('.header_video .video-tit').empty().text(titImage);
						$('.mask_layer').fadeIn(350,'swing',function(){
								$(targetLayer).css({
										left: footLeft,
										top: footTop
								}).fadeIn(350).attr('tabindex',-1).focus();
						});
						e.preventDefault();
				});
		});
};

function gotoTop() {
		function posGoto() {
				var gotoLeft;
				if($(window).width() <= 1300) {
						gotoLeft = $(window).width() - 50;
				} else {
						gotoLeft = $('.box_inner').offset().left + $('.box_inner').width() + 20;
				};
				$('.btn_gotop').stop().fadeIn(350,'swing').css({
						left: gotoLeft
				});
		}
		$(window).resize(function(){
				posGoto();
		});
		$(window).scroll(function(){
				posGoto();
				if($(window).scrollTop() == 0){
						$('.btn_gotop').stop().fadeOut(350,'swing');
				}
		});
		$('.btn_gotop a').click(function(){
				$('html,body').stop().animate({ scrollTop: $($(this).attr("href")).offset().top }, 350,'swing');
				return false;
		});
}

// 2019-12-10 headFixFlex 추가 (뎁스1, 뎁스2에서 사용)
function headFixFlex() {
	scrollFix();
	function scrollFix(){
		var WindowScrollTop = $(window).scrollTop();
		var gnbReverse = 5;
		var header3dptIs = $('header').hasClass('header_static');
		if( WindowScrollTop > gnbReverse ){
			$('#header').addClass('header_fixed');
			$("#gnb_logo a img").attr('src', '/content/dam/hanwha/resources/images/common/img_logo_white.svg'); // ** 2019-12-10 서버경로로 바꿔주세요
			$('#gnb .gnb_1dpt li a[href$="#gnb2Dpt01"]').hover(function(){
				$(this).find('img').css({marginTop:-24});
			}, function(){
				$(this).find('img').css({marginTop:0});
			});
		} else {
			$('#header').removeClass('header_fixed');
			if(!header3dptIs){
				$('#gnb_logo a img').attr('src', '/content/dam/hanwha/resources/images/common/img_logo.svg'); // ** 2019-12-10 서버경로로 바꿔주세요
				$('#gnb .gnb_1dpt li a[href$="#gnb2Dpt01"]').hover(function(){
					$(this).find('img').css({marginTop:-12});
				}, function(){
					$(this).find('img').css({marginTop:0});
				});
			}else{
				$("#gnb_logo a img").attr('src', '/content/dam/hanwha/resources/images/common/img_logo_white.svg'); // ** 2019-12-10 서버경로로 바꿔주세요
				$('#gnb .gnb_1dpt li a[href$="#gnb2Dpt01"]').hover(function(){
					$(this).find('img').css({marginTop:-24});
				}, function(){
					$(this).find('img').css({marginTop:0});
				});
			}
		}
	}
	$(window).resize(function(){
		scrollFix();
	});
	$(window).scroll(function(){
		scrollFix();
		if($(window).scrollTop() == 0){
			$('#header').removeClass('header_fixed');
		}
	});
}

function selectBox() {
		var cnt = 20;
		$('.selectbox > a').each(function(i){
				$(this).click(function(event){
						event.preventDefault();

						$('.selectbox').children('ul').stop(300).slideUp(350).css({
								zIndex: 10
						});

						var wrapWidth = $(this).outerWidth() -2;

						// 두번 클릭 되는 이유 주석 처리 20150730
						//$('.selectbox').css({
						//	zIndex: 10
						//}).children('ul').stop(300).slideUp(350);
						//$(this).toggleClass('active').parent().siblings('div').find('a').removeClass('active');

						cnt+=1;

						//if(!$(this).hasClass('active')) {
						$(this).next().css({
								width: wrapWidth
						}).stop(300).slideDown(250).parents('.selectbox').css({
								zIndex: cnt
						});
						$(this).parent().find('a').removeClass('active');
						//}

						/*
						 else {
						 alert("dactive");
						 $(this).next().css({
						 zIndex: 0
						 }).stop(300).slideUp(350,function(){
						 $(this).parents('.selectbox').css({
						 zIndex: 10
						 });
						 });
						 $(this).parent().find('a').addClass('active');
						 };
						 */

						$(document).click(function(e){
								// checkBox 클릭 않되는 문제 발생.
								// e.preventDefault();
								if($(e.target).parents('.selectbox').size() === 0) {
										$('.selectbox').children('ul').stop(300).slideUp(350).css({
												zIndex: 10
										});
								}
						});



						event.returnValue = false;
				});

		});




		$('.selectbox > ul > li> a').each(function(){
				$(this).click(function(e){
						$(this).parent().siblings().find('a').removeClass('selected');

						$(this).addClass('selected').parents('.selectbox').addClass('activated');
						if ( $(this).parents("li").parents("li").attr("class") != null ){
						} else {
								$(this).parents('li').next('.select_2dpt').delay(350).slideDown();
						}
						/* START
						 2014.11.06
						 Inserted by StomX
						 */
						if ( $(this).parents('li').parents('li').attr('id') == "liCategory" || $(this).parents('li').parents('li').attr('id') == "liRegion") {
								$(this).parent().siblings().find('a').removeClass('selected');
								$(this).addClass('selected').parents('.selectbox').addClass('activated');
								if ( $(this).parents('li').parents('li').attr('id') == "liCategory" ) {
										if ( $(this).data("key") == "04" ) { //Financial Services
												$('.select_2dpt.subCategory > .selectbox  > a').text($("#selecttext").text());
												$('.select_2dpt.subCategory > .selectbox  > a').data("key", "");
												//$('.select_2dpt.subCategory').stop(100).slideUp();
												//$('.select_2dpt.subCategory.fs').delay(350).slideDown();
												$('.select_2dpt.subCategory').hide();
												$('.select_2dpt.subCategory.fs').show();
										} else if ( $(this).data("key") == "05") { //Leisure & Lifestyle
												$('.select_2dpt.subCategory > .selectbox  > a').text($("#selecttext").text());
												$('.select_2dpt.subCategory > .selectbox  > a').data("key", "");
												//$('.select_2dpt.subCategory').stop(100).slideUp();
												//$('.select_2dpt.subCategory.lnl').delay(350).slideDown();
												$('.select_2dpt.subCategory').hide();
												$('.select_2dpt.subCategory.lnl').show();
										} else if ( $(this).data("key") == "01" ) { //Aerospace & Mechatronics
												$('.select_2dpt.subCategory > .selectbox  > a').text($("#selecttext").text());
												$('.select_2dpt.subCategory > .selectbox  > a').data("key", "");
												//$('.select_2dpt.subCategory').stop(100).slideUp();
												//$('.select_2dpt.subCategory.mnt').delay(350).slideDown();
												$('.select_2dpt.subCategory').hide();
												$('.select_2dpt.subCategory.anm').show();
										} else if ( $(this).data("key") == "02" ) { //Chemicals & Materials
												$('.select_2dpt.subCategory > .selectbox  > a').text($("#selecttext").text());
												$('.select_2dpt.subCategory > .selectbox  > a').data("key", "");
												//$('.select_2dpt.subCategory').stop(100).slideUp();
												//$('.select_2dpt.subCategory.mnt').delay(350).slideDown();
												$('.select_2dpt.subCategory').hide();
												$('.select_2dpt.subCategory.cnm').show();
										} else {
												//$('.select_2dpt.subCategory > .selectbox  > a').text($(this).text());
												//$('.select_2dpt.subCategory').stop(100).slideUp();
												//$('.select_2dpt.subCategory.df').delay(350).slideDown();
												$('.select_2dpt.subCategory > .selectbox  > a').text("Select");
												$('.select_2dpt.subCategory').hide();
												$('.select_2dpt.subCategory.df').show();
												$('#chkEmailSecondDf01').addClass("dim");
										}
								} else if ( $(this).parents('li').parents('li').attr('id') == "liRegion" ){

										if ( $(this).data("key") == "01" ) { //Africa
												$('.select_2dpt.country > .selectbox  > a').text($("#selecttext").text());
												$('.select_2dpt.country > .selectbox  > a').data("key", "");
												//$('.select_2dpt.country').stop(100).slideUp();
												//$('.select_2dpt.country.af').delay(350).slideDown();
												$('.select_2dpt.country').hide();
												$('.select_2dpt.country.af').show();
										} else if ( $(this).data("key") == "02" ) { //Asia Pacific
												$('.select_2dpt.country > .selectbox  > a').text($("#selecttext").text());
												$('.select_2dpt.country > .selectbox  > a').data("key", "");
												//$('.select_2dpt.country').stop(100).slideUp();
												//$('.select_2dpt.country.ap').delay(350).slideDown();
												$('.select_2dpt.country').hide();
												$('.select_2dpt.country.ap').show();
										} else if ( $(this).data("key") == "03" ) { //Middle East
												$('.select_2dpt.country > .selectbox  > a').text($("#selecttext").text());
												$('.select_2dpt.country > .selectbox  > a').data("key", "");
												//$('.select_2dpt.country').stop(100).slideUp();
												//$('.select_2dpt.country.me').delay(350).slideDown();
												$('.select_2dpt.country').hide();
												$('.select_2dpt.country.me').show();
										} else if ( $(this).data("key") == "04" ) { //Europe
												$('.select_2dpt.country > .selectbox  > a').text($("#selecttext").text());
												$('.select_2dpt.country > .selectbox  > a').data("key", "");
												//$('.select_2dpt.country').stop(100).slideUp();
												//$('.select_2dpt.country.eu').delay(350).slideDown();
												$('.select_2dpt.country').hide();
												$('.select_2dpt.country.eu').show();
										} else if ( $(this).data("key") == "05" ) { //Latin America
												$('.select_2dpt.country > .selectbox  > a').text($("#selecttext").text());
												$('.select_2dpt.country > .selectbox  > a').data("key", "");
												//$('.select_2dpt.country').stop(100).slideUp();
												//$('.select_2dpt.country.la').delay(350).slideDown();
												$('.select_2dpt.country').hide();
												$('.select_2dpt.country.la').show();
										} else if ( $(this).data("key") == "06" ) { //North America
												$('.select_2dpt.country > .selectbox  > a').text($("#selecttext").text());
												$('.select_2dpt.country > .selectbox  > a').data("key", "");
												//$('.select_2dpt.country').stop(100).slideUp();
												//$('.select_2dpt.country.na').delay(350).slideDown();
												$('.select_2dpt.country').hide();
												$('.select_2dpt.country.na').show();
										} else {
												//$('.select_2dpt.country > .selectbox  > a').text($(this).text());
												//$('.select_2dpt.country').stop(100).slideUp();
												//$('.select_2dpt.country.df').delay(350).slideDown();
												$('.select_2dpt.country > .selectbox  > a').text("Select");
												$('.select_2dpt.country > .selectbox  > a').data("key", $(this).data("key"));
												$('.select_2dpt.country').hide();
												$('.select_2dpt.country.df').show();
												$('#chkEmailSecondDf02').addClass("dim");
										}
								}
						}
						/* END
						 2014.11.06
						 Inserted by StomX
						 */

						var txtSelect = $(this).text();
						var txtSelectKey = $(this).data("key");
						$(this).parent().parent().slideUp(350,function(){
								$(this).parent().css({
										zIndex: 10
								});
						}).prev().data("key",txtSelectKey).text(txtSelect).removeClass('active').focus();
						e.preventDefault();
				});
		});
}

function sectionEven() {
		$('.box_main_cont:odd').addClass('even');
}

function rollSlider() {
		//$('.wrap_list[id]').each(function(){
		$("[class^='wrap_list']").each(function(){
				var listId = $(this).attr('id');
				var navId = $(this).prev().attr('id');
				var lengthList = $(this).find('li').length;
				var listWidth = $(this).find('li').width();
				$('.nav_roll').each(function(){			
						if ($(this).find('button').size() == 1 ) {
								$(this).css({
										visibility: 'hidden',
										height: 0
								});					
						}
				});
				$('#' +listId).addClass('swiper-container').find('ul').addClass('swiper-wrapper').find('li').addClass('swiper-slide');
				$('#' + listId).prev('.nav_roll').addClass('pagination').detach().appendTo('#' +listId)					
				if($('#' + listId).hasClass('type03') || $('#' + listId).hasClass('type04')) {
						if (lengthList < 5 ) {
								$(this).css({
										width: listWidth * lengthList
								});
								$(this).parent().find('.nav_roll').css({
										height: 0
								});
						} else {
								var listSize = $('#' + listId + ' .swiper-slide').size();
								var listRemain = Math.abs(listSize%4 - 4);
								if( listRemain != 4 ) {
										for ( var i = 0; i < listRemain; i++ ) {
												$('#' + listId + ' .swiper-wrapper').append('<li class="swiper-slide add"></li>')						
										}
								}

								var mySwiper = new Swiper('#' +listId+'.swiper-container', {
										pagination: '#' +listId+' .pagination',
										paginationClickable: true,
										paginationAsRange: false,
										slidesPerViewFit: false,
										paginationAsRange:4,
										slidesPerGroup: 4,
										slidesPerView: 4,
										simulateTouch: false
								})
								$('#' + listId+' .nav_roll button').hide().filter(':nth-child(4n+1)').show();
						}
				/* 뉴스룸 뷰페이지 슬라이드 20170912*/
				} else if($('#' + listId).hasClass('typenews')) {

						if($('#' + listId).hasClass('typeoldnews')) { // 기존 템플릿 사용시
								var listSize = $('#' + listId + ' .swiper-slide').size();
								var listRemain = Math.abs(listSize%3 - 3);
								if( listRemain != 3 ) {
										for ( var i = 0; i < listRemain; i++ ) {
												$('#' + listId + ' .swiper-wrapper').append('<li class="swiper-slide add"></li>')
										}
								}

								 if(listSize < 4) {
										var mySwiper = new Swiper('#' +listId+'.swiper-container', {
												slidesPerViewFit: false,
												slidesPerGroup: 3,
												slidesPerView: 3,
												simulateTouch: false
										});
								} else {
										var mySwiper = new Swiper('#' +listId+'.swiper-container', {
												pagination: '#' +listId+' .pagination',
												paginationClickable: true,
												paginationAsRange: false,
												slidesPerViewFit: false,
												paginationAsRange:3,
												slidesPerGroup: 3,
												slidesPerView: 3,
												simulateTouch: false
										});
								}
								$('#' + listId+' .nav_roll button').hide().filter(':nth-child(3n+1)').show();

						} else {
								var listSize = $('#' + listId + ' .swiper-slide').size();
								var listRemain = Math.abs(listSize%2 - 2);
								if( listRemain != 2 ) {
										for ( var i = 0; i < listRemain; i++ ) {
												$('#' + listId + ' .swiper-wrapper').append('<li class="swiper-slide add"></li>')
										}
								}

								if(listSize < 3) {
										var mySwiper = new Swiper('#' +listId+'.swiper-container', {
												slidesPerViewFit: false,
												slidesPerGroup: 2,
												slidesPerView: 2,
												simulateTouch: false
										});
								} else {
										var mySwiper = new Swiper('#' +listId+'.swiper-container', {
												pagination: '#' +listId+' .pagination',
												paginationClickable: true,
												paginationAsRange: false,
												slidesPerViewFit: false,
												paginationAsRange:2,
												slidesPerGroup: 2,
												slidesPerView: 2,
												simulateTouch: false
										});
								}
								$('#' + listId+' .nav_roll button').hide().filter(':nth-child(2n+1)').show();
						}

						if(listSize < 2) {
				$(".typenews").addClass("oneslide");
						}


				/* //뉴스룸 뷰페이지 슬라이드 20170912*/
				} else {

						if (lengthList < 4 ) {
								$(this).css({
										width: (listWidth * lengthList) + 40
								});
								$(this).parent().find('.nav_roll').css({
										height: 0
								});				
						} else {
								var listSize = $('#' + listId + ' .swiper-slide').size();
								var listRemain = Math.abs(listSize%3 - 3);
								if( listRemain != 3 ) {
										for ( var i = 0; i < listRemain; i++ ) {
												$('#' + listId + ' .swiper-wrapper').append('<li class="swiper-slide add"></li>')							
										}
								}
								var mySwiper = new Swiper('#' +listId+'.swiper-container', {
										pagination: '#' +listId+' .pagination',
										paginationClickable: true,
										paginationAsRange: false,
										slidesPerViewFit: false,
										paginationAsRange:3,
										slidesPerGroup: 3,
										slidesPerView: 3,
										keyboardControl: true,
										simulateTouch: false
								})
								$('#' + listId+' .nav_roll button').hide().filter(':nth-child(3n+1)').show();
						}
				}
		});
				
		var scrollBool = false;

		function boolChn(){
				scrollBool = false;
		}

		$('.wrap_list').each(function(){
				$(this).find('a').each(function(){

						$(this).on( 'keydown', function(e){
								if((e.keyCode == 9 && !event.shiftKey) || (e.keyCode == 9 && event.shiftKey)) {
										if(scrollBool){
												return false;
										}
								}

						});

						$(this).on( 'keyup', function(e){
								var chkIndex = $(this).parent('li').index() + 1;
								if(!scrollBool){
										if(chkIndex == 1){
												$(this).parents('.swiper-wrapper').stop().scrollLeft(0).prev().find('button').eq(chkIndex-1).trigger('click');
										}
										/*
										 if(e.keyCode == 9) {
										 if($(this).parents('.wrap_list').hasClass('type03') || $(this).parents('.wrap_list').hasClass('type04')  ) {
										 if($(this).parent('li').is(':nth-child(4n)')){
										 $(this).parents('.swiper-wrapper').stop().scrollLeft(0).prev().find('button').eq(chkIndex).trigger('click');
										 }
										 } else {
										 if($(this).parent('li').is(':nth-child(3n)')){
										 //swiperObj.content_containerbusiness_highlight_s.swipeNext();
										 }
										 }
										 }
										 */
										if(e.keyCode == 9 && !event.shiftKey) {
												if(chkIndex != 1){
														$(this).parents('.swiper-wrapper').stop().scrollLeft(0).prev().find('button').eq(chkIndex-1).trigger('click');
												}
										}
										if(event.shiftKey && event.keyCode == 9) {
												$(this).parents('.swiper-wrapper').stop().scrollLeft(0).prev().find('button').eq(chkIndex-1).trigger('click');
										}
										scrollBool=true;
										setTimeout(function(){ scrollBool=false; }, 500);
								}
						});
				});
		});

}

// Main top visual area
var contentRoll = $('.nav_vis_top').find('.active').parent('li').index();
var countRoll;


function visTop(){
		//changeFig();
		initVis();
		autoRoll();
		// resizeFig();  2019-12-10 삭제

		// $(window).resize(function(){
		// 		resizeFig();
		// });  2019-12-10 삭제

		var rollInterval;
		$('.btn_visual button').each(function(){
				$(this).click(function(){
						if($(this).hasClass('stop')) {
								clearInterval(rollInterval);
						} else {
								contentRoll = $('.nav_vis_top .active').parent('li').index();
								autoRoll();
						}
				});
		});

		function autoRoll() {
				countRoll = contentRoll;
				var maxRoll = $('.nav_vis_top a').size() -1;

				setTimeout(function(){

						rollInterval = setInterval(function(){
								countRoll++;
								if(countRoll > maxRoll) {
										countRoll = 0;
								}
								$('.nav_vis_top a').removeClass('active');
								$('.nav_vis_top li').eq(countRoll).children('a').addClass('active');
								initVis();

						}, 6000);

				});
		}
		function initVis() {
				$('.nav_vis_top a').each(function(){
						if($(this).hasClass('active')){
								var targetFig = $(this).attr('name');
								$('.visual_top .visual_image').hide();
								$(targetFig).show()
										.find('h2').css({marginLeft: -1220}).animate({marginLeft: 0},300)
										.next().css({marginLeft: -1220}).animate({marginLeft: 0},500)
										.next().css({marginLeft: -1220}).animate({marginLeft: 0}, 700);
						}
				});
		}

		function changeFig() {
				var btnFig = $('.nav_vis_top a');
				btnFig.click(function(e){
						var targetFig = $(this).attr('name');
						countRoll = $(this).parent('li').index();

						$('.visual_top .visual_image').css({zIndex: 0});
						$(targetFig).css({zIndex: 20}).fadeIn(300)
								.find('h2').css({marginLeft: -1220}).animate({marginLeft: 0},300)
								.next().css({marginLeft: -1220}).animate({marginLeft: 0},500)
								.next().css({marginLeft: -1220}).animate({marginLeft: 0}, 700);

						btnFig.removeClass('active');
						$(this).addClass('active');
				});
				$('.visual_image figcaption h2').css({marginLeft: -1220}).animate({marginLeft: 0},300)
						.next().css({marginLeft: -1220}).animate({marginLeft: 0},500)
						.next().css({marginLeft: -1220}).animate({marginLeft: 0}, 700);

		}

	/* 2019-12-10 삭제
		function resizeFig() {
				var revelWindow = $(window).width();
				if(revelWindow < 1500) {
						$('#visualMain .visual_image figcaption p').css({
								marginTop: 10,
								marginBottom: 50
						});
						$('#visualMain .visual_image figcaption').css({
								height: 290,
								marginTop: -383
						});
						$('#visualSubMain .visual_image figcaption').css({
								height: 250,
								marginTop: -250
						});
						$('#visualSubMain .visual_image figcaption p').css({
								marginTop: 35
						})
				} else if (revelWindow > 1700 ) {
						$('#visualMain .visual_image figcaption p, #visualSubMain .visual_image figcaption p').attr('style', '');
						$('#visualMain .visual_image figcaption').css({
								height: 390,
								marginTop: -483
						});
						$('#visualSubMain .visual_image figcaption').css({
								height: 360,
								marginTop: -360
						});
				} else {
						$('#visualMain .visual_image figcaption p, #visualMain .visual_image figcaption, #visualSubMain .visual_image figcaption, #visualSubMain .visual_image figcaption p').attr('style', '');
				}
		}
	*/
}

(function (window, undefined) {
		"use strict";
		// test for REM unit support
		var cssremunit =  function() {
						var div = document.createElement( 'div' );
						div.style.cssText = 'font-size: 1rem;';

						return (/rem/).test(div.style.fontSize);
				},

		// filter returned links for stylesheets
				isStyleSheet = function () {
						var styles = document.getElementsByTagName('link'),
								filteredLinks = [];

						for ( var i = 0; i < styles.length; i++) {
								if ( styles[i].rel.toLowerCase() === 'stylesheet' && styles[i].getAttribute('data-norem') === null ) {

										filteredLinks.push( styles[i].href );
								}
						}

						return filteredLinks;
				},

				processLinks = function () {
						//prepare to match each link
						for( var i = 0; i < links.length; i++ ){
								xhr( links[i], storeCSS );
						}
				},

				storeCSS = function ( response, link ) {

						preCSS.push(response.responseText);
						CSSLinks.push(link);

						if( CSSLinks.length === links.length ){
								for( var j = 0; j <  CSSLinks.length; j++ ){
										matchCSS( preCSS[j], CSSLinks[j] );
								}

								if( ( links = importLinks.slice(0) ).length > 0 ){ //after finishing all current links, set links equal to the new imports found
										CSSLinks = [];
										preCSS = [];
										importLinks = [];
										processLinks();
								} else {
										buildCSS();
								}
						}
				},

				matchCSS = function ( sheetCSS, link ) { // collect all of the rules from the xhr response texts and match them to a pattern
						var clean = removeMediaQueries( sheetCSS ).replace(/\/\*[\s\S]*?\*\//g, ''), // remove MediaQueries and comments
								pattern = /[\w\d\s\-\/\\\[\]:,.'"*()<>+~%#^$_=|@]+\{[\w\d\s\-\/\\%#:!;,.'"*()]+\d*\.?\d+rem[\w\d\s\-\/\\%#:!;,.'"*()]*\}/g, //find selectors that use rem in one or more of their rules
								current = clean.match(pattern),
								remPattern =/\d*\.?\d+rem/g,
								remCurrent = clean.match(remPattern),
								sheetPathPattern = /(.*\/)/,
								sheetPath = sheetPathPattern.exec(link)[0], //relative path to css file specified in @import
								importPattern = /@import (?:url\()?['"]?([^'\)"]*)['"]?\)?[^;]*/gm, //matches all @import variations outlined at: https://developer.mozilla.org/en-US/docs/Web/CSS/@import
								importStatement;

						while( (importStatement = importPattern.exec(sheetCSS)) !== null ){
								importLinks.push( sheetPath + importStatement[1] );
						}

						if( current !== null && current.length !== 0 ){
								found = found.concat( current ); // save all of the blocks of rules with rem in a property
								foundProps = foundProps.concat( remCurrent ); // save all of the properties with rem
						}
				},

				buildCSS = function () { // first build each individual rule from elements in the found array and then add it to the string of rules.
						var pattern = /[\w\d\s\-\/\\%#:,.'"*()]+\d*\.?\d+rem[\w\d\s\-\/\\%#:!,.'"*()]*[;}]/g; // find properties with rem values in them
						for( var i = 0; i < found.length; i++ ){
								rules = rules + found[i].substr(0,found[i].indexOf("{")+1); // save the selector portion of each rule with a rem value
								var current = found[i].match( pattern );
								for( var j = 0; j<current.length; j++ ){ // build a new set of with only the selector and properties that have rem in the value
										rules = rules + current[j];
										if( j === current.length-1 && rules[rules.length-1] !== "}" ){
												rules = rules + "\n}";
										}
								}
						}

						parseCSS();
				},

				parseCSS = function () { // replace each set of parentheses with evaluated content
						for( var i = 0; i < foundProps.length; i++ ){
								css[i] = Math.round( parseFloat(foundProps[i].substr(0,foundProps[i].length-3)*fontSize) ) + 'px';
						}

						loadCSS();
				},

				loadCSS = function () { // replace and load the new rules
						for( var i = 0; i < css.length; i++ ){ // only run this loop as many times as css has entries
								if( css[i] ){
										rules = rules.replace( foundProps[i],css[i] ); // replace old rules with our processed rules
								}
						}
						var remcss = document.createElement( 'style' );
						remcss.setAttribute( 'type', 'text/css' );
						remcss.id = 'remReplace';
						document.getElementsByTagName( 'head' )[0].appendChild( remcss );   // create the new element
						if( remcss.styleSheet ) {
								remcss.styleSheet.cssText = rules; // IE8 will not support innerHTML on read-only elements, such as STYLE
						} else {
								remcss.appendChild( document.createTextNode( rules ) );
						}
				},

				xhr = function ( url, callback ) { // create new XMLHttpRequest object and run it
						try {
								//try to create a request object
								//arranging the two conditions this way is for IE7/8's benefit
								//so that it works with any combination of ActiveX or Native XHR settings,
								//as long as one or the other is enabled; but if both are enabled
								//it prefers ActiveX, which means it still works with local files
								//(Native XHR in IE7/8 is blocked and throws "access is denied",
								// but ActiveX is permitted if the user allows it [default is to prompt])
								var xhr = window.ActiveXObject ? ( new ActiveXObject('Microsoft.XMLHTTP') || new ActiveXObject('Msxml2.XMLHTTP') ) : new XMLHttpRequest();

								xhr.open( 'GET', url, true );
								xhr.onreadystatechange = function() {
										if ( xhr.readyState === 4 ){
												callback(xhr, url);
										} // else { callback function on AJAX error }
								};

								xhr.send( null );
						} catch (e){
								if ( window.XDomainRequest ) {
										var xdr = new XDomainRequest();
										xdr.open('get', url);
										xdr.onload = function() {
												callback(xdr, url);
										};
										xdr.onerror = function() {
												return false; // xdr load fail
										};
										xdr.send();
								}
						}
				},

		// Remove queries.
				removeMediaQueries = function(css) {
						// Test for Media Query support
						if ( !window.matchMedia && !window.msMatchMedia ) {
								// If the browser doesn't support media queries, we find all @media declarations in the CSS and remove them.
								// Note: Since @rules can't be nested in the CSS spec, we're safe to just check for the closest following "}}" to the "@media".
								css = css.replace(/@media[\s\S]*?\}\s*\}/g, "");
						}

						return css;
				};

		if( !cssremunit() ){ // this checks if the rem value is supported
				var rules = '', // initialize the rules variable in this scope so it can be used later
						links = isStyleSheet(), // initialize the array holding the sheets urls for use later
						importLinks = [], //initialize the array holding the import sheet urls for use later
						found = [], // initialize the array holding the found rules for use later
						foundProps = [], // initialize the array holding the found properties for use later
						preCSS = [], // initialize array that holds css before being parsed
						CSSLinks = [], //initialize array holding css links returned from xhr
						css = [], // initialize the array holding the parsed rules for use later
						fontSize = '';

				// Notice: rem is a "root em" that means that in case when html element size was changed by css
				// or style we should not change document.documentElement.fontSize to 1em - only body size should be changed
				// to 1em for calculation

				fontSize = (function () {
						var doc = document,
								docElement = doc.documentElement,
								body = doc.body || doc.createElement('body'),
								isFakeBody = !doc.body,
								div = doc.createElement('div'),
								currentSize = body.style.fontSize,
								size;

						if ( isFakeBody ) {
								docElement.appendChild( body );
						}

						div.style.cssText = 'width:1em; position:absolute; visibility:hidden; padding: 0;';

						body.style.fontSize = '1em';

						body.appendChild( div );
						size = div.offsetWidth;

						if ( isFakeBody ) {
								docElement.removeChild( body );
						}
						else {
								body.removeChild( div );
								body.style.fontSize = currentSize;
						}

						return size;
				}());

				processLinks();
		} // else { do nothing, you are awesome and have REM support }

})(window);


/* newsroom list tab script */
(function($) {
		$(document).on("ready", init);

		function init() {
				/* 2021-12-15 수정 시작 */
				var $tablist, $tabbtn, $tabcon, $tabSublist, $tabSubBtn;

				function tabinit() {
						$tablist = $(".ns-tablist");
						$tabbtn = $tablist.find("> li > a");
						$tabcon = $(".ns-tabcon");
						$tabSublist = $(".ns-sub-tablist");
						$tabSubBtn = $tabSublist.find("li > a");

						$tabbtn.on("click", function() {
							$.removeCookie("ckTab",{path:"/"});
						
							var $this = $(this),
								$thisPar = $this.parent(),
								$thisidx = $thisPar.index();
							$tablist.find("li").removeClass("active");
							$thisPar.addClass("active");
							$tabcon.removeClass("active");
							$tabcon.eq($thisidx).addClass("active");

							$.cookie("ckTab", $thisPar.attr("id"),{path:"/"});
						});

						$tabSubBtn.on("click", function() {							
							var $this = $(this),
								$thisPar = $this.parent();
							$tabSublist.find("li").removeClass("active");
							$thisPar.addClass("active");
							
							$.cookie("ckTab", $thisPar.attr("id"),{path:"/"});
						});
						/* //2021-12-15 수정 끝 */
				}

				tabinit();
		}
})(jQuery);
/* //newsroom list tab script */


/* newsroom list modal script */
(function($) {
		$(document).on("ready", init);

		function init() {

				var $openbtn, $modal, $mask, $closebtn, $resultbtn, $selboxclose;
				var $body;

				function modalinit() {
						$body = $("body");
						$openbtn = $(".ns-list-filter");
						$modal = $(".filter-modal");
						$mask = $(".filter-modal-mask");
						$closebtn = $(".filter-modal-close");
						$resultbtn = $(".filter-ok-btn");
						$selboxclose = $(".filter-sel-close");
						$openbtn.on("click", modalOpenFn);
						$closebtn.on("click", modalCloseFn);
						$resultbtn.on("click", modalResultFn);
						$selboxclose.on("click", selCloseFn);
				}
				
				function modalResultFn(){
				var chkVal = "";
				var	filterVar = "";
				var ckVal =""
				
				$.removeCookie("ckVal",{path:"/"});
				
				$(".filter-selbox-wrap").children("p").hide(); 
				$(".checked").each(function(i){
					
					chkVal = $(this).find("input").val();
					if(chkVal == "All"){
						$(".filter-selbox").show();
					}else{
						$(".filter-selbox").each(function(y){
							filterVar = $(this).attr("id");
							if(chkVal == filterVar){
								$("#"+chkVal).removeClass("closed");
								$("#"+chkVal).show(); 
							}
						});
						if(i !=0) ckVal += ","
						ckVal += chkVal;
						$.cookie("ckVal", ckVal,{path:"/"});
						
					}
				})
				filter();
				modalCloseFn();				
				}

				function modalOpenFn() {
						$modal.addClass("active");
						$mask.addClass("active");
						$body.css("overflow", "hidden");
				}

				function modalCloseFn() {
						$modal.removeClass("active");
						$mask.removeClass("active");
						$body.css("overflow", "auto");
						$openbtn.focus();
						newsroomFilterCheck(); /* [2021-10-25 LNB개편] 추가 */
				}

				function selCloseFn() {
						var $this = $(this),
								$thisPar = $this.parents(".filter-selbox");
						$thisPar.addClass("closed");
						
						var chkVal ="";
						var ckVal ="";
						
						if($("#chk-all").is(":checked")){
									$(".uiCheckbox").each(function(){
											$(".closed").each(function(){
												if(($(this).attr("id")!= $(".uiCheckbox").val()) &&($(this).attr("id")!="chk-all")){
													$(".uiCheckbox").addClass("checked").prop("checked", true);
													$(".uiCheckbox").parent().addClass("checked").attr("aria-checked", "true");
												}  
											})	
									 })
								$("#chk-all").removeClass("checked");
								$("#chk-all").attr("checked", false);
							$("#chk-all").parent().removeClass("checked").attr("aria-checked", false);
						}						
						
						$.removeCookie("ckVal",{path:"/"});
						
						$(".checked").each(function(){
							if($(this).find("input").val()==$thisPar.attr("id")){
								$(this).find("input").removeClass("checked").attr("checked", false);
								$(this).removeClass("checked").attr("aria-checked", false);
							}			
							
						});
						
						$(".checked").each(function(i){
							if($(this).hasClass("checked")){
								chkVal = $(this).find("input").val();							
							}
							
							if(i !=0) ckVal += ","
							ckVal += chkVal;
						});							
						
						$.cookie("ckVal", ckVal,{path:"/"});						
						
						filter();
						$thisPar.hide();
						newsroomFilterCheck(); /* [2021-10-25 LNB개편] 추가 */
				}
				modalinit();
		}
})(jQuery);
/* //newsroom list modal script */


/* newsroom list chkeckbox script */
(function($){

		$(document).on('ready', init);

		function init() {
				var $inputs;
				var $wraps;

				function checkInit() {
						makeHtml();
						fnChecked();

						$inputs.on("click", fnChecked);
						$inputs.on("focusin", fnFocus);
						$inputs.on("focusout", fnFocusout);
				}

				function makeHtml() {
						$inputs = jQuery(".uiCheckbox");
				}

				function fnChecked() {
					var chkVal = "";				
					
					$wraps = $(".uiCheckbox_wrap");
					$wraps.each(function(i,e) {
							var $this = $(this);
							if($this.find(".uiCheckbox").prop("checked")){
									$this.addClass("checked").attr("aria-checked", "true");
							}else {
									$this.removeClass("checked").attr("aria-checked", "false");
							}
					})					
											
				}

				function fnFocus(e) {
						var $this  = $(this);
						$this.parent().addClass("focus");
				}

				function fnFocusout() {
						var $this  = $(this);
						$this.parent().removeClass("focus");
				}

				checkInit();
		}

})(jQuery);
/* //newsroom list chkeckbox script */

function delCookies(){
	$.removeCookie("ckVal",{path:"/"});
	$.removeCookie("ckTab",{path:"/"});
	$.removeCookie("ckNum",{path:"/"});
	
}

/*20190624 privacy_policy script start*/
$(function(){
/*  getCookieNotice();

 20190703 Remove   
	var noticeHeight = $(".notice_policy").height();
	$("html > body").css("paddingTop", noticeHeight);
	var noticeIs = $(".notice_policy").hasClass("hide");
	if(noticeIs){
		$("html > body").removeAttr("style");
	};

	$(".notice_policy .btn_close").on("click", function(){
		setCookieNotice( "noticeCookie", "done" , 365);
		$(".notice_policy").addClass("hide");
		$("html > body").removeAttr("style");
	});
*/
getCookieNotice();
$(".notice_policy .btn_close").on("click", function(){
		setCookieNotice( "noticeCookie", "done" , 365);
	$(".notice_policy").addClass("hide");
	$("html > body").removeAttr("style");
});


function setCookieNotice ( name, value, expiredays ) {
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function getCookieNotice () {
		var cookiedata = document.cookie;
		if ( cookiedata.indexOf("noticeCookie=done") < 0 ){
				$(".notice_policy").removeClass("hide");      
		}
		else {
				$(".notice_policy").addClass("hide");
				$("html > body").removeAttr("style");
		}
}

});
/*privacy_policy script end*/

/* [2021-10-25 LNB개편] 추가 시작 */
function newsroomFilterCheck(){
	var isFilterChecked = $('.ns-list .filter-list .uiCheckbox_wrap').hasClass('checked');
	if ( isFilterChecked ) {
		$('.ns-list .filterbtn-wrap').addClass('filterlist-opened');
	}else{
		$('.ns-list .filterbtn-wrap').removeClass('filterlist-opened');
	}
}
/* //[2021-10-25 LNB개편] 추가 끝 */

/* [2021-10-25 오디오폴리] 시작 */
function audioPolly(){
	var audioSource = $('#audioSource').attr('src');
	var audio = new Audio(audioSource);
	var audioPollyWrap = $(".audio_pollywrap");
	var audioPlayer = $(".audio_player");
	var timelineHandle = audioPlayer.find(".timeline_handle");
	var timeline = audioPlayer.find(".timeline_bar");
	var timelineWidth = timeline.width();
	var progressBar = audioPlayer.find(".progress_bar");
	var handle = audioPlayer.find(".dot_handle");
	var playBtn = audioPlayer.find(".btn_player");
	var isPlaying = false;
	var isDraggable = false;
	var startAudio;
	var agent = navigator.userAgent.toLowerCase();

	//padStart IE대응
	if (!String.prototype.padStart) {
		String.prototype.padStart = function padStart(targetLength,padString) {
				targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
				padString = String((typeof padString !== 'undefined' ? padString : ' '));
				if (this.length > targetLength) {
						return String(this);
				}
				else {
						targetLength = targetLength-this.length;
						if (targetLength > padString.length) {
								padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
						}
						return padString.slice(0,targetLength) + String(this);
				}
		};
	}

	function audioPlayInverval(){
		startAudio = setInterval(function(){
			progressBar.width(audio.currentTime / audio.duration * 100 + "%");
			audioPlayer.find(".time_current").text(getTimeCodeFromNum(audio.currentTime));
			if (audio.currentTime >= audio.duration) { //재생끝이면 리셋
				fnReset();
				clearInterval(startAudio);
				//IE 대응
				if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
					fnPause();
				}
			}
		//	console.log("timer", audio.currentTime, audio.duration);
		},500);
	}

	function fnReset(){
		audio.currentTime = 0;
		isPlaying = false;
		audioPollyWrap.removeClass('playing');
		playBtn.removeClass("pause");
		progressBar.width(0 + '%');
		audioPlayer.find(".time_current").text('0:00');
	}
	function fnPlay(){
		playBtn.addClass("pause");
		audio.play();
		audioPlayInverval();
	}
	function fnPause(){
		playBtn.removeClass("pause");
		audio.pause();
		clearInterval(startAudio);
	}

	audioPollyWrap.on('click', '.btn_listen', function(e){
		audioPlayer.find(".time_total").text(getTimeCodeFromNum(audio.duration)); //2021-11-18 추가
		audioPollyWrap.addClass('playing');
		isPlaying = true;
		fnPlay();
	});

	audioPlayer.on("click", '.btn_player', function (e) {
		if (isPlaying) {
			isPlaying = false;
			fnPause();
		} else {
			isPlaying = true;
			fnPlay();
		}
	});

	timelineHandle.on('mousedown', function (e) {
		var p = (e.clientX - timeline.offset().left) / timelineWidth;
		var timeToSeek = (e.clientX - timeline.offset().left) / parseInt(timelineWidth) * audio.duration;
		audio.currentTime = timeToSeek;
		fnPause();
		progressBar.width(p * 100 + '%');
		isDraggable = true;
	});

	$(window).on('mouseup', function (e) {
		if (!isDraggable) return;
		var p = (e.clientX - timeline.offset().left) / timelineWidth;
		var timeToSeek = (e.clientX - timeline.offset().left) / parseInt(timelineWidth) * audio.duration;
		audio.currentTime = timeToSeek;
		isDraggable = false;
		if(p < 0) p = 0;
		else if(p > 1) p = 1;

		if (isPlaying) { //재생중일때는 이어서 재생
			isPlaying = true;
			fnPlay();
		} else {
			isPlaying = false;
			fnPause();
		}

		if (p == 1) {
			var playPromise = audio.play();
			if (playPromise !== undefined) {
				playPromise.then(function (_) {
					fnPause();
				});
			}
			fnReset();
		}
		//IE 대응
		if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
				if (p == 1) fnPause();
		}

		audioPlayer.find(".time_current").text(getTimeCodeFromNum(audio.currentTime));
	});

	$(window).on('mousemove', function (e) {
		if (!isDraggable) return;
		var p = (e.clientX - timeline.offset().left) / timelineWidth;
		var timeToSeek = (e.clientX - timeline.offset().left) / parseInt(timelineWidth) * audio.duration;
		audio.currentTime = timeToSeek;
		if(p < 0) p = 0;
		else if(p > 1) p = 1;
		progressBar.width(p * 100 + '%');
		audioPlayer.find(".time_current").text(getTimeCodeFromNum(audio.currentTime));
	});

	function getTimeCodeFromNum(num) {
		var seconds = parseInt(num);
		var minutes = parseInt(seconds / 60);
		seconds -= minutes * 60;
		var hours = parseInt(minutes / 60);
		minutes -= hours * 60;

		if (hours === 0) return minutes + ":" + String(seconds % 60).padStart(2, 0);
		return String(hours).padStart(2, 0) + ":" + minutes + ":" + String(seconds % 60).padStart(2, 0);
	}
}
/* //[2021-10-25 오디오폴리] 끝 */