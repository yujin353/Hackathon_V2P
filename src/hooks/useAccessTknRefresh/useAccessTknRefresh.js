import cookies from "react-cookies";
import { useCookieToRefresh, useLogout } from "../";
import $ from "jquery";

const useAccessTknRefresh = () => {
    let result;
    $.ajax({
        async: false, type: 'POST',
        url: "https://dev.odoc-api.com/member/auth/refresh/",
        data: { "refresh": sessionStorage.getItem("refresh_token") },
        dataType: "json",
        success: (response) => result = response.access,
        error: function (response) {
            console.log('Expires session. Use cookies?', response);
            if (cookies.load("refresh_token")) {
                const cookieToRefresh = useCookieToRefresh;
                result = cookieToRefresh();
                if (result === "error") {
                    alert("다시 로그인해주세요");
                    const logout = useLogout;
                    logout();
                }
                sessionStorage.setItem("access_token", response.token.access);
                sessionStorage.setItem("refresh_token", cookies.load("refresh_token"));
                sessionStorage.setItem("user_pk", localStorage.getItem("user_pk")); //change after
            }
            else {
                alert("다시 로그인해 주세요");
                const logout = useLogout;
                logout();
            }
        }
    });
    return result;
};

export default useAccessTknRefresh;
