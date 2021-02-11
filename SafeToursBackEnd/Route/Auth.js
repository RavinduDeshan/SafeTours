const jwt = require('jsonwebtoken');
const config = require('../configure.js');

//validate authentication

const auth = (req,res,location) =>{

    try{
        const token = req.header('token');
        console.log("Token read at auth : " , token);

        if(!token)
        return res.status(401).json({msg:'Access Denied !'});
        
        const validate = jwt.verify(token,config.JWT_SECRET);


        if(!validate)
        res.status(401).json({msg:"Token Verification Unsuccessful. Access Denied!"});

        res.Login = validate.id;

        location();


    }catch(err){
        res.status(500).json({erro : err});

    }

}
module.exports = auth;