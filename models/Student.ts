
import mongoose,{Document, Model} from 'mongoose';
import { Types } from 'mongoose';

export interface StudentInterface {
    _id: Types.ObjectId,
    authorID: String,
    name: String,
    gender: String,
    DOB: Date,
    city: String,
    image:String;
    groups: String[];
    _v:Number;
}

// CREATING INTERFACE CLASS THAT EXTENDS OR HAVING PROPS. OF BOTH INTERFACE/DOCUMENT INIT FURTHER TELLING MODEL TO HAVE SOME TYPES!!;
// interface StudentDocument extends StudentInterface, Document { };
// interface StudentModel extends Model<StudentDocument> { }

// SCHEMA MODEL FOR STUDENT!
const studentSchema = new mongoose.Schema({

    authorID: mongoose.Schema.Types.ObjectId,
    name: {type:String, required:true},
    gender: {type:String, required:true},
    DOB: {type:Date, required:true},
    city: {type:String, required:true},
    groups: {type:[String],required:true},
    image:{type:String,required:true}

});

// CHECKS IF MODEL ALREADY EXISTS OR NEEDS NEW ONE!
// export const StudentModel = mongoose.models.Student || mongoose.model<StudentDocument>("Student" , studentSchema);
export const StudentModel = mongoose.models.Student || mongoose.model('Student',studentSchema);
