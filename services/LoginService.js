import ENDPOINT from './ENDPOINT';
import API from './API';

const LoginService = {

login: async (data)=> {await API.postData(ENDPOINT.loginURL,data);}

}
export default LoginService;