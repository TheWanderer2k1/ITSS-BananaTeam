const service = require("./service");

exports.createUserComplain = async (req, res)=>{
    let requestedUrl = req.protocol + '://' + req.get('Host') + req.url;
    try {
        const newUserComplain = await service.createUserComplain(req.body, requestedUrl);
        res.status(201).json({
            success: true,
            messages: ["Add success"],
            content: newUserComplain
        })
    } catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            messages: "Add fail",
            content: error.messages
        })
    }
}
exports.getListRequest = async (req, res)=>{
    try{
        const listRequest = await service.getListRequest();
        res.status(201).json(listRequest)
    }catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            messages: "Get fail",
            content: error.messages
        })
    }
}
exports.updateRequest = async (req, res)=>{
    try{
        const newRequest = await service.updateRequest(req.body);
        res.status(201).json(newRequest)
    }catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            messages: "Update fail",
            content: error.messages
        })
    }
}
exports.getComplainById = async (req, res) => {
    try {
        const complain = await service.getComplainById(req.params.id);
        res.status(201).json(complain);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            messages: "Get fail",
            content: error.messages
        })
    }
}

exports.addReply = async (req, res) => {
    try {
        const complain = await service.addReply(req.params.id, req.body);
        res.status(201).json(complain);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            messages: "Add fail",
            content: error.messages
        })
    }
}