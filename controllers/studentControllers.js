const Student = require('../models/studentModel');
const generateStudentReceipt = require('./generateReceipt');

const getStudents = async(req,res)=>{
    try{
        const students = await Student.find();
        if(!students){
            res.status(404).json({message: "Students not found."});
        }
        res.status(200).json(students);
    }catch(error){
        console.log(error);
    }
}

const getStudent = async(req,res)=>{
    const findStudent = req.params.id;
    try{
        const student = await Student.findById(findStudent);
        if(!student){
            return res.status(404).json({message:"Student not found."});
        }
        res.status(200).json(student);
    }catch(error){
        console.log(error);
    }
}

const createStudents = async(req,res)=>{
    const {name,stream,year,phone,fees,feesPaid} = req.body;
    if(!name||!stream||!year||!phone||!fees){
        return res.status(400).json({message:"Name,Stream,Year,Phone and Fees are required."});
    }
    try{
        const student = await Student.create({
            name,
            stream,
            year,
            phone,
            fees,
            feesPaid,
        });
        res.status(201).json(student);
        console.log(req.body);
    }catch(error){
        console.log(error);
    }
}

const updateStudent = async(req,res)=>{
    const getId = req.params.id;
    try{
        const updateId = await Student.findByIdAndUpdate(getId,req.body,{new:true});
        if(!updateId){
            return res.status(404).json({message:"Student not found."});
        }
        res.status(200).json(updateId);
    }catch(error){
        console.log(error);
    }
}

const deleteStudent = async(req,res)=>{
    const getId = req.params.id;
    try{
        const deleteId = await Student.findByIdAndDelete(getId);
        if(!deleteId){
            return res.status(404).json({message:"Student not found."});
        }
        res.status(200).json(deleteId);
    }catch(error){
        console.log(error);
    }
}

const sendReceipt = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const pdfBuffer = await generateStudentReceipt(student);

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${student.name.replace(/\s+/g, '_')}_receipt.pdf"`,
            'Content-Length': pdfBuffer.length
        });

        res.send(pdfBuffer);
    } catch (err) {
        console.error("Error generating receipt:", err);
        res.status(500).json({ message: "Failed to generate receipt" });
    }
};

module.exports = {getStudent,getStudents,createStudents,updateStudent,deleteStudent,sendReceipt}