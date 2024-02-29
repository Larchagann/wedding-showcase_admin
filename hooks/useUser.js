import { useSessionStorage } from "usehooks-ts";

export function useUser() {
  const [token, setToken] = useSessionStorage("token", null);

  const connectUser = (loginInfo) => {
    fetch(process.env.NEXT_PUBLIC_API_URL + `auth-admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        setToken(data.access_token);
        setTimeout(() => {
          console.log("LOGOUT");
          logout();
        }, 86400000);
      })
      .catch((error) => console.log(error));
  };

  const logout = () => {
    setToken(null);
  };

  return {
    token: token,
    connect: connectUser,
    logout: logout,
  };
}
