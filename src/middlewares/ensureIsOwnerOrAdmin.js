import { HttpResponse } from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();
export const ensureIsOwnerOrAdmin = (req, res, next) => {
    if (req.user.role === 'owner') {
        return next(); 
    };
    if (req.user.role === 'admin') {
        return next(); 
    };
    return httpResponse.Unauthorized(res, 'onlyTheOwnerIsAuthorized');
};