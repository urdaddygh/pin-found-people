import axios from "axios";
import { getCookie } from "../utils/cookieFunction/cookieFunction";

const access = getCookie("access")

const fetchAPINoToken = axios.create({
    baseURL: "http://172.30.4.27/",
    headers: {
        "Content-type": "application/json",
        // Authorization: `Bearer ${tokenLocal}`,
    },
});

const fetchAPI = axios.create({
    baseURL: "http://172.30.4.27/",
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access}`,
    },
});
export const requests = {
    authApi:(data)=>fetchAPINoToken.post("login/", data),

    getUsers:(data)=>fetchAPI.get("user-profile/", data),
}