import passport from 'passport';
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt';
import UserDao from '../persistence/daos/mongodb/usersDao.js';
import { PRIVATEKEYJWT } from '../config.js';
const userDao = new UserDao();

const strategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PRIVATEKEYJWT
};

const cookieExtractor = (req) => {
    const token = req.cookies.token
    return token
}

const strategyOptionsCookies = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: PRIVATEKEYJWT
};

const verifyToken = async (jwt_payload, done) => {
    const user = await userDao.getUserById(jwt_payload._id);
    if(!user) return done(null, false)
    return done(null, jwt_payload)
}

passport.use('jwt', new jwtStrategy(strategyOptions, verifyToken));
passport.use('jwtCookies', new jwtStrategy(strategyOptionsCookies, verifyToken));

passport.serializeUser(async (user, done)=>{
    done(null, user)
});

passport.deserializeUser(async(id, done)=>{
    const user = await userDao.getUserById(id);
    return done(null, user);
});