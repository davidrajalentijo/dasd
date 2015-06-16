var app =angular.module('MainApp',['angular-md5']);
//myApp.controller('loginController', function($scope, $http, $filter) {
app.controller('loginController', function($scope, $http, $filter,md5){

     var URL = "/api/auth/login";
//     var URL = "http://localhost:81/api/auth/login";
        $scope.signup = {
		"username" : "helpdesk@tamedbytes.com",
		"password" : "763b8741d9f1a6fb4e0b72865d993f33"

		};

console.log($scope.signup.password);
        $scope.loginUser = function() {
            console.log($scope.signup.password);
			//$scope.signup.password = md5.createHash($scope.signup.password || '');
            $http.post(URL, $scope.signup)


                .success(function(data) {
                    console.log(data);
                    window.alert('Bienvenido ' + data.result.username + 'última vez que iniciaste sesi—n fue el '+ data.result.lastlogin);
                    //$window.localStorage.token = data;
                    window.location.href='dashboard';
                    //window.location.href='c:/Users/david/Desktop/website/dasd/lifteyeportal/NewAPIs/ver_0.1/client/views/Dashboard.html';
                })
                .error(function(data) {
                    window.alert('Wrong credetianls');
                    $scope.signup.password = "";
                });
        };

});