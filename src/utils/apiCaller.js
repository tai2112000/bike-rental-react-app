import axios from "axios";
import * as Config from "./../constants/config";

export default function callApi(endpoint, method = "GET", body) {
  return axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    data: body,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).catch((err) => {
    console.log(err);
  });
}
