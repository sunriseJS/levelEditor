sunriseEditor.sidebar = (function(){

	var dom;
	var _this = {
		init : function(){
			dom = document.querySelector('#sidebar');

			var burgerButton = document.querySelector('#headbar .icon-menu');
			burgerButton.addEventListener('click', _this.show);
		},

		show : function(event){
			dom.style.left = "0px";
			document.body.addEventListener('click', closeListener);
			if(event){
				event.stopPropagation();
			}
		},

		hide : function(){
			dom.style.left = '-300px';
			document.body.removeEventListener('click', closeListener);
			dom.setAttribute('open', 'false');
		}
	};

	var closeListener = function(event){
		console.log(event);
		if(event.target != dom){
			_this.hide();
		}
	};

	return _this;

})();