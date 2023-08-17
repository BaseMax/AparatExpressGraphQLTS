import { mkdirp } from "mkdirp";
import multer from "multer";
import path from 'path';


const videoFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(mp4|avi|mkv)$/)) {
      return cb(new Error('Only video files are allowed!'), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      mkdirp('./public/uploads/').then(made=>{
          cb(null, './public/uploads/');
      })
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname )
    }
});
  
const upload = multer({ 
  storage: storage  , 
  fileFilter : videoFilter , 
});
  

export {upload} 