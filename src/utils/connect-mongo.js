import { connect } from "mongoose";

export async function connectMongo(){
    try {
        await connect(
            "mongodb+srv://aleexrodriguez93:0wjxKmx2n6PmeBZl@backend-course-cluster.663woxo.mongodb.net/e-commerce?retryWrites=true&w=majority"
        );
        console.log('plug to mongo!')
    }catch(e){
        console.log(e);
        throw "can not connect to the db";
    }
}