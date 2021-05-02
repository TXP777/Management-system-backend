import express from 'express';
import Attendance from './attendanceModel';

const router = express.Router(); // eslint-disable-line

// Get all data
router.get('/', (req, res, next) => {
    Attendance.find().then(attendance =>  res.status(200).json(attendance)).catch(next);
});

//get a single recording
router.get('/:attendance_id', (req, res, next) => {
const attendance_id = req.params.attendance_id;
Attendance.findByAttendanceId(attendance_id).then(
  attendance =>  res.status(201).json(attendance)
).catch(next);
});
//delete 
router.delete('/:attendance_id/delete', async (req, res, next) =>{
  const attendance_id = req.params.attendance_id;
  if(attendance_id){
  Attendance.deleteOne({attendance_id: attendance_id})
  .then(() => res.status(200).json({message:"Successfully Deleted!"})).catch(next);
  }else{
    res.status(401).json({ code: 401, msg: 'Delete failed!' });
  }
})

//add a single recording
router.post('/addAttendance', async (req,res,next) =>{
  const attendance_id = await Attendance.findByAttendanceId(req.body.attendance_id).catch(next);
  if (attendance_id) {
    res.status(401).json({ code: 401, msg: 'Record already exists!' });
  }else {
  await Attendance.create(req.body).then(() => res.status(201).json({
    code: 201,
    msg: 'Successful created new recording.',
  })).catch(next);
}
});




export default router;