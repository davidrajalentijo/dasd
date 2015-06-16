var app =angular.module('dashboard',[]);

function mainController($scope, $http, $filter) {
    $scope.objects=[{}];
    $scope.objects={};
    $scope.objects=[];
    $scope.grupos =[{}];
    $scope.longitud =[{}];
    $scope.events =[{}];
//    var URL = "http://localhost:81/api/auth/logout";
//    var URLOperation ="http://localhost:81/api/sites";
    var URL = "/api/auth/logout";
    var URLOperation ="/api/sites";
    var URLGroups = "http://localhost:81/api/groups";
    //Funcion que devuelve el n�mero de instalaci�n que estan disponibles
    $scope.getgrupos = function () {
        $http.get(URLOperation)
            .success(function (data) {
                var groups = data;

                angular.forEach(groups, function(group) {
                    var group2 = group;

                    angular.forEach(group2.sites, function(group3){

                        $scope.longitud.push(group3);

                    })


                });

            })
            .error(function(data) {

                window.alert('Something Wrong...');
    });
    };
    //Funci�n que devuelve los Grupos que tiene el usuario
    $scope.getGroups = function () {
        $http.get(URLGroups)
            .success(function (data) {
                var groups = data;
                console.log("hola");
                console.log(data);
                console.log(data.groupname)
            })
            .error(function(data) {

                window.alert('Something Wrong...');
            });
    };

      var URLEvents = "/api/events/";
//    var URLEvents = "http://localhost:81/api/events/";
//Funci�n que devuelve los eventos de una instalaci�n
    $scope.getevent = function (object) {
        $http.get(URLEvents + object.liftsiteid, $scope)
            .success(function (data) {
                var events = data;
                angular.forEach(events, function(event) {
                    $scope.events.push(event);
                    $scope.itemsPerPage = 10;
                    $scope.currentPage = 0;
                    $scope.range = function() {
                        var rangeSize = 4;
                        var ps = [];
                        var start;
                        start = $scope.currentPage;
                        if ( start > $scope.pageCount()-rangeSize ) {
                            start = $scope.pageCount()-rangeSize+1;
                        }
                        for (var i=start; i<start+rangeSize; i++) {
                            ps.push(i);
                        }
                        return ps;
                    };
                    $scope.prevPage = function() {
                        if ($scope.currentPage > 0) {
                            $scope.currentPage--;
                        }
                    };
                    $scope.DisablePrevPage = function() {
                        return $scope.currentPage === 0 ? "disabled" : "";
                    };
                    $scope.pageCount = function() {
                        return Math.ceil($scope.events.length/$scope.itemsPerPage)-1;
                    };
                    $scope.nextPage = function() {
                        if ($scope.currentPage > $scope.pageCount()) {
                            $scope.currentPage++;
                        }
                    };
                    $scope.DisableNextPage = function() {
                        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";

                    };
                    $scope.setPage = function(n) {
                        $scope.currentPage = n;

                    };
                })
                    })
            .error(function (data) {
                window.alert('Something Wrong...');
            });
    };


    $scope.numPages = function () {
        return Math.ceil($scope.todos.length / $scope.numPerPage);
    };

    $scope.$watch('currentPage + numPerPage', function () {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

    });



//Funci�n que devuelve las instalaciones de un usuario
    $http.get(URLOperation, $scope)
        .success(function(data) {

            var groups = data;


            angular.forEach(groups, function(group) {
                var group2 = group;

                angular.forEach(group2.sites, function(group3){
                    $scope.longitud.push(group3);
                    $scope.objects.push(group3);
                    $scope.predicate = 'msisdn';
                    $scope.reverse = true;
                    $scope.order = function(predicate) {
                        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                        $scope.predicate = predicate;
                    };

                })

            });

        })
        .error(function(data) {
            window.alert('Something Wrong...');
        });


//Funci�n para salir de la aplicaci�n
    $scope.logout = function() {
        $http.get(URL)
            .success(function() {
                window.alert('Cerrando Sesi�n ');

                window.location.href='/index.html';
            })
            .error(function(data) {

                window.alert('No se ha podido cerrar la sesi�n');
            });
    };



    $scope.password = {};
    $scope.changepassword = function() {

        $http.post(URL,$scope.signup)
            .success(function(data) {
                window.alert('Bienvenido ' + data.result.username + '�ltima vez que iniciaste sesi�n fue el '+ data.result.lastlogin);
                window.location.href='/Dashboard.html';
            })
            .error(function(data) {

                window.alert('Wrong credetianls');
            });
    };

}




app.filter('pagination', function()
{
    return function(input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
});
