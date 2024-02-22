import { useCallback, useState } from "react";

export function useDishTypeList() {
  const [dishTypeList, setDishTypeList] = useState(null);

  const getDishTypeList = (token) => {
    fetch(process.env.NEXT_PUBLIC_API_URL + `dish-type`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDishTypeList(data);
      })
      .catch((error) => console.log(error));
  };

  return {
    datas: dishTypeList,
    getDishTypeList: useCallback(getDishTypeList, []),
  };
}
