import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads")
    },

    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' +  uuidv4() + path.extname(file.originalname))
      //eg : file-fieldname-uuid.jpg
      // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  

  //this is multer config for file upload
 export const upload = multer({ storage: storage })
