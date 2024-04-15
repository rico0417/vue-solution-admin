/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number) => {
  let textStr;
  switch (status) {
    case 400:
      textStr = "请求失败！请您稍后重试";
      break;
    case 401:
      textStr = "登录失效！请您重新登录";
      break;
    case 403:
      textStr = "当前账号无权限访问！";
      break;
    case 404:
      textStr = "你所访问的资源不存在！";
      break;
    case 405:
      textStr = "请求方式错误！请您稍后重试";
      break;
    case 408:
      textStr = "请求超时！请您稍后重试";
      break;
    case 500:
      textStr = "服务异常！";
      break;
    case 502:
      textStr = "网关错误！";
      break;
    case 503:
      textStr = "服务不可用！";
      break;
    case 504:
      textStr = "网关超时！";
      break;
    default:
      textStr = "请求失败！";
      break;
  }
  return textStr;
};
