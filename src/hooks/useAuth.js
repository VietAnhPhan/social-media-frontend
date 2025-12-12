import { useEffect, useState } from "react";
import useToken from "./useToken";
import useAPI from "./useAPI";

export default function useAuth() {
  const token = useToken();
  const apis = useAPI(token);

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!apis) {
      return;
    }
    async function fetchData() {
      const user = await apis.user.getUser();
      setUser(user);
    }
    fetchData();
  });

  return user;
}
