import StudentDaoMongoDB from "../persistence/daos/mongodb/studentDao.js";
import { HttpResponse } from "../utils/httpResponse.js";
import { FRONTURL } from "../config.js";
import logger from '../utils/logger.js';
const httpResponse = new HttpResponse();
const studentDao = new StudentDaoMongoDB();

export const registerStudentController = async ( req, res, next ) =>{
    try {
        const newStudent = await studentDao.registerStudent(req.body);
        if(newStudent === false) return httpResponse.Conflict(res, 'DNIAlreadyRegistered');
        if(newStudent === true) return httpResponse.Ok(res, 'SuccessfullyRegisteredStudent');
    } catch (error) {
        logger.error(error);
        next(error);
    };
};

export const getAllStudentsController = async ( req, res, next) =>{
    try {
        const { page, limit, key, value, sortField, sortOrder } = req.query;
        const allStudents = await studentDao.getAllStudents(page, limit, key, value, sortField, sortOrder);
        const nextLink = allStudents.hasNextPage ? `${FRONTURL}/products/page=${allStudents.nextPage}` : null
        const prevLink = allStudents.hasPrevPage ? `${FRONTURL}/products/page=${allStudents.prevPage}` : null
        const productsFile = {
            results: allStudents.docs,
            info: {
                count: allStudents.totalDocs,
                pages: allStudents.totalPages,
                actualPage: allStudents.page,
                hasPrevPage: allStudents.hasPrevPage,
                hasNextPage: allStudents.hasNextPage,
                nextPageLink: nextLink,
                prevPageLink: prevLink
            }
        };
        return httpResponse.Ok(res, productsFile);
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const getStudentByIdController = async ( req, res, next ) =>{
    try {
        const {id} = req.params;
        const studentSearched = await studentDao.getStudentById(id);
        if (!studentSearched) {
            logger.error(`student with id ${id} not found`);
            return httpResponse.NotFound(res, 'StudentNotFound');
        } else{
            return httpResponse.Ok(res, studentSearched);
        };
    } catch (error) {
        logger.error(error);
        next(error);
    };
};

export const deleteStudentController = async ( req, res, next ) =>{
    try {
        const {id} = req.params;
        const studentToDelete = await studentDao.deleteStudentById(id);
        if (!studentToDelete) {
            logger.error(`student with id ${id} not found`);
            return httpResponse.NotFound(res, 'StudentNotFound');
        } else{
            return httpResponse.Ok(res, studentToDelete);
        };
    } catch (error) {
        logger.error(error);
        next(error);
    };
};

export const modifyStudentController = async ( req, res , next) =>{
    try {
        const {id} = req.params;
        const {firstName, lastName, email, birth, dni, houseAddress, cellphone, previousLevel, medicalObservations, preferredTime, paymentMethod} = req.body;
        const studentUpdated = await studentDao.modifyStudent(
            id,
            { firstName, lastName, email, birth, dni, houseAddress, cellphone, previousLevel, medicalObservations, preferredTime, paymentMethod }
        );
        if(studentUpdated === 'repeatedDni') return httpResponse.BadRequest(res, 'RepeatedDni')
        if(studentUpdated.modifiedCount === 0) return httpResponse.NotFound(res, 'StudentNotFound')
        return httpResponse.Ok(res, studentUpdated)
    } catch (error) {
        logger.error(error);
        next(error);
    };
};