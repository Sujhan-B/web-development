import serviceModel from "../models/servicemodel.js";
import fs from "fs";

const addService = async (req, res) => {
    
    const image_filename = req.file.filename;

    const service = new serviceModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    });

    try {
        await service.save();
        res.json({ success: true, message: "Service added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error adding service" });
    }
};

const listService = async (req,res)=>{
    try {
        const services = await serviceModel.find({});
        res.json({success: true , data: services});
        
    } catch (error) {
        console.log(error);
        res.json({success: false , message : "error"})
    }  
}

const removeService = async (req,res)=>{
    try {
        const service = await serviceModel.findById(req.body.id);
        
        if (service.image) {
            const imagePath = `uploads/${service.image}`;
            fs.unlink(imagePath, (err) => {
                if (err) console.error("Image deletion error:", err);
            });
        }

        await serviceModel.findByIdAndDelete(req.body.id)

        res.json({success:true , message:"service deleted"})
    } catch (error) {
        console.log(error);
        res.json({success: false , message : "error", id : req.body.id})
    }
}

export { addService, listService , removeService};