import axios from "axios";

const tokenLocal = localStorage.getItem("token")

const fetchAPI = axios.create({
    baseURL: "",
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokenLocal}`,
    },
});

export const requests = {

}