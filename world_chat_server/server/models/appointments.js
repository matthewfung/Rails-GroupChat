var mongoose = require('mongoose');
var AppointmentSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  time: { type: Date, default: Date.now },
  name: String,
  complain: String
});
AppointmentSchema.path('date').required(true, 'Specify an appointment date');
AppointmentSchema.path('time').required(true, 'Specify an appointment time');
AppointmentSchema.path('name').required(true, 'Patient name cannot be blank');
AppointmentSchema.path('complain').required(true, 'Indicate your problem/complaint');

mongoose.model('Appointment', AppointmentSchema);