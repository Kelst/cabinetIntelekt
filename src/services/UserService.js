import $api from "../http";

export default class UserService {
    static async checkUser() {
        const response = await $api.get('/checkUser')
        console.log(response);
        if (response.status == '200') {
            return response.data.isAuth
        } else {
            return false
        }
    }

    static async fetchUsers(uid) {
        try {
            const response = await $api.get(`http://194.8.147.150:5000/api/getDataUid?uid=${uid}&provider=${'Intelekt'}`);
            const responseTariff = await $api.get(`http://194.8.147.150:5000/api/getListTariffAvaible?uid=${uid}`);
            console.log(response.data);
            const result={...response.data,subLogin:[...response.data.subLogin],...responseTariff.data}
            return result;
        } catch (error) {
            console.error('Помилка при отриманні даних користувача:', error);
            throw error;
        }
    }
}
