const homePage = (req, res, next) => {
  return res.render('index');
};

const diagramPage = (req, res, next) => {
  return res.render('diagram');
};

const userPage = (req, res, next) => {
  return res.render('user');
};

const questionPage = (req, res, next) => {
  return res.render('question');
};

const answerPage = (req, res, next) => {
  return res.render('answer');
};

module.exports = {
  homePage,
  diagramPage,
  userPage,
  questionPage,
  answerPage,
};
