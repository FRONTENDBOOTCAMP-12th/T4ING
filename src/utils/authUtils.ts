function decodeJWT(token: any) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

function getToken() {
  return (
    localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
  );
}

export const defaultHeaders = {
  'Content-Type': 'application/json',
};

export function getUserId() {
  return decodeJWT(getToken()).id;
}

export function getTokenHeader() {
  return {
    ...defaultHeaders,
    Authorization: getToken(),
  };
}

export function isLogin() {
  return !!getToken();
}

export function checkLogin() {
  if (!isLogin()) {
    location.href = '/src/pages/login/';
  }
}
