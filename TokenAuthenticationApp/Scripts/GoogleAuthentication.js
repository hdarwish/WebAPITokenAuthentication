/// <reference path="jquery-1.10.2.js" />
function getAccessToken() {
    if(location.hash)
        if (location.hash.split('access_token=')) {
            var accessToken = location.hash.split('access_token=')[1].split('&')[0];
            if(accessToken)
                isUserRegistered(accessToken)
        }
}

function isUserRegistered(accessToken) {
    $.ajax({
        url: '/api/Account/UserInfo',
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (response) {
            if (response.HasRegistered) {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('username', response.Email);
                window.location.href = 'Data.html';
            }
            else {
                signupExternalUser(accessToken, response.LoginProvider);
            }
        }
    });
}

function signupExternalUser(accessToken,provider) {
    $.ajax({
        url: '/api/Account/RegisterExternal',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        success: function () {
            window.location.href = '/api/Account/ExternalLogin?provider=' + provider + '&response_type=token&client_id=self&redirect_uri=http%3A%2F%2Flocalhost%3A8542%2FLogin.html&state=Wka6ai4zPdllf-YP_4VsyBF7RiTW7uD2pVFjKirOtmg1';
        }
    });
}