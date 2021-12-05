const asyncErrorHandler = require('express-async-handler');
const queryHelpers = require('./queryHelpers');

const questionQuery = function (model, options) {
  return asyncErrorHandler(async function (req, res, next) {
    // inital query
    let query = model.find();

    // search
    query = queryHelpers.searchQuery('title', query, req);

    // population
    if (options && options.population) {
      query = queryHelpers.populateQuery(query, options.population);
    }

    // sort
    query = queryHelpers.questionSortQuery(query, req);

    // pagination

    const paginationResult = await queryHelpers.paginationQuery(
      model,
      query,
      req
    );

    query = paginationResult.query;
    const pagination = paginationResult.pagination;

    const queryResults = await query;

    res.queryResults = {
      success: true,
      count: queryResults.length,
      pagination,
      data: queryResults,
    };

    next();
  });
};

module.exports = questionQuery;
