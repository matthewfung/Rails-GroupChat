var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/',
      {
        templateUrl: 'partials/appointments.html'
      })
    .when('/new_appointment',
      {
 		 templateUrl: 'partials/new_appointment.html'
      })
    .otherwise({
      redirectTo: '/'
      });
});
