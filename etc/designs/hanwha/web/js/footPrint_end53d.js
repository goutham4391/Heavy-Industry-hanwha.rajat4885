$(function(){
    if(footList == undefined)return;
	footPrint(footList);
	footSort(footList);
});

var companyArr = [];
var companyName = "";

var noMoreMsg = '<p class="nomore">No results were found. <br>Please try a different search. </p>';

function footSort(footList) {
	var findCate = $('#chooseCategory');
	var findRegi = $('#chooseRegion');
	var chkMap = $('.indcator_map');
	var initTxt01 = $('#chooseCategory > a').text();
	var initTxt02 = $('#chooseRegion > a').text();
	var chkTbl = $('.layer_map_cont > div');
	var txtCate, txtRegi;
	$('.box_footprint .btn_findus').click(function(){
		txtCate = $('#chooseCategory.activated').find('ul').find('a.selected').attr('id');
		txtRegi = $('#chooseRegion.activated').find('ul').find('a.selected').attr('id');
		tblInfo = $('.tbl_map_info');
		$('.layer_map_cont > div').removeClass('active')
		if (findCate.hasClass('activated')){
			chkMap.hide();
			tblInfo.hide();
			tblInfo.removeClass('active');
			$('.indcator_map.' + txtCate).show();
			$('.tbl_map_info.'+txtCate).addClass('active').show();
			$('.layer_map_cont > div.'+txtCate).addClass('active')
		}  else {
            return false;
        }

		$('.map_cate_box').each(function(i){
			var j = i+1;
			var sizeTbl = $('#mapCate0'+j+' '+'.active.regi0' + j ).size();
			$('.map_cate.region0' + j).find('span').html('('+sizeTbl+')');

            $('#mapCate0'+j).find('.nomore').remove();
            if(sizeTbl == 0 ){
                $('#mapCate0'+j).find('.nomore').remove().end().append(noMoreMsg);
            }

		});
	});


	$('.box_footprint .btn_refresh').click(function(){
    companyArr = [];
		findCate.children('a').empty().text(initTxt01).next('ul').find('a').removeClass();
		findRegi.children('a').empty().text(initTxt02).next('ul').find('a').removeClass();
		chkMap.show();
		$('.selectbox').removeClass('activated');
		//$('.layer_map_cont > div').removeClass('active').attr('style', '');

		chkTbl.css({display: ''});
		$('.tbl_map_info').show();
    $('.tbl_map_info').addClass('active');

		$('.map_cate_box').each(function(i){
			var j = i+1;
		//var sizeTbl = $('#mapCate0'+j+' '+'.regi0' + j ).size();
    //$('.map_cate.region0' + j).find('span').html('('+sizeTbl+')');

      //중복 제거 스크립트 추가 20190509
      $(this).children('.tbl_map_info').each(function(){
        companyName = $(this).find('.company').text();
        companyArr.push(companyName);
      });

      $(this).children('.tbl_map_info').each(function(){
            var cnt = 0;
            var idx = 0;
            companyName = $(this).find('.company').text();

            for(var i=0; i <companyArr.length; i++){
              if(companyArr[i]==companyName){
                cnt++;
                idx = i;
              }
            }

            if(cnt>1){
              companyArr.splice(idx,1);
              $(this).removeClass('active');
              $(this).hide();
            }
        });

      var sizeTbl = $('#mapCate0'+j+' '+'.active.regi0' + j ).size();
      $('.map_cate.region0' + j).find('span').html('('+sizeTbl+')');
      //중복 제거 스크립트 추가 20190509

      $('#mapCate0'+j).find('.nomore').remove();
      if(sizeTbl == 0 ){
          $('#mapCate0'+j).find('.nomore').remove().end().append(noMoreMsg);
      }

		});
	});


	for (var i = 0; i < footList.length ; i++ ) {
		var data = footList[i];
		var mapInfo = '<table class="tbl_map_info '+ footList[i].fRegi +' '+ footList[i].fCate +' active" summary="" cellspacing="0">';
			mapInfo += '<caption>'+footList[i].fComp+'</caption>';
			mapInfo += '<colgroup>';
			mapInfo += '<col width="10%">';
			mapInfo += '<col width="40%">';
			mapInfo += '<col width="10%">';
			mapInfo += '<col width="40%">';
			mapInfo += '</colgroup>';
			mapInfo += '<tbody>';
			mapInfo += '<tr>';
			mapInfo += '<th scope="row">Company</th>';
			mapInfo += '<td class="company">'+footList[i].fComp+'</td>';
			mapInfo += '<th scope="row">Tel</th>';
			mapInfo += '<td>'+footList[i].fTel+'</td>';
			mapInfo += '</tr>';
			mapInfo += '<tr>';
			mapInfo += '<th scope="row">Address</th>';
			mapInfo += '<td>'+footList[i].fAdd+'</td>';
			mapInfo += '<th scope="row">Fax</th>';
			mapInfo += '<td>'+footList[i].fFax+'</td>';
			mapInfo += '</tr>';
			mapInfo += '<tr>';
			mapInfo += '<th scope="row">Type</th>';
			mapInfo += '<td>'+footList[i].fType+' </td>';
			mapInfo += '<th scope="row">URL</th>';
			if (footList[i].fUrl==''){
				mapInfo += '<td>-</td>';
			} else {
				mapInfo += '<td><a href="http://'+footList[i].fUrl+'" target="_blank" title="Opens '+footList[i].fComp+' homepage in a new window">'+footList[i].fUrl+'</a></td>';
			}
			mapInfo += '</tr>';
			mapInfo += '</tbody>';
			mapInfo += '</table>';
			$('#tempSpace').append(mapInfo);
			// $('.regi01').clone();


		var mapLayer = '<div class="'+footList[i].fCate+' '+footList[i].fCnty+' '+ footList[i].fIden +'">';
			mapLayer +='<table class="tbl_layer01" summary="" cellspacing="0">';
			mapLayer +='<caption>Global FootPrint</caption>';
			mapLayer +='<colgroup>';
			mapLayer +='<col style="width: 20%;">';
			mapLayer +='<col style="width: 80%;">';
			mapLayer +='</colgroup>';
			mapLayer +='<tbody>';
			mapLayer +='<tr>';
			mapLayer +='<th scope="row">Company</th>';
			mapLayer +='<td class="foot_company">'+footList[i].fComp+'</td>';
			mapLayer +='</tr>';
			mapLayer +='<tr>';
			mapLayer +='<th scope="row">Address</th>';
			mapLayer +='<td class="foot_adress">'+footList[i].fAdd+'</td>';
			mapLayer +='</tr>';
			mapLayer +='<tr>';
			mapLayer +='<th scope="row">Tel.</th>';
			mapLayer +='<td class="foot_tel">'+footList[i].fTel+'</td>';
			mapLayer +='</tr>';
			mapLayer +='<tr>';
			mapLayer +='<th scope="row">URL</th>';
			if (footList[i].fUrl==''){
				mapLayer +='<td class="foot_email">-</td>';
			} else {
				mapLayer += '<td><a href="http://'+footList[i].fUrl+'" target="_blank" title="Opens '+footList[i].fComp+' homepage in a new window">'+footList[i].fUrl+'</a></td>';
			}

			mapLayer +='</tr>';
			mapLayer +='</tbody>';
			mapLayer +='</table>';
			mapLayer +='</div>';
		$('#mapInfo .layer_map_cont').append(mapLayer);
	}
  
  $('.map_cate_box').each(function(i){
    var j = i+1;
    //var sizeTbl = $('.regi0' + j ).size();
    $('.regi0' + j).clone().appendTo('#mapCate0' +j);
  });
  
	$('.map_cate_box').each(function(i){
		var j = i+1;
		//var sizeTbl = $('.regi0' + j ).size();
		//$('.regi0' + j).clone().appendTo('#mapCate0' +j);

  //중복 제거 스크립트 추가 20190509
  $(this).children('.tbl_map_info').each(function(){
    companyName = $(this).find('.company').text();
    companyArr.push(companyName);
  });

  $(this).children('.tbl_map_info').each(function(){

        var cnt = 0;
        var idx = 0;
        companyName = $(this).find('.company').text();

        for(var i=0; i <companyArr.length; i++){
          if(companyArr[i]==companyName){
            cnt++;
            idx = i;
          }
        }

        if(cnt>1){
          companyArr.splice(idx,1);
          $(this).removeClass('active');
          $(this).hide();
        }

    });

  var sizeTbl = $('#mapCate0'+j+' '+'.active.regi0' + j ).size();
  $('.map_cate.region0' + j).find('span').html('('+sizeTbl+')');
  //중복 제거 스크립트 추가 20190509
	});

}

