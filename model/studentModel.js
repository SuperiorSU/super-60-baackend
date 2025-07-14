import mongoose from "mongoose";

const studentModel = mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        // required: true,
        // regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    },
    skills:{
        type: [String],
        default: []
    },
    phoneNo:{
        type: String,
        unique: true
    },
    address:{
        type: String,
        default: ''
    },
    sem1:{
        sub1:{
            type: String,
            default: ''
        },
        sub2:{
            type: String,
            default: ''
        },
        sub3:{
            type: String,
            default: ''
        },
        sub4:{
            type: String,
            default: ''
        },
    },
    certifications:{
        type: [{
            certificateName:{
                type: String,
                default: ''
            },
            certificateDate:{
                type: Date,
                default: Date.now()
            },
            certificateLink:{
                type: String,
                default: ''
            }
        }],
        default: []
    }
})

const Student = mongoose.model('Student', studentModel);
export default Student;