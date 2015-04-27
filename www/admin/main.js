angular.module('readThisEditor', ['ngSanitize', 'ngQuill'])
.run(function(){
	// init code if you want
})

.controller('EditorCtrl', function($scope, $http){

	$http.get('/content').success(function(data, status){
      $scope.data = data;
    });

	$scope.save = function(){
		console.log($scope.data);
	    $http.post('/save', {data: $scope.data}).success(function(status){
	    	console.log('success');
	    });
	};

    $scope.addItem = function(type, content){
    	console.log(content);
		var item = {
			title: 'new item title',
			contains: type,
		};
		if(type == 'list'){
			item.content = [];
			item.addItem = this;
		}
		if(type == 'html'){
			item.content = '<p>enter content here</p>';
		}
		content.push(item);
	};

	$scope.moveItemUpInList = function(id, content){
		var temp = content[id - 1];
		content[id - 1] = content[id];
		content[id] = temp;	
	};

	$scope.moveItemDownInList =function(id, content){
		var temp = content[id + 1];
		content[id + 1] = content[id];
		content[id] = temp;	
	};

	$scope.deleteItem = function(id, content){
		if (confirm("Are you sure you want to delete this?\nThis also delete everything nested under this heading.") == true){
			content.splice(id, 1);
		}		
	};

});