function footPrint(footList) {
	var targetLayer;
	var targetClass;
	$('.indicator_footprint > a').each(function(){
		$(this).click(function(e){
			$(this).attr('id','tReturn');
			var footIndex = $(this).next().find('li').length;

			targetClass = $(this).attr('class');
			var findClass = targetClass.indexOf('iden');
			var extClass = targetClass.substr(findClass, 6)

			targetLayer = $(this).attr('href');

			$('.map_footprint').each(function(){
				var chkProdId = $(this).attr('id');

				switch (chkProdId) {
					case 'advMaterial':
					$('.layer_map_cont > div.cate01').addClass('active');
					break;
					case 'cheMical':
					$('.layer_map_cont > div.cate02').addClass('active');
					break;
					case 'conStruction':
					$('.layer_map_cont > div.cate03').addClass('active');
					break;
					case 'finService':
					$('.layer_map_cont > div.cate04').addClass('active');
					break;
					case 'leiLifestyle':
					$('.layer_map_cont > div.cate05').addClass('active');
					break;
					case 'manTrading':
					$('.layer_map_cont > div.cate06').addClass('active');
					break;
					case 'solEnergy':
					$('.layer_map_cont > div.cate07').addClass('active');
					break;
					default:
					break;
				}
			})

			if($(targetLayer).find('.layer_map_cont > div').hasClass('active')) {
				$(targetLayer).find('.layer_map_cont > div').hide();
				$(targetLayer).find('.layer_map_cont > div.active' +'.' +extClass).show();
			} else {
				$(targetLayer).find('.layer_map_cont > div').hide();
				$('.' + extClass).show();
			}
			var footLeft = ($(window).width() - $('.layer_map_info').outerWidth()) /2;
			var footTop = ($(window).outerHeight() - $('.layer_map_info').outerHeight()) /2;
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
			e.preventDefault();
		});
	});
	$(window).resize(function(){
		var footLeft = ($(window).width() - $('.layer_map_info').outerWidth()) /2;
		var footTop = ($(window).height() - $('.layer_map_info').outerHeight()) /2;
		$('.layer_map_info').css({
			left: footLeft,
			top: footTop
		});
	});

	$('.close_layer').click(function(){
		$(this).parents('.layer_map_info, .layer_video').fadeOut(350,'swing',function(){
			$('.mask_layer').fadeOut(350);
		});
		$('body').css({
			overflow: 'auto',
			paddingRight: 0
		});
		$('#tReturn').focus().removeAttr('id');
		$('.layer_map_cont').scrollTop(0);
	});
	$('.mask_layer').click(function(){
		$(targetLayer).fadeOut(350,'swing',function(){
			$('.mask_layer').fadeOut(350);
		});
		$('body').css({
			overflow: 'auto',
			paddingRight: 0
		});
		$('.layer_map_cont').scrollTop(0);
	});
}

var footList ;
