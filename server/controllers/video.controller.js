import { wrapAsync } from "../utils/wrapAsync.js";
import ExpressError from "../utils/errorHandler.js";







export const uploadVideo = wrapAsync( async(req , res)=>{

    console.log("file path : " , req.file);


    return res.json({
        message : "suceessfully triggered.."
    })

})


// export const uploadVideo = async(req , res)=>{

//    try {
//      console.log("file path : " , req.file);
 
 
//      return res.json({
//          message : "suceessfully triggered.."
//      })
//    } catch (error) {
//         // Handle the error here
//         console.error("Error:", error); // Logs the error to the console
//         return res.status(502).json({ error: "Internal Server Error" });

    
//    }

// }

