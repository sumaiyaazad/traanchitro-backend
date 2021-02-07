const Organization=require('../models/organization')

exports.postRegister=async(req,res,next)=>{
    try{
        console.log("postRegister req.body: ",req.body);
        let duplicate=await Organization.findOne({orgName:req.body.orgName});
        if(duplicate){
            return res.status(400).send({message:"Sorry! This organization has already registered."})
        }
        let organization=new Organization({...req.body});
        let newOrganization=await organization.save();
        return res.status(200).send();
    }catch(e){
        console.log("postRegister error: ", e);
        return res.status(500).send({message: "Sorry! Database Error"})
    }
}
exports.getOrgs=async(req,res,next)=>{
    try{
       let orgNamesObject=await Organization.find({},'orgName -_id');
       let orgNames=[];
       orgNamesObject.forEach(e=>orgNames.push(e.orgName));
       res.status(200).send({orgNames:[...orgNames]});
    }catch(e){
        console.log("getOrgs error: ", e);
        res.status(500).send({message: "Sorry! Database Error"});
    }
}
// exports.patchOrgdetails=async(req,res,next)=>{
//     try{
//         console.log("patchOrgdetails req.body: ",req.body);
//         let org=await Organization.findOne({orgName:req.body.orgName});
//         if(!org){
//             return res.status(400).send({message:"This organization is not registered yet."})
//         }
//         await Organization.updateOne({orgName:req.body.orgName},{...req.body});
//         res.status(200).send();
//     }catch(e){
//         console.log("patchOrgdetails error: ", e);
//         res.status(500).send({message: "Sorry! Database Error"});
//     }
// }