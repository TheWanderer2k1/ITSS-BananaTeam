const CategoryService = require('./category.service');

exports.getCategories = async (req, res) => {
    try {
    
        let categoryList = await CategoryService.getCategories();

        res.status(200).json({
            success: true,
            messages: 'Get food category success',
            content: {listCategory:categoryList}
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: 'something went wrong',
            content: error
        })
    }
}