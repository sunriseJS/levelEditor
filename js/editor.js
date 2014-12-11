var sunriseEditor = {};

sunriseEditor.init = function(){
	sunriseEditor.sidebar.init();
}

window.addEventListener('load', function(){
	sunriseEditor.init();
});

sunriseEditor.forEach = function (array, callback) {
	for (var i = 0; i < array.length; i++) {
		callback.call(i, array[i]);
	}
};