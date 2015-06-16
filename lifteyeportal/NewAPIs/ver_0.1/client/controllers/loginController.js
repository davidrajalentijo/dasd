var app =angular.module('MainApp',['angular-md5']);
//myApp.controller('loginController', function($scope, $http, $filter) {
app.controller('loginController', ['$scope', function($scope, $http, $filter,md5){

     var URL = "/api/auth/login";
//     var URL = "http://localhost:81/api/auth/login";
        $scope.signup = {
		"username" : "administracion@tamedbytes.com",
		"password" : "coconut"

		};


        $scope.loginUser = function() {
			$scope.signup.password = md5.createHash($scope.signup.password || '');
            $http.post(URL, $scope.signup)
                .success(function(data) {
                    console.log(data);
                    window.alert('Bienvenido ' + data.result.username + 'última vez que iniciaste sesi—n fue el '+ data.result.lastlogin);
                    //$window.localStorage.token = data;
                    window.location.href='/Dashboard.html';
                })
                .error(function(data) {
                    window.alert('Wrong credetianls');
                    $scope.signup.password = "";
                });
        };

}]);