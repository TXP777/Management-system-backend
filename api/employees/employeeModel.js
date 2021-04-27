import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  
    employee_id:{type:Number,unique:true},
    department_id:{type:Number},
    role_id:{type:Number},
    manager:{type:String},
    employee_name:{type:String},
    employee_gender:{type:String},
    employee_birth:{type:Number},
    employee_qualification:{type:String},
    employee_phone:{type:Number},
    employee_address:{type:String},
    employee_salary:{type:Number},
    createtime:{type:Number},
    lastchangetime:{type:Number},
    status:{type:String}
});

EmployeeSchema.statics.findByEmployeeId = function (employee_id) {
    return this.findOne({ employee_id: employee_id });
  };

  

export default mongoose.model('employees', EmployeeSchema);