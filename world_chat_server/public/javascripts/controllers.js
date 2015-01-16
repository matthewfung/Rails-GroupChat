myApp.controller('ChatController', function($scope, $window, $location, ApptFactory){
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
   //  $scope.addAppointment = function(){
   //  	$location.path("/new_appointment");
   //  }
   //  $scope.submitAppointment = function(){
   //  	ApptFactory.submitAppointment($scope.appt, function(result){
   //  		console.log("Submit application", typeof result);
   //  		if((typeof result) == "string"){
	  //   		$scope.message = result;
	  //   	}
	  //   	else{
	  //   		ioo.emit("new_appointment", result);
	  //   		$location.path("/");
	  //   	}
   //  	});
   //  }
   //  $scope.cancelAppointment = function(date, name, complain){
   //  	ApptFactory.cancelAppointment(date, name, complain, function(output){
   //  		$scope.appointments = output;
   //  		ioo.emit("cancel_appointment", output);
   //  	});
   //  }

});




