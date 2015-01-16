var mongoose = require('mongoose')
var Appointment = mongoose.model('Appointment');


module.exports = {
  index: function(req, res){
     res.render('./../server/views/index', {title:'Welcome Page'});
  },
  add_appointment: function(req,res){
      var validation = {
        name: req.body.name,
        date: req.body.date
      }
      //I would also compare current date (new Date().getTime()) with the
      //desired appointment time to see if it is within 24 hours. From this logic,
      // I would then determine if I can add or delete an appointment. But I don't feel
      //it is needed for this test.
      Appointment.find(validation, function(err, result){
         if(result.length >0){
           res.send("You can only make 1 appointment a day!");
         } else{
            if((req.body.date == undefined) || (req.body.complain == undefined) ){
              res.send("Please enter both a date and complaint");
            } else{
                if(req.body.complain.length < 10){
                   res.send("Your complaint should be at least 10 characters");
                } else{
                 Appointment.find({"date": req.body.date}, function(err, result){
                     if(result.length >2){
                         res.send("There are already 3 appointments for that date!");
                     } else{
                        console.log(req.body.date);
                        var appt_time = new Date(req.body.date);
                        if(result.length == 0){
                            //8am
                            appt_time.setHours(8);
                        } else if(result.length == 1){
                            //1pm
                            appt_time.setHours(13);
                        } else if(result.length == 2){
                            //3pm
                            appt_time.setHours(15);
                        }

                        console.log("The time is", appt_time, appt_time.toDateString());
                        var data = {
                          name: req.body.name,
                          complain: req.body.complain,
                          time: appt_time.toISOString(),
                          date: req.body.date
                        }
                        var a = new Appointment(data);
                        a.save(function(err){
                        if(err){
                           res.send(err);  
                        } else{
                          Appointment.find({}, function(err, new_results){
                             res.send(new_results);
                          });
                        }
                        });

                     }
         });
      }
    }

         }
      });

  },
  get_appointments: function(req, res){
     Appointment.find({}, function(err, result){
         //Assume there are no errors
         res.send(result);
     })
  },
  cancel_appointment: function(req, res){
    console.log("Cancel appointment: ", req.body);
    Appointment.remove(req.body, function(err, result){
        Appointment.find({}, function(err, result){
            //Let front end know the updated list
            res.send(result);
        })
    })
  }
}