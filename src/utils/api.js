const API_URL = "https://norma.nomoreparties.space";

export const getIngredientsData = (appState, setAppState) => {
    fetch(`${API_URL}/api/ingredients`)
        .then(response => response.ok ? response.json() : response.json().then((err) => Promise.reject(err)))
        .then(response => {
            setAppState({...appState, data: response.data})
        })
        .catch(e => {
            console.log(e);
        })
        .finally(setAppState({...appState, isLoading: false}));

}
