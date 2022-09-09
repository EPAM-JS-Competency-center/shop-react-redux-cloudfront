export const getToken = () => {
    console.log(window.location);
    const hash = window.location.hash.replace('#','');
    const data = new URLSearchParams(hash);
    const token = data.get('id_token');
    const type = data.get('token_type');

    localStorage.setItem('token', `${type} ${token}`);
}

export const setBasic = () => {
    localStorage.setItem('Basic', 'Basic bWFuZ3VpYW5vZXBhbT1URVNUX1BBU1NXT1JE')
}