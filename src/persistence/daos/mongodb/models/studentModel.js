import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const StudentSchema = new mongoose.Schema({
    firstName: {type: String, required:true, index: true },
    lastName: {type: String, required:true, index: true },
    email: {type: String, required:true },
    birth: {type: Date, required: true },
    dni: {type: Number, required: true, unique: true, index: true },
    houseAddress: {type:String, required: true },
    cellphone: {type:Number, required: true },
    previousLevel: {type:String, default: null },
    medicalObservations: {type: String, default: null },
    preferredTime: {type: String, required: true },
    paymentMethod: {type: String, required: true, index: true },
    itsPaid: {type: Boolean, default:false},
    registrationDate: { type: Date, default: Date.now, index: true }
});

StudentSchema.plugin(mongoosePaginate);

export const StudentModel = mongoose.model(
    'student',
    StudentSchema
);