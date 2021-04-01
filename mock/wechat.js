const indexData = {
  title: "wechat",
  content: "success",
};
const configData = {
  appId: "wx722fb8f52823f937",
  timestamp: "1616641250",
  nonceStr: "0aQg7H6nRTQJEsPs",
  signature: "d7402c4d902e3fca3b7867c2647218873cbff700",
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
module.exports = {
  index,
  config,
};
