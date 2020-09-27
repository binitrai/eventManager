import {
    getExpDate, 
    returnData,
    __setUpdate
} from "../util";
import i18 from "../i18.services";
import createUser from "./userModal";

import * as DBCONSTANTS from "../constants";

const login = (name) => {
    let user = getUserByName(name);
    if (user.status === false) {
       user = createNewUser(name);
    }
    return {
        success : true,
        data : user.data,
        expiresIn : 3600
    }
}

const setLoginInfoInLocalStorage = (data) => {
    localStorage.setItem('token', data.data.id);
    localStorage.setItem('expirationDate', getExpDate(data.expiresIn));
    localStorage.setItem('userId', data.data.id);
    localStorage.setItem('userName', data.data.name);
}

const removeSessionStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
}

const getUserByName = (name) => {
    let userData = localStorage.getItem(DBCONSTANTS.USER_DATA);
    if (!userData) {
        return returnData(false, null, i18.NOT_FOUND);
    } else {
        userData =  JSON.parse(userData);
        let data = userData.filter(item => item.name === name);
        if (data.length) {
            return returnData(true, data[0]);
        } else {
            return returnData(false, null, i18.NOT_FOUND);
        }
    }
}

const createNewUser = (name) =>  {
    let user = createUser(name);
    __setUpdate(DBCONSTANTS.USER_DATA, user);
    return returnData(true, user);
}

const getUserById = (id) => {
    let userData = localStorage.getItem(DBCONSTANTS.USER_DATA);
    if (!userData) {
        return null;
    } else {
        userData =  JSON.parse(userData);
        let data = userData.filter(item => item.id === id);
        if (data.length) {
            return data[0];
        } else {
            return null;
        }
    }
} 

export {
    login,
    setLoginInfoInLocalStorage,
    removeSessionStorage,
    getUserById
}