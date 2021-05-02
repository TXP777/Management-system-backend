import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({  
    attendance_id:{type:Number},
    employee_id:{type:Number},
    employee_name:{type:String},
    department_id:{type:Number},
    workingtime:{type:String},
    offworktime:{type:String},
    numberoflateandleaveearly:{type:Number},
    createtime:{type:Number},
    status:{type:Number}
});

AttendanceSchema.statics.findByAttendanceId = function (attendance_id) {
    return this.findOne({ attendance_id: attendance_id });
  };

  

export default mongoose.model('attendance', AttendanceSchema);