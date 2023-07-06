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