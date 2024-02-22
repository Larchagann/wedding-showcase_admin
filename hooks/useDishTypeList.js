import { useCallback, useState } from "react";

export function useDishTypeList() {
  const [dishTypeList, setDishTypeList] = useState(null);

  const getDishTypeList = (token) => {
    fetch(process.env.NEXT_PUBLIC_API_URL + `dish-type/admin/all`, {
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

  const postDishType = async (newData, token) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + `dish-type/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        const oldDatas = dishTypeList;
        oldDatas.push(data);
        setDishTypeList(oldDatas);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  const deleteDishType = async (deleteData, token) => {
    return await fetch(
      process.env.NEXT_PUBLIC_API_URL +
        `dish-type/admin/${deleteData.idDishType}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  const delDishType = async (deleteData, token) => {
    const oldDatas = dishTypeList;
    const isDelete = await deleteDishType(deleteData, token);
    if (isDelete == true)
      oldDatas.filter((elmt) => elmt.idDishType != deleteData.idDishType);
    setDishTypeList(oldDatas);
  };

  return {
    datas: dishTypeList,
    getDishTypeList: useCallback(getDishTypeList, []),
    createDishType: postDishType,
    deleteDishType: delDishType,
  };
}
