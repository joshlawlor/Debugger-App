const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const showAll = (req,res) => {
    User.find({}, (err, users) => {
        if(err) {
            res.status(400).json(err)
            return 
        }
        res.json(users)
    })
}

const signUp = (req, res) =>{
    const user = new User(req.body);
    user.save()
    const token = createJWT(user)
    console.log('Signup function:', token, user)
    res.json({token})
}

// *********** THIS FUNCTION DOES NOT WORK PROPERLY ***********
async function login(req,res) {
    try{
        const user = await User.findOne({email: req.body.email}).select('+password');
        console.log(user)

        if(!user) return res.status(401).json({err: 'email does not exist, userCtrl line 9'});
        console.log(user.comparePassword(req.body.password, (err, isMatch) => {
            console.log(isMatch)
            if(isMatch) {
                const token = createJWT(user);
                console.log(`Line 28 loginFunction`)
                console.log(token)
                res.json({token});

            }else{
                return res.status(401).json({err: 'invalid password, userCtrl line 15'})
            }
        }) )
    }catch (err){
        return res.status(400).json(err)
    }
}

const deleteUser = (req,res) => {
    console.log(req.user)
    User.findByIdAndDelete({_id: req.params.id}, (err, user) => {
        if(err){
            res.status(400).json(err)
        }
        res.json({msg: 'user deleted'})
    })
}

function createJWT(user) {
    console.log('JWT function', user)
    try {
        return jwt.sign(
            {user},
            SECRET,
            {expiresIn: '24h'}
        )
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    signUp,
    showAll,
    login,
    deleteUser
}