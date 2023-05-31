
import type { NextApiRequest, NextApiResponse } from 'next';
import { mongooseConnect } from '@/libs/mongoose';
import { UserModel } from '@/models/User';
import bcrypt from "bcryptjs";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // CONNECT MONGODB!
    mongooseConnect();

    // VERIFY FIRSTLY IF SESSION EXISTS OR NOT!




    // POST METHOD CHECKS✔️✔️!

    if (req.method === "POST") {
        const { email } = req.body;

        const user = await UserModel.findOne({ email }, { projection: { _id: 1, username: 1 } });
        // USER NOT EXISTS
        if (!user) {
            res.status(404).json({ success: false, message: "User not Exists" });
            res.end();
        }

        // USER EXISTS!
        res.status(200).json({ success: true, user });
        res.end();


    }


    //---------------------------------------😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 ---------------------------------------
    //---------------------------------------😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 ---------------------------------------
    //---------------------------------------😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 ---------------------------------------


    // PUT METHOD CHECKS✔️✔️!

    if (req.method === "PUT") {
        const { password, id } = req.body;

        // COVERTING TO ENCRYPTED PASSWORD!
        const hashedPassword = await bcrypt.hash(password, 12);


        const updatedUser = await UserModel.findByIdAndUpdate(id, {
            encryptedPassword: hashedPassword,
        });


        // FOR PROTECTING OUR API IF ID NOT AVAILABLE THROW ERROR!

        // ELSE!
        // if(updatedUser){
        res.json({ success: true })
        res.end();
        // }


    }


}
