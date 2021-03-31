const indexData = {
  title: "home",
  content: "home content",
};
const index = (req, res) => {
  res.json({
    status: 1,
    data: indexData,
  });
};

module.export = {
  index,
};
