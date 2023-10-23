import { StudentModel } from "./models/studentModel.js";
import logger from '../../../utils/logger.js';

export default class StudentDaoMongoDB {
    async registerStudent (studentData){
        try {
            const {dni} = studentData;
            const existStudent = await StudentModel.findOne({dni});
            if(existStudent) return false
            else {
                await StudentModel.create(studentData)
                return true 
            };
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        };
    };
    async getAllStudents (page = 1, limit = 20, key, value, sortField = 'registrationDate', sortOrder = 'desc'){
        try {
            const query = {};
            if (key && value ) {
                query[key] = value;
            };
            const options = {page, limit, sort: {}}
            if (sortField && sortOrder) {
                options.sort[sortField] = sortOrder;
            };
            const response = await StudentModel.paginate(query, options);
            return response;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        };
    };
    async getStudentById (id) {
        try {
            const response = await StudentModel.findById(id);
            return response;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        };
    };
    async deleteStudentById (id) {
        try {
            const response = await StudentModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        };
    };
    async modifyStudent (id, obj){
        try {
            const response = await StudentModel.updateOne({_id: id}, obj);
            return response;
        } catch (error) {
            logger.error(error);
            if (error.keyPattern.dni) return 'repeatedDni';
            throw new Error(error);
        };
    };
};
