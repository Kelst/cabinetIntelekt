import $api from "../http";

export default class AuthService {
    static async login(login,password){
         return $api.post(`/login`,{login,password,provider:"Intelekt"})
    }
    static async loginPhone(phone){
     return $api.post(`/loginPhone`,{phone,provider:"Intelekt"})
}
    
    static async logouth(){
     console.log("UID",localStorage.getItem('uid'));
        return $api.post(`/logout`,{uid:localStorage.getItem('uid')})
   }
}