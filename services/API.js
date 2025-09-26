import axios from "axios";

const getData = async (url) => {
 try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    alert('Network or server error, please try again later.');
  }
};

const postData = async (url,data={})=>{
        try {
        const response = await axios.post(url, data,{
  headers: {
    'Content-Type': 'application/json',
    // other headers...
  }});
        return response.data;
    } catch (error) {
        alert('Network or server error, please try again later.');
    }
}
export default {
    getData,postData
}