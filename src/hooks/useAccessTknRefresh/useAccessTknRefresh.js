import { useNavigate } from "react-router-dom"
import $ from "jquery"

const Logout = () => {
    const navigate = useNavigate();
    $.ajax({
        async: true, type: 'POST',
        url: "https://api.odoc-api.com/rest_auth/logout/",
        data: { "refresh": sessionStorage.getItem("refresh_token") }, 
        dataType: 'JSON',
        success: function (response) {
            console.log(response);
            sessionStorage.removeItem("access_token");
            sessionStorage.removeItem("refresh_token");
            sessionStorage.removeItem("user_pk");
            navigate("/login")
        },
        error: (response) => console.log(response),
    });
}

const useAccessTknRefresh = () => {
    let result;
    $.ajax({
        async: false, type: 'POST',
        url: "https://api.odoc-api.com/api/token/refresh/",
        data: { "refresh": sessionStorage.getItem("refresh_token") },
        dataType: "json",
        success: (response) => result = response.access,
        error: function (response) {
            console.log(response)
            alert("토큰이 만료되었습니다. 다시 로그인해 주세요")
            Logout();
        }
    });
    return result
}

export default useAccessTknRefresh;