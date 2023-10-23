import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    email: {type: String, required:true, unique: true},
    password: {type:String, required:true, index:true},
    dni: {type:String, index:true, unique:true, required:true},
    role: {type:String, default:'teacher'}
});

export const UserModel = mongoose.model(
    'users',
    UserSchema
);