
import mongoose from 'mongoose';

export function mongooseConnect() {
    const uri = "mongodb+srv://muhammadawaismumtaz786:778677867786a..@cluster0.s1vlak3.mongodb.net/";
    if(mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    }else{
        return mongoose.connect(uri);
    }
}

