import cookies from "react-cookies";
import $ from "jquery";

const useCookieToRefresh = () => {
    let result;
    $.ajax({
        async: false, type: 'POST',
        url: "https://dev.odoc-api.com/member/auth/refresh/",
        data: { "refresh": cookies.load("refresh_token") },
        dataType: "json",
        success: (response) => {
            result = response.access;
            sessionStorage.setItem("access_token", result);
            sessionStorage.setItem("refresh_token", cookies.load("refresh_token"));
            sessionStorage.setItem("user_pk", localStorage.getItem("user_pk")); // change after
        },
        error: function (response) {
            console.log(response);
            result = "error";
            cookies.remove("refresh_token");
            cookies.remove("access_token");
        }
    });
    return result;
};

export default useCookieToRefresh;
