export const ensureIsUser = (req, res, next) => {
    if (!req.user.role === 'user') {
        res.json({msg:'the user does not have permission'})
    }else{
        return next(); 
    }
}