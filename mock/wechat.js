const indexData = {
  title: "wechat",
  content: "success",
};
const configData = {
  title: "wechat config",
  content: "success",
};
const index = (req, res) => {
  res.json({
    status: 1,
    data: indexData,
  });
};
const config = (req, res) => {
  res.json({
    status: 1,
    data: configData,
  });
};
module.export = {
  index,
  config,
};
