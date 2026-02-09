import jwt from "jsonwebtoken";

const authMiddleware = (req,res,next) =>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"not authorized"});
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        // res is object look like inside 
        //req = {  body: {}, params: {},headers: {}, cookies: {},}
        //It is mutable.
        // You can add new properties to it. ex- req.abc = 123; or req.anything = { test: true };

        req.user = {id:decoded.userId}; // create new object now it like  //req ={body: {}, params: {},headers: {}, cookies: {},user:{id: "6988b0b0233d1c454ad02bb7"}}

        next();

    } catch (error) {
        return res.status(401).json({message:"invalid token"});
    }

};

export default authMiddleware;

