import axios from "axios";
import * as Config from "./../constants/config";

export default function callApi_V2(endpoint, method = "GET", body) {
  return axios({
    method: method,
    url: `${Config.API_URL_V2}/${endpoint}`,
    data: body,
  }).catch((err) => {
    console.log(err);
  });
}
