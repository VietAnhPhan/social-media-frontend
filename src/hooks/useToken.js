export default function useToken() {
  function getToken() {
    const access = JSON.parse(localStorage.getItem("myinterests_app_access"));
    return access ? access.token : "";
  }
  return getToken();
}
