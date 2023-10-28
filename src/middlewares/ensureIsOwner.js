import { HttpResponse } from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();
export const ensureIsOwner = (req, res, next) => {
    if (req.user.role === 'owner') {
        return next(); 
    }else{
        return httpResponse.Unauthorized(res, 'onlyTheOwnerIsAuthorized');
    };
};