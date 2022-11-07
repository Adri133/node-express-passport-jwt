import express from "express";
import passport  from 'passport';
import jwt from 'jsonwebtoken';
const router = express.Router();

// L O G I N
router.get('/login', (req, res) => res.render('login'));

router.post('/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
        req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
           user = {
            username: user.username,
            email: user.email
           }
           return res.json({user, token});
        });
    })(req, res);
});



export default router;