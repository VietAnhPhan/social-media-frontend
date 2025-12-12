export default function useUsername() {
  const authStorage = JSON.parse(
    localStorage.getItem("myinterests_app_access")
  );

  return authStorage.username ? authStorage.username : "";
}
