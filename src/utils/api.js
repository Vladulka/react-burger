import {getCookie, setCookie} from "./cookie";

const API_URL = "https://norma.nomoreparties.space";

export const getIngredientsData = () => {
    return fetch(`${API_URL}/api/ingredients`)
        .then(response => response.ok ? response.json() : response.json().then((err) => Promise.reject(err)))
        .then((data) => {
            if (data?.success) return data.data;
            return Promise.reject(data);
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
        .then(response => response.ok ? response.json() : response.json().then((err) => Promise.reject(err)))
        .then((data) => {
            if (data?.success) return data;
            return Promise.reject(data);
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
        .then(response => response.ok ? response.json() : response.json().then((err) => Promise.reject(err)))
        .then((data) => {
            if (data?.success) {
                setCookie('accessToken', data?.accessToken);
                localStorage.setItem('refreshToken', data?.refreshToken);
                return data.data;
            }
            return Promise.reject(data);
        })
        .catch(e => {
            alert(e.message);
        });
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
        .then(response => response.ok ? response.json() : response.json().then((err) => Promise.reject(err)))
        .then((data) => {
            if (data?.success) {
                return data.data;
            }
            return Promise.reject(data);
        })
        .catch(e => {
            alert(e.message);
        });
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
        .then(response => response.ok ? response.json() : response.json().then((err) => Promise.reject(err)))
        .then((data) => {
            if (data?.success) {
                return data.message;
            }
            return Promise.reject(data);
        })
        .catch(e => {
            alert(e.message);
        });
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
        .then(response => response.ok ? response.json() : response.json().then((err) => Promise.reject(err)))
        .then((data) => {
            if (data?.success) {
                setCookie('accessToken', data?.accessToken);
                localStorage.setItem('refreshToken', data?.refreshToken);
                return data;
            }
            return Promise.reject(data);
        })
        .catch(e => {
            alert(e.message);
        });
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
        .then(response => response.ok ? response.json() : response.json().then((err) => Promise.reject(err)))
        .then((data) => {
            if (data?.success) {
                setCookie('accessToken', data?.accessToken);
                return data;
            }
            return Promise.reject(data);
        })
        .catch(e => {
            alert(e.message);
        });
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
        .then((data) => {
            if (data?.success) {
                return data?.user;
            }
            return Promise.reject(data);
        })
        .catch(e => {
            alert(e.message);
        });
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
        .catch(e => {
            alert(e.message);
        });
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

export const checkResponse = (response) => {
    return response.ok
        ? response.json()
        : response.json().then((error) => Promise.reject(error));
};

export const refreshToken = () => {
    console.log(localStorage.getItem('refreshToken'))
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