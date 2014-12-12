sunriseEditor.entitymanager = (function(){
	
	var listDom,
		editorDom,
		editor = {},
		entityTypes = {},
		componentChooser,
		entities = [];


	var _this = {
		init : function(){	
			listDom = document.querySelector('#entity-selector > ul');
			editorDom = document.querySelector('#entity-editor');
			editor.name = editorDom.querySelector('input[name=name]');
			editor.width = editorDom.querySelector('input[name=width]');
			editor.height = editorDom.querySelector('input[name=height]');

			var fab = document.querySelector('#entity-selector > .fab');
			fab.addEventListener('click', function(){
				_this.addEntityType('newEntity');
			});

			fab = document.querySelector('#entity-editor .fab');
			fab.addEventListener('click', function(){
				document.querySelector('#component-chooser').style.bottom = '-10px';
			});

			componentChooser = editorDom.querySelector('#component-chooser');
			var close = editorDom.querySelector('#component-chooser > li:first-child');
			close.addEventListener('click', function(){
				componentChooser.style.bottom = "-300px";
			});

		},
		addEntityType : function(name){
			var suffix = '';
			while(entityTypes[name+suffix] !== undefined){
				if(suffix === ''){
					suffix = 1;
				}else{
					suffix++;
				}
			}
			name += suffix;
			var e = new Entity(name);
			e.appendTo(listDom);
			entityTypes[name] = e;
		},
		editEntity : function(entity){
			editorDom.style.display = 'block';
			editor.name.value = entity.name;
			editor.width.value = entity.width;
			editor.height.value = entity.height;
		}
	};

	return _this;

})();


function Entity(name){
	this.name = name;
	this.width = 0;
	this.height = 0;
	this.components = {};
}


Entity.prototype.appendTo = function(element){
	var _this = this;
	var data = 	'<li class="card clear">'+
					'<div class="info">'+this.name+'</div>'+
					'<div class="preview"></div>'+
				'</li>';
	element.innerHTML += data;
	element.childNodes[element.childNodes.length-1].addEventListener('click', (function(scope){
		return (function(){
			sunriseEditor.entitymanager.editEntity(scope);
			console.log(scope);
		});
	})(this));
};