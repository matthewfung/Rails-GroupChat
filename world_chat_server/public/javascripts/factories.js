 myApp.factory('ApptFactory', function($http){
      var factory = {};
      var appointments =[];

      factory.submitAppointment =function(data, callback){
         $http.post('/server/add_appointment',data).success(function(output){
             callback(output);
         })
      }
      factory.getAppointments = function(callback){
        $http.get('/server/get_appointments').success(function(output){
           console.log("Got Appointments", output);
           appointments = output;
           callback(output);
        });
      }
      factory.cancelAppointment = function(date, name, complain, callback){
         var data = {
            date: date,
            name: name,
            complain: complain
         }
         $http.post('/server/cancel', data).success(function(output){
             appointments = output;
             callback(output);
         })
      }

      return factory;
});
