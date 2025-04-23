const express = require('express');
const router = express.Router();
const {getStudent,getStudents,createStudents,updateStudent,deleteStudent,sendReceipt} = require('../controllers/studentControllers');
router.route('/').get(getStudents).post(createStudents);
router.route('/:id').get(getStudent).put(updateStudent).delete(deleteStudent);
router.get('/:id/receipt',sendReceipt);

module.exports = router;