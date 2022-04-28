import dbConnect from '../../../libs/dbConnect';
import User from '../../../models/user.model';
import bcrypt from 'bcrypt'

export default async function handler( req, res) {
    await dbConnect();
    const {body, email} = req;
    if (req.method === 'POST') {
        let user = await User.findOne({email: body.email});

        if(user){
            return res.status(400).json({msg: 'Email already in use'})
        }

        //Hashed password
        const hashedPassword = await bcrypt.hash(body.password, 10)

        //Create userSchema
         user = await User.create({
             email:  body.email,
             firstName: body.firstName,
             lastName: body.lastName,
             password: hashedPassword
         })

         res.status(201).json({user})
    }else{
        res.status(405).json({error: `${req.method} not allowed`})
    }
}