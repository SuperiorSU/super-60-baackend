import mongoose from "mongoose";
import Student from "../model/studentModel.js";
import bcrypt from "bcryptjs";


export const registerStudent = async(req, res)=>{
    try{
        const {name, email,phoneNo,password} = req.body
    // 1. req.body
    // 2. req.params
    // 3. req.query
    if(!name || !email || !phoneNo || !password){
        return res.status(400).json({
            message:"Please fill all the required fields",
            success: false
        })
    }

    if(!email.includes('@' || !email.includes('.'))){
        return res.status(400).json({
            message:"Please enter a valid email",
            success: false
        })
    }
    // check existence in db
    const user = await Student.findOne({email});
    if(user){
        return res.status(400).json({
            message:"User already exists",
            success: false
        })
    }
    const hashedPaswd = await bcrypt.hash(password, 10);

    const newStudent = new Student({
        name, email, phoneNo, password:hashedPaswd
    })
    newStudent.save()
    return res.status(201).json({
        message:"User registered successfully",
        success: true,
        data: newStudent
    })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message:"Internal server error",
            success: false
        })
    }
    
}

export const loginStudent = async(req, res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"Please fill all the required fields",
                success: false
            })
        }
        if(!email.includes('@') && !email.includes('.')){
            return res.status(400).json({
                message:"Please enter a valid email",
                success: false
            })
        }

        const user = await Student.findOne({email})
        if(!user){
            return  res.status(400).json({
                message:"User does not exist",
                success: false
            })
        }

        const paswdMatch = await bcrypt.compare(password, user.password)
        // console.log(user?.password, password, paswdMatch);
        if(!paswdMatch){
            return res.status(400).json({
                message:"Invalid credentials",
                success: false
            })
        }
        return res.status(200).json({
            message:"User logged in successfully",
            success: true,
            data: user
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal server error",
            success: false
        })
    }
}

export const updateStudentProfile = async(req, res)=>{
    try{
        const studentId = req.params.id; 
        const {name, email, phoneNo, address} = req.body;

        const user = await Student.findOne({_id: studentId});
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success: false
            })
        }
        const updatedStudent = await Student.findByIdAndUpdate(studentId,
            {
                name,
                email,
                phoneNo,
                address
            }, {new:true});
        
        return res.status(200).json({
            message:"User profile updated successfully",
            success: true,
            data: updatedStudent
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            message:"Internal server error",
            success: false
        })
    }
}

export const deleteStudentProfile = async(req, res)=>{
    
}