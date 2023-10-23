const HttpStatus = {
    ok: 200,
    badRequest: 400,
    notFound: 404,
    unauthorized: 401,
    forbidden: 403,
    conflict: 409,
    internalServerError: 500
};

export class HttpResponse {
    Ok(res, data){
        return res.status(HttpStatus.ok).json({
            status: HttpStatus.ok,
            message: 'Success',
            data: data
        });
    };

    BadRequest(res, data){
        return res.status(HttpStatus.badRequest).json({
            status: HttpStatus.badRequest,
            message: 'Bad Request',
            data: data
        });
    };

    NotFound(res, data){
        return res.status(HttpStatus.notFound).json({
            status: HttpStatus.notFound,
            message: 'Not Found',
            errors: data
        });
    };

    Unauthorized(res, data){
        return res.status(HttpStatus.unauthorized).json({
            status: HttpStatus.unauthorized,
            message: 'Unauthorized',
            errors: data
        });
    };

    Forbidden(res, data){
        return res.status(HttpStatus.forbidden).json({
            status: HttpStatus.forbidden,
            message: 'Forbidden',
            errors: data
        });
    };

    Conflict(res, data){
        return res.status(HttpStatus.conflict).json({
            status: HttpStatus.conflict,
            message: 'Conflict',
            errors: data
        });
    };

    ServerError(res, data){
        return res.status(HttpStatus.internalServerError).json({
            status: HttpStatus.internalServerError,
            message: 'Internal Server Error',
            errors: data
        });
    };
};