const IsLogIn = () => !!localStorage.getItem('access_token');
export default IsLogIn;