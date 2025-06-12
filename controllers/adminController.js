const bcrypt = require('bcrypt');
const { User } = require('../models');

//register a student
const registerStudent=async(req, res) => {
    try{
        const {name, email, password, dob, role}=req.body 
        //ensure role is student 
        if (role!=='student'){
            return res.status(400).json({message: 'Only students can be registered here.'})
        }
        const existingUser=await User.findOne({where: {email} });
        if (existingUser){
            return res.status(409).json({message: 'Email already in use'})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        //create student
        const student = await User.create({
            name,
            email,
            password:hashedPassword,
            dob,
            role:'student',
        });
        res.status(201).json({ message: 'Student registered successfully.', studentId: student.id });
    }
    catch(error){
        console.error('Register student error:',error);
        res.status(500).json({message: 'internal server error.'})
    }
};

module.exports={
    registerStudent,
};