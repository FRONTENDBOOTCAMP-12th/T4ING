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

export function getUserId() {
  const localStorageToken = localStorage.getItem('authToken');
  const storedToken = localStorageToken
    ? localStorageToken
    : sessionStorage.getItem('authToken');
  return decodeJWT(storedToken).id;
}

export function checkLogin() {
  if (
    !(localStorage.getItem('authToken') || sessionStorage.getItem('authToken'))
  ) {
    location.href = '/src/pages/login/';
  }
}
