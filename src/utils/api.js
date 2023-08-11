import {getCookie, setCookie} from "./cookie";

const API_URL = "https://norma.nomoreparties.space";

export const getIngredientsData = () => {
    return fetch(`${API_URL}/api/ingredients`)
        .then(checkResponse)
        .then(checkSuccess)
        .then((data) => {
            return data.data
        });
}

export const getOrderDetailsData = (ingredients) => {
    return fetch(`${API_URL}/api/orders`, {
        method: "post",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "ingredients": ingredients
        })
    })
        .then(checkResponse)
        .then(checkSuccess)
        .then((data) => {
            return data;
        });
}

export const authUser = ({email, password}) => {
    return fetch(`${API_URL}/api/auth/login`,
        {
            method: "post",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        .then(checkResponse)
        .then(checkSuccess)
        .then((data) => {
            setCookie('accessToken', data?.accessToken);
            localStorage.setItem('refreshToken', data?.refreshToken);
            return data.data;
        })
}

export const forgotPassword = (email) => {
    return fetch(`${API_URL}/api/password-reset`,
        {
            method: "post",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "email": email,
            })
        })
        .then(checkResponse)
        .then(checkSuccess)
        .then((data) => {
            return data.data;
        })
}

export const resetPassword = ({password, code}) => {
    return fetch(`${API_URL}/api/password-reset/reset`,
        {
            method: "post",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "password": password,
                "token": code
            })
        })
        .then(checkResponse)
        .then(checkSuccess)
        .then((data) => {
            return data.message;
        })
}

export const registerUser = ({name, email, password}) => {
    return fetch(`${API_URL}/api/auth/register`,
        {
            method: "post",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password
            })
        })
        .then(checkResponse)
        .then(checkSuccess)
        .then((data) => {
            setCookie('accessToken', data?.accessToken);
            localStorage.setItem('refreshToken', data?.refreshToken);
            return data;
        })
}

export const logoutUser = () => {
    return fetch(`${API_URL}/api/auth/logout`,
        {
            method: "post",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "token": localStorage.getItem('refreshToken'),
            })
        })
        .then(checkResponse)
        .then(checkSuccess)
        .then((data) => {
            setCookie('accessToken', data?.accessToken);
            return data;
        })
}

export const getUserData = () => {
    return fetchWithRefresh(`${API_URL}/api/auth/user`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                authorization: getCookie('accessToken'),
            },
        })
        .then(checkSuccess)
        .then((data) => {
            return data?.user;
        })
}

export const updateUserData = ({name, email, password}) => {
    return fetchWithRefresh(`${API_URL}/api/auth/user`,
        {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                authorization: getCookie('accessToken'),
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password
            })
        })
        .then((data) => {
            if (data?.success) {
                return data;
            }
            return Promise.reject(data);
        })
}

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === 'jwt expired') {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            setCookie('accessToken', refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return checkResponse(res);
        }
        return Promise.reject(err);
    }
};

const request = (endpoint, options) => {
    return fetch(`${API_URL}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess);
};

export const checkResponse = (response) => {
    return response.ok
        ? response.json()
        : response.json().then((error) => Promise.reject(error));
};

export const checkSuccess = (res) => {
    if (res && res.success) {
        return res;
    }

    return Promise.reject(`Ответ не success: ${res}`);
};

export const refreshToken = () => {
    return fetch(`${API_URL}/api/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    }).then(checkResponse);
};