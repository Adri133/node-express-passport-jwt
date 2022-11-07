import local_strategy from "passport-local"
import bcrypt from "bcryptjs"
import User from './models/User.js'
import passportJWT from 'passport-jwt';

const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = local_strategy.Strategy

const customFields = {
    usernameField: 'email',
    passwordField: 'password',
}

const verifyCallback = (email, password, done) => {

    User.findOne({ email })
    .then (user => {
        if(!user){ return done(null, false) } 
        else {
            const isValid = bcrypt.compareSync(password, user.password)
            if(!isValid){
                return done(null, false)
            }else{
                return done(null, user)
            }
        }
    })
}

const authenticateUser = (passport) => {

    passport.use(new LocalStrategy(customFields, verifyCallback))

    passport.serializeUser((user, done) => done(null, user.id))

    passport.deserializeUser( (id, done) => User.findById(id)
    .then( user => done(null, user))
    .catch( err => done(err))
    )
    
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {

        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return UserModel.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));

}
    
export default authenticateUser
