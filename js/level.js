sunriseEditor.level = (function(){

	var dom,
		canvas,
		context,
		clickable = false,
		config = {};

	var _this = {
		init : function(){	
			canvas = document.querySelector('#level-panel > canvas');
			context = canvas.getContext('2d');
			config.width = canvas.width;
			config.height = canvas.height;
			config.layer = [];

			canvas.addEventListener('click', function(event){
				if(!clickable){
					return;
				}
				var rect = canvas.getBoundingClientRect(),
					x = event.clientX - rect.left,
					y = event.clientY - rect.top;
				_this.addTile(x, y, sunriseEditor.tileplacer.getFocus());
			});
		},

		setClickable : function(click){
			clickable = click;
			if(clickable){
				canvas.style.cursor = 'crosshair';
			}else{
				canvas.style.cursor = 'forbidden';
			}
		},

		draw: function(){
			context.clearRect(0,0,canvas.width, canvas.height);
			for(var i=0; i<config.layer.length; i++){
				var layer = config.layer[i];
				if(layer.type === 'tiles'){
					var set = sunriseEditor.tileplacer.getSetByName(layer.tileset),
						max = layer.tiles.length,
						tls = layer.tiles,
						w = set.tileWidth;
						h = set.tileHeight;
					for(var i=0; i<max; i++){
						var tile = tls[i];
						context.drawImage(
							set.image, 
							tile[2]*w, 
							tile[3]*h,
							w,
							h,
							tile[0]*w,
							tile[1]*h,
							w,
							h);
					}
				}
			}
		},

		addTile: function(x, y, set){
			var layer;
			for(var i=0; i<config.layer.length; i++){
				if(config.layer[i].type === 'tiles'
					&& config.layer[i].tileset === set.name){
					layer = config.layer[i];
				}
			}
			if(layer == undefined){
				layer = {
					type: 'tiles',
					tileset: set.name,
					tiles: []
				};
				config.layer.push(layer);
			}

			var entry = [
				Math.floor(x / set.tileWidth),
				Math.floor(y / set.tileWidth),
				Math.floor(set.lastClick.x / set.tileWidth),
				Math.floor(set.lastClick.y / set.tileWidth)

			];
			layer.tiles.push(entry);

			
		
			_this.draw();
		},

		export: function(){
			return JSON.stringify(config)
;		}
	};


	return _this;

})();