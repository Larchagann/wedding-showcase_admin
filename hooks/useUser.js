import { useSessionStorage } from "usehooks-ts";

export function useUser() {
  const [user, setUser] = useSessionStorage("user", null);
  const [token, setToken] = useSessionStorage("token", null);

  const connectUser = (addressMail) => {
    fetch(process.env.NEXT_PUBLIC_API_URL + `auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mailAddress: addressMail }),
    })
      .then((response) => response.json())
      .then((data) => {
        setToken(data.access_token);
        setUser(data.invitation);
        setTimeout(() => {
          console.log("LOGOUT");
          logout();
        }, 3600000);
      })
      .catch((error) => console.log(error));
  };

  const putUser = async () => {
    return await fetch(
      process.env.NEXT_PUBLIC_API_URL + `invitation/${user.idInvitation}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          ...user,
          isAnswered: true,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return {
    user: user,
    token: token,
    connect: connectUser,
    logout: logout,
    updateUser: putUser,
  };
}
