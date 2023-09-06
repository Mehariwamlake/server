import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

} , {timestamps: true});


const User = mongoose.model('User', UserSchema);

export default User;