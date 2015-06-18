angular.module('readThisEditor', ['ngSanitize', 'ngQuill', 'ui.bootstrap'])
.run(function(){
	// init code if you want
})

.controller('EditorCtrl', function($scope, $http, $timeout){

	$scope.saveState = 'ready';

	$scope.state = 'content';

	$http.get('/content').success(function(data, status){
      $scope.data = data;
    });

    $http.get('/events').success(function(data, status){
      $scope.events = data;
      console.log(data);
    });

	$scope.save = function(){
		if($scope.saveState == 'ready'){
			$scope.saveState = 'waiting';
		    $http.post('/save', {data: $scope.data, events: $scope.events}).success(function(status){
		    	$timeout(function(){
		    		$scope.saveState = 'ready';
		    	}, 2500);
		    	$scope.saveState = 'success';
		    }).error(function(data, status, headers, config){
		    	window.alert('There was an error saving.')
		    	$scope.saveState = 'ready';
		    });
		};
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


	$scope.addEvent = function(){
		$scope.events.push({
			time:new Date(),
			date:new Date(),
			datetime: new Date(),
			description: '',
			location: '',
			title: ''
		});
	};

	$scope.deleteEvent = function(id){
		$scope.events.splice(id, 1);
		$http.post('/delete-event', {'id': $scope.events[id]._id}).success(function(data, status){
			console.log('successfully deleted');
		});
	};

    $scope.updateDate = function(event){
		event.datetime = new Date(event.date.getFullYear(), event.date.getMonth(), event.date.getDate(), event.time.getHours(), event.time.getMinutes(), event.time.getSeconds());
	};

});





