

import type { NextApiRequest, NextApiResponse } from 'next';
import {mongooseConnect} from '@/libs/mongoose';
import {UserModel} from '@/models/User';
import bcrypt from "bcryptjs";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
   
    // CONNECT MONGODB!
    mongooseConnect();

    // NEW USER!
    if(req.method === 'POST'){
       const { username, email, password } = req.body;

     // WILL SET THINGS IN TRY CATCH BLOCK!


     // CONVERTING TO ENCRYPTED PASSWORD!
     const hashedPassword = await bcrypt.hash(password, 12);

     try{
      
       // SAVING IN DATABASE MONGODB
       const newUser = await UserModel.create({
          name: username,
          email,
          encryptedPassword: hashedPassword,
          image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8BTzEUFSgoBWeGm9-DwxdfQfpJKIo63fw_0HdzY554vb7lNkA1ntutbR3o0LGeU60rqU&usqp=CAU'
        });
        
              res.status(200).json({success:true,newUser});
              res.end();

     } catch (error: any) {
  
      res.status(404).json({exists: error.keyPattern});
      res.end();
     }

    }

}