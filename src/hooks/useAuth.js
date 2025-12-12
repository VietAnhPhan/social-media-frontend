import { useEffect, useState } from "react";
import useToken from "./useToken";
import useAPI from "./useAPI";
import useUsername from "./useUsername";

export default function useAuth() {
  const token = useToken();
  const apis = useAPI(token);
  const username = useUsername();

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token === "") {
      return;
    }
    async function fetchData() {
      const user = await apis.user.getUser(username);
      setUser(user);
    }
    fetchData();
  }, []);

  return user;
}
