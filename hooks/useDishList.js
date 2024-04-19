import { useCallback, useState } from "react";

export function useDishList() {
  const [datas, setDatas] = useState();

  const getDishList = (token) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `dish/admin/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDatas(data);
      })
      .catch((error) => console.log(error));
  };

  return {
    datas: datas,
    getDishList: useCallback(getDishList, []),
  };
}
