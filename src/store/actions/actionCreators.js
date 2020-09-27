import * as actionTypes from "./actionTypes";

import {
    login, 
    setLoginInfoInLocalStorage, 
    removeSessionStorage
} from "../../services/userService/loginService";

import {
    getEventByUserId,
    createNewEvent
} from "../../services/eventService/eventService"


export const getEvents= (userId) => {
    return dispatch => {
        let response = getEventByUserId(userId);
        dispatch(setDashboard(response.data));
    };
}

export const setDashboard = (data) => {
    return {
        type : actionTypes.SET_DASHBOARD,
        data : data
    }
}

export const createEvent = (eventName, description, venue, price, discount, userId) => {
    return dispatch => {
        // call api to create new dashboard
        createNewEvent(eventName, description, venue, price, discount, userId);
        dispatch(getEvents(userId));
    };
}

// Login Action Creators
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (userId, userName) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        userName : userName
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = (cb) => {
    removeSessionStorage();
    if (typeof cb === "function") {
        cb();
    }
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (name) => {
    return dispatch => {
        const loginResponse = login(name);
        setLoginInfoInLocalStorage(loginResponse);
        dispatch(authSuccess(loginResponse.data.id, loginResponse.data.name));
        dispatch(checkAuthTimeout(loginResponse.expiresIn));
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                const userName = localStorage.getItem('userName');
                dispatch(authSuccess(userId, userName));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};