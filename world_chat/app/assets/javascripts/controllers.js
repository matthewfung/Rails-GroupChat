myApp.controller('ChatController', function($scope, $window, $location, ChatFactory, $timeout){
    function generateColor(){
       return Math.floor(Math.random()*16777215).toString(16);
   }
   $scope.chats = [];
   $scope.users = [];
   $scope.user= {
      name: "",
      image: "",
      location: "",
      color: "#"+generateColor()
   };
   $scope.messages = [];
   // $scope.latitude = "";
   // $scope.longitude = "";
   $scope.address = "";
   $scope.content = "";
   $scope.isTyping = [];

   ioo.on("disconnect", function(message){
      $scope.messages.push(message);
      $scope.$apply();
      $timeout(function(){
           $scope.messages.shift();
           $scope.$apply();
       }, 4500);
   });
   ioo.on("chats", function(chats){
       $scope.chats = chats;
       console.log($scope.chats);
       $scope.$apply();
    });

   ioo.on("users", function(users){
      $scope.users = users;
      $scope.$apply();
   });
   ioo.on("new_message", function(msg){
      $scope.chats.push(msg);
      $scope.$apply();
   });
   ioo.on("typing", function(user){
      $scope.isTyping.push(user);
      $scope.$apply();
   })
   ioo.on("not_typing", function(user){
      var i = $scope.isTyping.indexOf(user.name);
      $scope.isTyping.splice(i,1);
   })
   //Sends a request to grab all connected users and all messages typed so far.
   $scope.getChats = function(){
    $.get("http://uifaces.com/api/v1/random", function(data){
          console.log(data);
          if($scope.user.name == "")
              $scope.user.name = data.username;
          $scope.user.image = data.image_urls.epic;
          ChatFactory.getChats($scope.user);
      });
   }

   $scope.typing = function(e){
      //13 is the enter key
      if(e.keyCode!== 13)
        ioo.emit("typing", $scope.user);
   }
 
   function newMessage(){
      var message = {
           user : $scope.user,
           message : $scope.content
         };
      var i = $scope.isTyping.indexOf($scope.user);
      $scope.isTyping.splice(i,1);
      
      $scope.chats.push(message);
      ioo.emit("message", message);
      $scope.content = "";
   }
   $scope.pressEnter = function(){
      if($scope.content !== "")
        newMessage();
   }
   $scope.submitText= function(){
      if($scope.content !== "")
        newMessage();
   }

  function init() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
          var geocoder = new google.maps.Geocoder();
          var lat = pos.coords.latitude;
          var lng = pos.coords.longitude;
          var latlng = new google.maps.LatLng(lat, lng);

          //reverse geocode the coordinates, returning location information.
          geocoder.geocode({ 'latLng': latlng }, function (results, status) {
              var result = results[0];
              var state = '';
              var country = ''
;              var address = result.formatted_address;
              console.log("AC", result);
              $scope.user.location = address;

              for (var i = 0, len = result.address_components.length; i < len; i++) {
                  var ac = result.address_components[i];
                  if (ac.types.indexOf('administrative_area_level_1') >= 0) {
                      state = ac.short_name;
                  }
                  if (ac.types.indexOf('country') >= 0) {
                      country = ac.long_name;
                  }
                  if (ac.types.indexOf('locality') >= 0) {
                      city = ac.long_name;
                  }
              }
              $scope.user.location = city+ ", "+state+", "+country;
               document.getElementById("location").innerHTML = address;

          });
      });
    } else { 
        document.getElementById("myModal").innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  init();

   // $scope.appt = {};
   // $scope.appt.name = $window.name;
   // $scope.message = "";
   // $scope.today = function(){
   // 		return new Date().toISOString();
   // }	
   
   // ioo.on("new_appointment", function(data){
   // 		console.log("Getting new appointment", data);
   // 		$scope.appointments = data;
   // 		$scope.$apply();
   // });

   // ioo.on("cancel_appointment", function(data){
   // 	   $scope.appointments = data;
   // 	   $scope.$apply();
   // })

   // ApptFactory.getAppointments(function(output){
   // 	  $scope.appointments = output;
   // 	  console.log($scope.appointments);
   // });
   
   //  $scope.cancelAppointment = function(date, name, complain){
   //  	ApptFactory.cancelAppointment(date, name, complain, function(output){
   //  		$scope.appointments = output;
   //  		ioo.emit("cancel_appointment", output);
   //  	});
   //  }

});




