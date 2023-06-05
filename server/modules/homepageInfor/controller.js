const service = require("./service");

exports.getDataHomepage = async (req, res) => {
    try {
        const dataHomepage = await service.getDataHomePage();
        res.status(201).json({
            success: true,
            messages: ["Get Data Success"],
            content: dataHomepage
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            messages: ["Add fail"],
            content: error.messages
        })
    }
}