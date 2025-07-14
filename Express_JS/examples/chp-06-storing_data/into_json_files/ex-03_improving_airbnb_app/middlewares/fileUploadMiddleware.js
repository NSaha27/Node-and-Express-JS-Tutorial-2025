import multer from "multer";
import path from "node:path";

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "public/uploads");
  },
  filename: function(req, file, cb){
    const uniqueSuffix = Date.now();
    const fileExtension = path.extname(file.originalname);
    const fileName = file.originalname.replace(fileExtension, "");
    cb(null, fileName + "_" + uniqueSuffix + fileExtension);
  }
})

const upload = multer({storage: storage});

const uploadFields = upload.fields([{name: "buildingImages", maxCount: 8}]);

export default uploadFields;