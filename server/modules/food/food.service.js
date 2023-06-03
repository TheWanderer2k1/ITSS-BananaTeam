const mysql = require('mysql')

exports.getExamples = async (keyword, page=null, pageSize=null) => {
    let page, perPage;
    page = data?.page ? Number(data.page) : 1;
    perPage = data?.perPage ? Number(data.perPage) : 20;

    let totalList = await Example(connect(DB_CONNECTION, portal)).countDocuments(keySearch);
    let examples = await Example(connect(DB_CONNECTION, portal)).find(keySearch)
        .skip((page - 1) * perPage)
        .limit(perPage);

    return { 
        data: examples, 
        totalList 
    }
}
