import { useCallback, useState } from "react";

export function useGuestList() {
  const [datas, setDatas] = useState(null);

  const getGuestList = (idInvitation, token) => {
    fetch(
      process.env.NEXT_PUBLIC_API_URL +
        `guest/all?idInvitation=${idInvitation}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setDatas(data);
      })
      .catch((error) => console.log(error));
  };

  const putGuest = async (guest, token) => {
    return await fetch(
      process.env.NEXT_PUBLIC_API_URL + `guest/${guest.idGuest}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          lastName: guest.lastName,
          firstName: guest.firstName,
          isChild: guest.isChild,
          isMainGuest: guest.isMainGuest,
          isNeedAccomodation: guest.isNeedAccomodation,
          isPresent: guest.isPresent,
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

  const updateGuestList = async (guestList, token) => {
    const oldData = datas;
    for (let guest of guestList) {
      const newData = await putGuest(guest, token);
      if (newData != false)
        oldData.map((item) => {
          if (item.idGuest == guest.idGuest) return newData;
          else return item;
        });
    }
    setDatas(oldData);
  };

  return {
    datas: datas,
    getGuestList: useCallback(getGuestList, []),
    updateGuestList: updateGuestList,
  };
}
