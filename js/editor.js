var sunriseEditor = {};

sunriseEditor.init = function(){
	sunriseEditor.sidebar.init();
}

window.addEventListener('load', function(){
	sunriseEditor.init();
});