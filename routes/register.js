import bcrypt  from 'bcryptjs';
import User  from '../models/User.js';
import express from "express";
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, pwd, pwdConf } = req.body
    // VALIDATION
    let errors = [];
    console.log(req.body);
    if (typeof pwd === 'undefined') errors.push('Password requiered');
    if(pwd !== pwdConf) errors.push(`Passwords don't match`);
    
    const emailTaken = await User.findOne({ email })
    if(emailTaken) errors.push(`Email taken!`)
    
    if(errors.length > 0) {
      res.send(errors)

    } else {

      // REGISTRATION
      const hashpwd = await bcrypt.hash(pwd, 12)
      let user = new User({ username, email, password: hashpwd })
      try {
          await user.save()
          res.send('Register success')
      } catch {
        res.send('Wrong')
      }
    }


});

export default router;