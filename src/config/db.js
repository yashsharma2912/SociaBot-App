import mongoose from "mongoose";



export default () => {
    return mongoose.connect(process.env.mongo_string)
}