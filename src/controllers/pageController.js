const homePage = (req, res, next) => {
  return res.render('index');
};

const diagramPage = (req, res, next) => {
  return res.render('diagram');
};

const userPage = (req, res, next) => {
  return res.render('user');
};

module.exports = {
  homePage,
  diagramPage,
  userPage,
};
