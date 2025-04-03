import {Router} from "express";
import { upload } from "../middleware/multer.js";
import { uploadVideo } from "../controllers/video.controller.js";

const router = Router();



router.get("/", (req ,res)=>{
    return res.send("this is video route !");
})


router.post("/upload" ,upload.single("file") , uploadVideo );
// router.post("/upload" ,upload.fields([{ name: "file1" }, { name: "file2" }]), uploadVideo );


export default router;