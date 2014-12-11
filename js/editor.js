var sunriseEditor = {};

sunriseEditor.init = function(){
	sunriseEditor.sidebar.init();
	sunriseEditor.level.init();
	sunriseEditor.tileplacer.init();
	sunriseEditor.entitymanager.init();

	document.querySelector('#menu-export').addEventListener('click', function(){
		sunriseEditor.export();
	});
}

window.addEventListener('load', function(){
	sunriseEditor.init();
});


sunriseEditor.forEach = function (array, callback) {
	for (var i = 0; i < array.length; i++) {
		callback.call(i, array[i]);
	}
};

sunriseEditor.export = function(){
	var form = document.createElement('form');
	form.action = '/download.php';
	form.method = 'POST';

	var level = document.createElement('input');
	level.name = 'level';
	level.value = sunriseEditor.level.export();
	form.appendChild(level);
	form.submit();

}