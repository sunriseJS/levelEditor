sunriseEditor.sidebar = (function(){

	var dom;
	var overlay;
	var _this = {
		init : function(){
			dom = document.querySelector('#sidebar');
			overlay = document.querySelector('#dark-overlay');
			var burgerButton = document.querySelector('#headbar .icon-menu');
			burgerButton.addEventListener('click', _this.show);
			overlay.addEventListener('click',_this.hide);

			//Set up links
			var items = dom.querySelectorAll('li');
			sunriseEditor.forEach(items, function(item){
				if(item.hasAttribute('link')){
					console.log(item);
					item.addEventListener('click', function(){
						window.open(item.getAttribute('link'),'_blank');
					});
				}
			});
			
		},

		show : function(event){
			dom.style.left = "0px";
			overlay.style.display = 'block';
			setTimeout(function(){
				overlay.style.opacity = '1';
			},3);
		},

		hide : function(){
			dom.style.left = '-300px';
			overlay.style.opacity = '0';
			setTimeout(function(){
				overlay.style.display = 'none';
			},300);
		}
	};


	return _this;

})();