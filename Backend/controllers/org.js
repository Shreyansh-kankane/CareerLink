const {Organization} = require('../models/Organisation');
const getOrg = async (req,res)=>{
    try{
        const allOrg = await Organization.find();
        res.status(200).json(allOrg);
    }
    catch(err){
        res.status(404).json({error: err.message});
    }
}

module.exports = {getOrg};