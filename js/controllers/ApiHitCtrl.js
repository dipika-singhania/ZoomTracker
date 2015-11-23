angular.module('myApp').controller('apiHitCtrl', function($scope,$http) {
	$scope.parcels =[];
	$scope.selectedSort = 'name';
    $http.get("https://zoomcar-ui.0x10.info/api/courier?type=json&query=api_hits")
	.then(function successCallback(response) {
		$scope.api_hits = response.data.api_hits;
	}, function errorCallback(response) {
		alert("Could not get api hits");
	});
	$scope.changeValue = function(val) {
		$scope.selectedSort = val;
		//location.reload();
	};
	$http.get("https://zoomcar-ui.0x10.info/api/courier?type=json&query=list_parcel")
	.then(function successCallback(response) {
		$scope.parcels = response.data.parcels;
	}, function errorCallback(response) {
		alert("Could not get api hits");
	});
	$scope.showDetails = false;
	$scope.selectedItem = null;
	$scope.selectedDate = null;
	$scope.showItemDetails = function(parcel) {
		$scope.selectedItem = parcel;
		$('.colorBox').css('background-color',$scope.selectedItem.color);
		$('#itemPic').attr('src', $scope.selectedItem.image );
		$scope.convertDate($scope.selectedItem.date);
		$scope.showDetails = true;
		$scope.loadMap($scope.selectedItem.live_location.latitude,$scope.selectedItem.live_location.longitude);
	};
	$scope.convertDate = function(date_epoch) {
		var date = new Date(date_epoch*1000);
		$scope.selectedDate = date.getUTCDate() + '-' + (date.getUTCMonth() + 1)+ '-' + date.getUTCFullYear();
	};
	$scope.loadMap = function(lat,lng) {
		
		$http.get("https://maps.googleapis.com/maps/api/js?key=AIzaSyDkeD8N_2Ok-yU6qzQVEB4R69599S016Wo&sensor=false")
		.then(function successCallback(response) {
			map = new google.maps.Map(document.getElementById('map_canvas'), {
			  center: {lat: lat, lng: lng},
			  zoom: 8
			});
		}, function errorCallback(response) {
			console.log("Could not get api hits");
		});
	}

});