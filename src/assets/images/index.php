<?php include_once('./include/head.php');?>
<?php
/*

curl -X POST "https://api.odoc-api.com/api/v1/products/" -H  "accept: application/json" -H  "Content-Type: application/json" -H  "X- CSRFToken: Mpp87ucVyc933PMb6FCUYw08tGxRnK0sUMc08hYJ17GsAybr9J78U6NSKOoIkxhw" -d "{  \"product_name\": \"string\",  \"brand\": 0, \"category\": 0,  \"product_renewal\": true,  \"product_soldout\": true}"

*/
$url = "https://api.odoc-api.com/api/v1/products/";

$post_data = json_encode(array(

    'product_name'=> "레티놀 앰플토너",
    'brand'=> "마몽드",
    'category'=> "토너",
	'product_renewal' => true,
	'product_soldout' => true
));

$ch = curl_init();                                 //curl 초기화
curl_setopt($ch, CURLOPT_URL, $url);               //URL 지정하기
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);    //요청 결과를 문자열로 반환 
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);      //connection timeout 10초 
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);   //원격 서버의 인증서가 유효한지 검사 안함
//curl_setopt($ch, CURLOPT_POSTFIELDS, $data);       //POST data
//curl_setopt($ch, CURLOPT_POST, true);              //true시 post 전송 
 
$response = curl_exec($ch);
curl_close($ch);

//print_r(json_decode($response)->results);

$product_data = json_decode($response)->results;

?>


<header id="header" class="header">
	<div class="inr-c">
		<h2 class="hidden">메인</h2>
	</div>
</header>

<div id="container" class="container main">
	<div class="top_sch">
		<div class="inr-c">
			<div class="in"><a href="#">
				<div class="inp_txt">제품을 검색해 보세요</div>
				<button class="btn"><span class="i-set i_sch_t">검색</span></button>
			</a></div>
			<div class="rgh">
				<button type="button" class="btn_alram on"><span class="i-set i_alram"></span></button>
			</div>
		</div>
	</div>
	<div class="inr-c">
		<h2 class="h_tit1"><a href="#"><span class="i-aft i_link1"><strong class="c-blue">키인친구님</strong>을 위한 추천</span></a></h2>
		<div class="lst_prd pr-mb2">
			<div class="slider owl-carousel">
			<?php foreach($product_data as $key => $value) { 
				
				if($key > 10) continue;
				?>

				<div class="item">
					<div class="thumb">
						<a href="/product1.php?product=<?=$value->product_id?>"><span class="im" style="background-image: url(images/1_마몽드.jpeg);"></span></a>
						<div class="bat_best"><span class="i-set i_best">베스트</span></div>
						<button type="button" class="btn_favorit on"><span class="i-set i_favorit">좋아요</span></button>
					</div>
					<div class="txt"><a href="/product1.php?product=<?=$value->product_id?>">
						<p class="t1"><?=$value->product_name?></p>
						<p class="t2"><?=$value->brand->brand_name?></p>
					</a></div>
				</div>
			
			<?php } ?>

				
				
			</div>
		</div>
	
		<h2 class="h_tit1"><a href="#"><span class="i-aft i_link1">카테고리별 상품 랭킹</span></a></h2>
		<div class="lst_prd pr-mb2">
			<div class="slider owl-carousel">

			<?php foreach($product_data as $key => $value) { 
				if($key < 11) continue;
				?>

				<div class="item">
					<div class="thumb">
						<a href="/product1.php?product=<?=$value->product_id?>"><span class="im" style="background-image: url(images/tmp_prd.jpg);"></span></a>
						<div class="bat_best"><span class="i-set i_best">베스트</span></div>
						<button type="button" class="btn_favorit on"><span class="i-set i_favorit">좋아요</span></button>
					</div>
					<div class="txt"><a href="/product1.php?product=<?=$value->product_id?>">
						<p class="t1"><?=$value->product_name?></p>
						<p class="t2"><?=$value->brand->brand_name?></p>
					</a></div>
				</div>
			<?php } ?>
			</div>
		</div>

		<h2 class="h_tit1"><a href="#"><span class="i-aft i_link1"><strong class="c-blue">키인친구님</strong>에게 딱 맞는 팁!</span></a></h2>
		<div class="area_ad">
			<div class="col">
				<div class="img"><span style="background-image: url(images/common/img_ad2.jpg);"></span></div>
				<div class="txt">
					<p class="t1" style="color: #0d47ca;">나한테 딱 맞는 제품 찾기</p>
					<p class="t2"><strong>김소라</strong>님을 위한 <br>여름철 수분관리 팁!</p>
				</div>
			</div>
			<div class="col">
				<div class="img"><span style="background-image: url(images/common/img_ad1.jpg);"></span></div>
				<div class="txt">
					<p class="t1" style="color: #972c1d;">키인 베스트 제품</p>
					<p class="t2">지금 핫한 제품! <br><strong>나한테도 잘 맞을까?</strong></p>
				</div>
			</div>
		</div>
	
	</div>
</div>


<link href="css/owl.carousel.min.css" rel="stylesheet">
<script src="js/owl.carousel.min.js"></script>
<script>
$(function(){
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		
		if(scrollTop < 30) {
			$(".top_sch").removeClass("scroll");
		} else {
			$(".top_sch").addClass("scroll");
		}
	});

	//슬라이드
	var prdSlider = $(".slider.owl-carousel");
	prdSlider.owlCarousel({
		loop:false,
		margin:7,
		nav:false,
		dots:true,
		items:3,
		smartSpeed:1500,
	});
});
</script>


<?php include_once('./include/tail.php');?>