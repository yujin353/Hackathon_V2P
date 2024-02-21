import cookies from "react-cookies";
import $ from "jquery";

const useLogout = () => {
    // 임시
    // $.ajax({
    //     async: true, type: 'POST',
    //     url: "https://api.odoc-api.com/rest_auth/logout/",
    //     data: { "refresh": sessionStorage.getItem("refresh_token") },
    //     dataType: 'JSON',
    //     success: function (response) {
    //         sessionStorage.removeItem("access_token");
    //         sessionStorage.removeItem("refresh_token");
    //         sessionStorage.removeItem("user_pk");
    //         cookies.remove("access_token");
    //         cookies.remove("refresh_token");
    //         localStorage.removeItem("user_pk");
    //         navigate("/login");
    //     },
    //     error: (response) => {
    //         console.log(response);
    //         navigate("/login");
    //     },
    // });
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("user_pk");
    cookies.remove("access_token");
    cookies.remove("refresh_token");
    localStorage.removeItem("user_pk");
    window.location.replace('/login');
};

export default useLogout;
