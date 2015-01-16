 myApp.factory('ChatFactory', function($http){
      var factory = {};
      var chats = [];

      factory.getChats = function(user){
          ioo.emit("new_user", user);
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
