import express from "express"
import { addService, listService, removeService } from "../controllers/servicecontroller.js"
import multer from "multer"
import fs from "fs"

const serviceRouter = express.Router();

const uploadFolder = "uploads";
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

//image engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const originalName = file.originalname.replace(/\s+/g, "_");
      cb(null, `${timestamp}-${originalName}`);
    }
  });
  


const upload = multer({storage:storage})


serviceRouter.post("/add",upload.single("image"),addService)

serviceRouter.get("/list",listService)

serviceRouter.post("/remove",removeService)

export default serviceRouter;