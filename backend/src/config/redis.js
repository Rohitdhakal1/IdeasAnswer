import {createClient} from "redis";

const redisClient = createClient({
    url : "redis://localhost:6379"
})

redisClient.on("error",(error)=>{
     console.log("Redis Error:", error);
})

await redisClient.connect();

console.log("Redis connected");

export default redisClient;