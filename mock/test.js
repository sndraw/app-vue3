const indexData = {
  title: "test",
  content: "Test content",
};
const index = (req, res) => {
  res.json({
    status: 1,
    data: indexData,
  });
};
module.exports = {
  index,
};
