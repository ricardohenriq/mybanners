var bannersTestSide = [
	'<a href="#"><img src="temp/125x125/125x125black.png"></a>',
	'<a href="#"><img src="temp/125x125/125x125blue.png"></a>'
];

$('#insert-banner-code').click(function(){
	injectBannerCode('test-area',bannersTestSide[0]);
	injectBannerCode('test-area',getBannerCode('test-banner-code'));
	injectBannerCode('test-area',bannersTestSide[1]);
});

function getBannerCode(bannerCodeElementID){
	return document.getElementById(bannerCodeElementID).value;
}

function injectBannerCode(testAreaID, bannerCode){
	var testArea = document.getElementById(testAreaID);
	$(testArea).append(bannerCode);
}