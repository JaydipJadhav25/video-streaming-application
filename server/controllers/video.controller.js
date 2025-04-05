import { wrapAsync } from "../utils/wrapAsync.js";
import ExpressError from "../utils/errorHandler.js";
import { v4 as uuid} from "uuid"
import fs from "fs"
import path from "path";
import { exec } from "child_process";
import { error } from "console";
import { stderr, stdout } from "process";





export const uploadVideo = wrapAsync( async(req , res)=>{
      
    const lessonId = uuid();
    const videoPath = req.file.path;
    const outputPath = `./uploads/courses/${lessonId}`//this is floder path
    const hlsPath = `${outputPath}/index.m3u8` //this is index file

    console.log("hlsPath : ", hlsPath);

    if(!fs.existsSync(outputPath)){
        //create 
        fs.mkdirSync(outputPath , {recursive: true});
        
    }

    //ffmpeg

    const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`;
    console.log("ffmpegCommand : ", ffmpegCommand);

    exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) {
          console.log(`exec error: ${error}`)
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        const videoUrl = `http://localhost:3000/uploads/courses/${lessonId}/index.m3u8`;
    
       return res.json({
          message: "Video converted to HLS format",
          videoUrl: videoUrl,
          lessonId: lessonId
        })
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

