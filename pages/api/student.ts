
import type { NextApiRequest, NextApiResponse } from 'next';
import {mongooseConnect} from '@/libs/mongoose';
import {StudentModel} from '@/models/Student';

 
export default async function handler(req:NextApiRequest,res:NextApiResponse){
   
    // CONNECT MONGODB!
    mongooseConnect();

    
    // POST METHOD CHECKS ✔️✔️!
    if(req.method === 'POST'){
    
        // CHECKING IF CURRENT SESSION IS AVAILABLE OR NOT!
        if(!req.body.userId){
          res.status(401).json({success:false,unathorized:true});
          res.end();
         }

         
        const { gender , DOB , name , city , groups ,image ,userId } = req.body;

        // CREATE NEW DATA!
        await StudentModel.create({
            gender , DOB , name , city , groups ,image,userId
        });
         

        res.status(200).json({success:true});
        res.end();
    }

//---------------------------------------😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 ---------------------------------------
//---------------------------------------😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 ---------------------------------------
//---------------------------------------😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 ---------------------------------------


    // GET METHOD CHECKS✔️✔️!
    if(req.method === 'GET') {

        // CHECKING IF CURRENT SESSION IS AVAILABLE OR NOT!
        if(!req.query.userId){
            res.status(401).json({success:false,unathorized:true});
            res.end();
        }


        // SEARHCING SPECIFIC QUERY FILTER!
        if(req?.query?.query){

            // CREATING REGEX EXPRESSION WITH CASE INSENSITIVE!
            var s = new RegExp(req?.query?.query as string, "i");
            
            // TO SEARHCH QUERY WHERE?
            let toSearch = {};
            
            // THATS MIL GY!
            toSearch = {
                $or: [
                  { name: { $regex: s } },
                  { gender: { $regex: s } },
                  { groups: { $regex: s } },
                  { image: { $regex: s }},
                  { city: { $regex: s }},
             //   { DOB: {  }},
                ],
              };

            const studentSearch = await StudentModel.find(toSearch,{name:1,gender:1,groups:1,image:1,DOB:1,city:1}).select("name gender groups city").limit(10);
           
            res.status(200).json({sucess:true,studentSearch});
            res.end();
        }
        
        // SEARCHING SINGLE STUDENT QUERY!
        if(req.query.s){
            const studentDocuments = await StudentModel.findById(req.query.s).exec();
            
            // IF AUTHOR AND REQUESTED USER SAME!
            // if(studentDocuments.authorID === req.query.userId){
            //     console.log(true);
            // }else{
            //     console.log(false);
            // }

            res.status(200).json({success:true,studentDocuments});
            res.end();
        }
        // -------

        // FOR ALL!
        const studentDocuments = await StudentModel.find({}).exec();
        res.status(200).status(200).json({studentDocuments});
        res.end();
    }

//---------------------------------------😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 ---------------------------------------
//---------------------------------------😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 ---------------------------------------
//---------------------------------------😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 ---------------------------------------


// PUT METHOD CHECKS✔️✔️!
    if(req.method === 'PUT'){
        
        const { gender , DOB , name , city , groups ,image,userId,studentID} = req.body;
        
        // CHECKING IF CURRENT SESSION IS AVAILABLE OR NOT!
        if(!userId){
            res.status(401).json({success:false,unathorized:true});
            res.end();
        }

        // UPDATE DATA!
        await StudentModel.findByIdAndUpdate(studentID,{
            gender , DOB , name , city , groups ,image,userId,studentID
        }).exec();

        // RESPONSE BACK!
        res.json({success:true})
        res.end();
    }

//---------------------------------------😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 ---------------------------------------
//---------------------------------------😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 ---------------------------------------
//---------------------------------------😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 😇 ---------------------------------------


// DELETE METHOD CHECKS ✔️✔️!
    if(req.method === 'DELETE'){

        const {id} = req.query;

    // DELETE!
        await StudentModel.findByIdAndDelete(id);
        res.json({success:true});
        res.end();
    }

}