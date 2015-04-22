angular.module('readThisEditor', [])
.run(function(){
	// init code if you want
})

.controller('EditorCtrl', function($scope, $http){

	var addAdminUtils = function(object){
		if (object.contains == 'list'){
			object.activeId = 0;
			object.addItem = function(item){
				this.content.push(item);
				// set the new item to active
				object.activeId = this.content.length - 1;
			}
			for (id in object.content){
				addAdminUtils(object.content[id]);
			}
		}
	};

	var removeAdminUtils = function(object){
		if (object.contains == 'list'){
			delete object.activeId;
			delete object.addItem;
			for (id in object.content){
				removeAdminUtils(object.content[id]);
			}
		}
	};

	$http.get('/content').success(function(data, status){
      addAdminUtils(data);
      $scope.data = data;
    });

});