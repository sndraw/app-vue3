import moment from "moment"; //日期格式化类库

const filters = {
  //日期格式化
  formatDate: (value, formatString) => {
    formatString = formatString || "YYYY-MM-DD HH:mm:ss";
    const todayDate = moment(value).format(formatString);
    return todayDate;
  },
  getCookie: (name, cookie = null) => {
    var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    cookie = cookie ? cookie : document.cookie;
    if ((arr = cookie.match(reg))) return decodeURIComponent(arr[2]);
    else return null;
  },
};
export default filters;
