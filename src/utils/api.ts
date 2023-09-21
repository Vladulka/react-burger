import {getCookie, setCookie} from "./cookie";
import {
    TAuthUser,
    TResetPassword,
    TIngredientsResponse,
    TAuthResponse,
    TOrderDetailsResponse, TRefreshResponse, TLogoutResponse, TChangePasswordResponse, TAuthDataResponse
} from "../types";

const API_URL = "https://norma.nomoreparties.space";
export const API_WS_URL = "wss://norma.nomoreparties.space";

export const getIngredientsData = (): Promise<TIngredientsResponse> => {
    return fetch(`${API_URL}/api/ingredients`)
        .then(checkResponse<TIngredientsResponse>)
        .then(checkSuccess)
        .then((data) => {
            return data;
        });
}

export const getOrderDetailsData = (ingredients: Array<string | undefined>): Promise<TOrderDetailsResponse> => {
    return fetch(`${API_URL}/api/orders`, {
        headers: {
            "Content-Type": "application/json",
            authorization: getCookie('accessToken')
        } as {
            'Content-Type': string;
            authorization?: string | undefined,
        },
        method: 'POST',
        body: JSON.stringify({
            'ingredients': ingredients
        })
    })
        .then(checkResponse<TOrderDetailsResponse>)
        .then(checkSuccess)
        .then((data) => {
            return data.order;
        });
}

export const authUser = ({email, password}: TAuthUser): Promise<TAuthDataResponse> => {
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
        .then(checkResponse<TAuthResponse>)
        .then(checkSuccess)
        .then((data) => {
            setCookie('accessToken', data?.accessToken);
            localStorage.setItem('refreshToken', data?.refreshToken);
            return data;
        })
}

export const forgotPassword = (email: string): Promise<TChangePasswordResponse> => {
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
        .then(checkResponse<TChangePasswordResponse>)
        .then(checkSuccess)
        .then((data) => {
            return data.data;
        })
}

export const resetPassword = ({password, code}: TResetPassword): Promise<TChangePasswordResponse> => {
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
        .then(checkResponse<TChangePasswordResponse>)
        .then(checkSuccess)
        .then((data) => {
            return data.message;
        })
}

export const registerUser = ({name, email, password}: TAuthUser): Promise<TAuthResponse> => {
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
        .then(checkResponse<TAuthResponse>)
        .then(checkSuccess)
        .then((data) => {
            setCookie('accessToken', data?.accessToken);
            localStorage.setItem('refreshToken', data?.refreshToken);
            return data;
        })
}

export const logoutUser = (): Promise<TLogoutResponse> => {
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
        .then(checkResponse<TLogoutResponse>)
        .then(checkSuccess)
        .then((data) => {
            setCookie('accessToken', data?.accessToken);
            return data;
        })
}

export const getUserData = (): Promise<TAuthResponse> => {
    return fetchWithRefresh<TAuthResponse>(`${API_URL}/api/auth/user`,
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

export const updateUserData = ({name, email, password}: TAuthUser): Promise<TAuthResponse> => {
    return fetchWithRefresh<TAuthResponse>(`${API_URL}/api/auth/user`,
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

export const fetchWithRefresh = async <T>(url: string, options: any): Promise<T> => {
    try {
        const res = await fetch(url, options);
        return await checkResponse<T>(res);
    } catch (err: any) {
        if (err.message === 'jwt expired') {
            const refreshData = await refreshToken();
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            setCookie('accessToken', refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return checkResponse<T>(res);
        }
        return Promise.reject(err);
    }
};

const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

export const checkSuccess = (res: any): Promise<any> => {
    if (res && res.success) {
        return res;
    }
    return Promise.reject(`Ответ не success: ${res}`);
};

export const refreshToken = (): Promise<TRefreshResponse> => {
    return fetch(`${API_URL}/api/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    }).then(checkResponse<TRefreshResponse>);
};