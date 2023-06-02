const User = require("../models/Users");
const Job = require('../models/Jobs');

const createJob = async(req,res)=>{
    const userId = req.user.userId;
    const user = await User.findById(userId);
    const postedBy = user.firstName;

    if(user.WorkingProf){
        try{
            const {title,company,location,description,duration,salary,requirements,deadline} = req.body
            const newJob = await Job.create({
                userId,
                postedBy,
                title,
                company,
                location,
                description,
                duration,
                salary,
                requirements,
                deadline
            });
            res.status(201).json({newJob});
        }
        catch (err){
            res.status(409).json({error: err.message});
        }
    }
    else res.status(404).json({msg: "user should work in organisation"});
}

const allJobs = async (req,res)=>{
    try{
        const jobPost = await Job.find();
        res.status(200).json(jobPost);
    }
    catch(err){
        res.status(404).json({error: err.message});
    }
}
const deleteJob = async (req,res)=>{
    const userId = req.user.userId;
    const jobId= req.params.id;
    try {
        let job = await Job.findById(jobId);

        if (!job) { return res.status(404).send("Not Found") }

        if (job.userId.toString() !== userId) {
            return res.status(401).send("Not Allowed");
        }
        job = await Job.findByIdAndDelete(jobId);
        res.json({Succes:"job post has been deleted"});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json().send("some internal server error occured");
    }
}

module.exports = {createJob,allJobs,deleteJob}