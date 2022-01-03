import axios from "./axiosInstance"

export const GetRequest = async (Params, url) => {
    let responseData = await axios.get(url, {params: Params})
    return responseData
}