const homePage = (req, res, next) => {
  return res.render('index');
};

const diagramPage = (req, res, next) => {
  return res.render('diagram');
};

module.exports = {
  homePage,
  diagramPage,
};
