class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword ?
        {
            name:{
                $regex: this.queryStr.keyword,
                $options: "i"
            },
        } :
        {} ;

        this.query = this.query.find({...keyword});
        return this;
    } 
    filter() {
        const queryCopy = {...this.queryStr};
        //removing some field for filter
        const removeFields = ['keyword', 'page', 'limit']

        removeFields.forEach((key) => delete queryCopy[key]);

        //Filter for price and rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)

        this.query = this.query.find(JSON.parse(queryStr))


        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        //resultPerPage = 10 currentpage = 2 then (2-1 = 1) and 1 * 10 == 10 so skip first 10 product
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures