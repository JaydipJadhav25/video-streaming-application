import express from "express";
import cors from "cors";
import ExpressError from "./utils/errorHandler.js";
import videoRouter from "./routes/video.routes.js"


const app = express();
const PORT = 3000;

app.use(cors({
    origin :["http://localhost:3000" , "http://localhost:5173"],
    methods : ["GET" , "POST" , "PUT" , "DELETE"],
    allowedHeaders : ["Content-Type" , "Authorization"],
    credentials : true

}));
app.use((req , res , next)=>{
    res.header("Access-Control-Allow-Origin" , "*");
    res.header("Access-Control-Allow-Headers" , "Origin , X-Requested-With , Content-Type , Accept");
    next();
})
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use("/uploads" , express.static("uploads"));







app.get("/" , (req , res)=>{
    return res.send("<h1>Hello world</h1>")
});

////////////////////////////////////////////////////////////////////
// app.get("/api/:id" , (req , res , next)=>{

//     const {id} = req.params;
//     // abs = adasds;


//    try {
//      if(id === "0"){

//     //   next(new ExpressError("This is a custom error ID 0 !", 400));
//          throw new ExpressError("This is a custom error ID 0 !", 400);
         
//      }

//      return res.status(200).json({message : "ID is 1"});
 
//      //  throw new ExpressError("error is throwusin custom class" , 401)
//      //  next(new ExpressError("This is a custom error!", 400));
//    } catch (error) {
//     next(error); // Pass the error to the next middleware
    
//    }


// });


//use wrapAsync to handle async errors //wirthout try catch block 
// app.get("/api/:id" , wrapAsync(async (req , res)=>{

//     const {id} = req.params;
//     // abs = adasds;


//    if(id === "0"){
//         throw new ExpressError("This is a custom error ID 0 !", 400);
//    }

//    return res.status(200).json({message : "ID is 1"});


// }));
////////////////////////////////////////////////////////////////////




app.use("/video" , videoRouter);


//custom error handler
app.use((err, req, res, next) => {
    console.error("Error handler trigger"); // Logs the error to the console

    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        success: false,
        statusCode : statusCode,
        message: err.message || "Internal Server Error",
    });

    next(err); // Call the next middleware in the stack //trigger expreed defult error handler
});



app.listen(PORT , ()=>{
    console.log("Server is Running on PORT :" , PORT);
})