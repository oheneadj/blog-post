import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from '../../../models/user.model';
import bcrypt from 'bcrypt';
import dbConnect from '../../../libs/dbConnect'

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Login Here",
            credentials: {
                email: {
                    label: "Email Address",
                    type: "email",
                    placeholder: "Enter your email address",
                    required: true,
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter your password",
                }
            },
            authorize: async (credentials) => {
                await dbConnect();
                const {email, password} = credentials;
                // check if user exists in the database
                let user = await User.findOne({email});

                // if email doesn't exist'
                if(!user){
                    return null;
                }

                // check if user password is correct
                const passMatch = await bcrypt.compare(password, user.password);

                // if password is not correct
                if(!passMatch){
                    return null;
                }

                // return user
                return user;
                

            }
 
        })
    ],
    callback: {
        jwt: ({token, user}) => {
            // check if user has a token
            if(token){
                token.id = user._id;
                token.firstName = user.firstName
                token.lastName = user.lastName
            }
            return token;
        },
        session : ({session, token}) => {
            if(session) {
                session.id = token.id;
                session.firstName = token.firstName;
                session.lastName = token.lastName;
            }
           return session;
        }
    },
    secret:"thissecret",
    jwt:{
        secret: "secret",
        encrypt: true,
    }  
})