sunriseEditor.tileplacer = (function(){

	var dom;
	var tileSets = {};
	var focus = undefined;
	var _this = {
		init : function(){
			dom = document.querySelector('#tile-selector');
			_this.addTileset('upload/tileset1.png', 'tileset1');
			
		},

		addTileset : function(imagefile, name){
			var tileSet = new TileSet(imagefile, name);
			tileSet.appendTo(dom);
			tileSets[name] = tileSet;
		},

		setFocusTo : function (tileSet){
			focus = tileSet;
			for(name in tileSets){
				if(tileSets[name] !== focus){
					tileSets[name].update(false);
				}
			}
			sunriseEditor.level.setClickable(focus !== undefined);
		},

		getFocus : function(){
			return focus;
		},

		getSetByName : function(name){
			return tileSets[name];
		}
	};


	return _this;

})();

function TileSet(imagefile, name){
	this.image = new Image();
	this.imagefile = imagefile;
	this.name = name;
	this.tileWidth = 0;
	this.tileHeight = 0;
	this.height = 0;
	this.width = 0;	
	this.lastClick = {};
	this.lastClick.x = 0;
	this.lastClick.y = 0;
	this.zIndex = 0;
			
}

TileSet.prototype.update = function(showSelection){
	this.tileWidth = parseInt(this.input.tileWidth.value, 10);
	this.tileHeight = parseInt(this.input.tileHeight.value, 10);
	this.zIndex = parseInt(this.input.zIndex.value, 10);
	this.context.clearRect(0, 0, this.width, this.height);
	this.context.drawImage(this.image, 0, 0);
	if(showSelection){
		this.context.fillStyle = 'rgba(221, 72, 20, 0.4)';
		var x = Math.floor(this.lastClick.x / this.tileWidth),
			y = Math.floor(this.lastClick.y / this.tileHeight);
		this.context.fillRect(x*this.tileWidth, y*this.tileHeight, this.tileWidth, this.tileHeight);
		sunriseEditor.tileplacer.setFocusTo(this);
	}
	sunriseEditor.level.draw();
};

TileSet.prototype.appendTo= function(element){
	var _this = this;
	var data = '<div class="tileset card clear" image="'+this.name+'">'+
					'<canvas></canvas>'+
					'<div class="controls">'+
						'<label>TileWidth<input type="number" name="tile-width" /></label>'+
						'<label>TileHeight<input type="number" name="tile-height" /></label>'+
						'<label>Z index<input type="number" name="z-index" /></label>'+
					'</div>'+
				'</div>';
	

	element.innerHTML += data;
	this.element = element.querySelector('div[image='+this.name+']');
	this.canvas = this.element.querySelector('canvas'),
	this.context = this.canvas.getContext('2d');
	this.input = {};
	this.input.tileWidth = this.element.querySelector('input[name=tile-width]');
	this.input.tileHeight = this.element.querySelector('input[name=tile-height]');
	this.input.zIndex = this.element.querySelector('input[name=z-index]');

	this.image.onload = function(){
		_this.width = _this.image.width;
		_this.height = _this.image.height;
		_this.tileWidth = _this.image.width;
		_this.tileHeight = _this.image.height;

		_this.canvas.width = _this.width;
		_this.canvas.height = _this.height;

		_this.input.tileWidth.value = _this.tileWidth;
		_this.input.tileHeight.value = _this.tileHeight;
		_this.input.zIndex.value = 0;

		_this.update();
	}

	this.image.src = this.imagefile;

	var listener = function(){
		_this.update(this);
	}

	this.input.tileWidth.addEventListener('change', listener);
	this.input.tileWidth.addEventListener('keyup', listener);
	this.input.tileHeight.addEventListener('change', listener);
	this.input.tileHeight.addEventListener('keyup', listener);
	this.input.zIndex.addEventListener('change', listener);
	this.input.zIndex.addEventListener('keyup', listener);
	this.canvas.addEventListener('click', function(event){
		var rect = _this.canvas.getBoundingClientRect();
		_this.lastClick.x = event.clientX - rect.left;
		_this.lastClick.y = event.clientY - rect.top;
		_this.update(true);
	});
};