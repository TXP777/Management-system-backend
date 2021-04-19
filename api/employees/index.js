import express from 'express';
import Employee from './employeeModel';

const router = express.Router(); // eslint-disable-line

// Get all employee
router.get('/', (req, res, next) => {
    Employee.find().then(employees =>  res.status(200).json(employees)).catch(next);
});

//get a single employee
router.get('/:employee_id', (req, res, next) => {
const employee_id = req.params.employee_id;
Employee.findByEmployeeId(employee_id).then(
  employee =>  res.status(201).json(employee)
).catch(next);
});

//add a single employee
router.post('/addEmployee', async (req,res,next) =>{
  const employee_id = await Employee.findByEmployeeId(req.body.employee_id).catch(next);
  if (employee_id) {
    res.status(401).json({ code: 401, msg: 'The employee_id has already been used!' });
  }else {
  await Employee.create(req.body).catch(next);
  res.status(201).json({
    code: 201,
    msg: 'Successful created new employee.',
  });
}
});
router.put('/:employee_id/update',async(req, res,next) =>{
  User.findOneAndUpdate({employee_id: req.params.employee_id}, {employee_name:req.body.employee_name,employee_gender:req.body.employee_gender,employee_phone:req.body.employee_phone,employee_address:req.body.employee_address })
  .then(function(){
    User.findByUserId(req.params.user_id)
    .then(user => res.json(200,user)).catch(next);
  });
});
router.delete('/:employee_id/delete', async (req, res, next) =>{
  const employee_id = req.params.employee_id;
  Employee.remove({employee_id: employee_id})
  .then(() => res.status(200).json({message:"Successfully Deleted!"})).catch(next);
})


export default router;