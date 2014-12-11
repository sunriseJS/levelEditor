sunriseEditor.entitymanager = (function(){
	
	var listDom,
		editorDom,
		entityTypes = {},
		entities = [];

	var _this = {
		init : function(){	
			listDom = document.querySelector('#entity-selector > ul');
			editorDom = document.querySelector('#entity-editor');

			var fab = document.querySelector('#entity-selector > .fab');
			fab.addEventListener('click', function(){
				_this.addEntityType('newEntity');
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
		}
	};

	return _this;

})();


function Entity(name){
	this.name = name;
	this.components = {};
}


Entity.prototype.appendTo = function(element){
	var data = 	'<li class="card clear">'+
					'<div class="info">'+this.name+'</div>'+
					'<div class="preview"></div>'+
				'</li>';
	element.innerHTML += data;
};