// // path
import { dirname } from 'path';
import { fileURLToPath } from 'url';
export default dirname(fileURLToPath(import.meta.url));

// bcrypt
import bcrypt from 'bcrypt';
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

// response
export const createResponse = (res, statusCode, data) => {
    return res.status(statusCode).json({data})
};


