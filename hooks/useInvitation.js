import { useCallback, useState } from "react";

export function useInvitation() {
  const [datas, setDatas] = useState(null);

  //Invitation
  const getInvitationList = (token) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `invitation/admin/all`, {
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

  const postInvitation = async (newData, token) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + `invitation/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  };

  const putInvitation = async (newData, token) => {
    return await fetch(
      process.env.NEXT_PUBLIC_API_URL +
        `invitation/admin/${newData.idInvitation}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(newData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  };

  const deleteInvitation = async (deleteData, token) => {
    return await fetch(
      process.env.NEXT_PUBLIC_API_URL +
        `invitation/admin/${deleteData.idInvitation}`,
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

  //Guest
  const postGuest = async (newData, token) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + `guest/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  };

  const putGuest = async (newData, token) => {
    return await fetch(
      process.env.NEXT_PUBLIC_API_URL + `guest/admin/${newData.idGuest}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(newData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  };

  const deleteGuest = async (deleteData, token) => {
    return await fetch(
      process.env.NEXT_PUBLIC_API_URL + `guest/admin/${deleteData.idGuest}`,
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

  //function manage request
  const createInvitation = async (invitation, token) => {
    const newData = await postInvitation(
      {
        name: invitation.name,
        mailAddress: invitation.mailAddress,
        isAnswered: invitation.isAnswered,
        isCityHallInvited: invitation.isCityHallInvited,
      },
      token
    );
    if (newData != false) {
      const guestList = [];
      for (let item of invitation.guest) {
        const newGuest = await postGuest(
          {
            ...item,
            invitation: newData.idInvitation,
          },
          token
        );
        if (newGuest != false) guestList.push(newGuest);
      }
      setDatas((prev) => [
        ...prev,
        {
          ...newData,
          guest: guestList,
        },
      ]);
      return true;
    } else return false;
  };

  const updateInvitation = async (updateData, token) => {
    //On récupère l'invitation avant modification
    let invitation = datas.find(
      (item) => item.idInvitation == updateData.idInvitation
    );
    //On récvupère l'ancienne liste des invités lié à l'invitation
    let oldGuestList = invitation.guest;
    //On vérifie si on doit mettre à jour l'invitation
    if (
      updateData.name != invitation.name ||
      updateData.mailAddress != invitation.mailAddress ||
      updateData.isAnswered != invitation.isAnswered ||
      updateData.isCityHallInvited != invitation.isCityHallInvited
    ) {
      const newData = await putInvitation(updateData, token);
      if (newData != false) invitation = newData;
    }
    //On récupère la liste des invités à ajouté à l'invitations
    const createList = updateData.guest.filter(
      (item) => item.idGuest == null || item.idGuest == undefined
    );
    //On récupère la liste des invités à supprimer de l'invitattion
    const deleteList = oldGuestList.filter((item) => {
      const isFind = updateData.guest.find((guest) => {
        return item.idGuest == guest.idGuest;
      });
      return !isFind;
    });
    //On récupère la liste des invités à mettre à jour
    let updateList = updateData.guest.filter(
      (item) => item.idGuest != null && item.idGuest != undefined
    );
    updateList = updateList.filter((item) => {
      const isFind = deleteList.find((guest) => {
        return item.idGuest == guest.idGuest;
      });
      return !isFind;
    });
    updateList = updateList.filter((item) => {
      const isFind = oldGuestList.find((guest) => {
        return item.idGuest == guest.idGuest;
      });
      if (isFind) {
        if (
          isFind.lastName != item.lastName ||
          isFind.firstName != item.firstName ||
          isFind.isChild != item.isChild ||
          isFind.isMainGuest != item.isMainGuest ||
          isFind.isNeedAccomodation != item.isNeedAccomodation ||
          isFind.isPresent != item.isPresent
        ) {
          return isFind;
        } else return false;
      } else return false;
    });

    let newGuestList = [];
    let updateGuestList = [];
    let deleteGuestList = [];

    //On crée les nouveaux invités
    if (createList.length > 0) {
      for (let item of createList) {
        const newGuest = await postGuest(
          { ...item, invitation: invitation.idInvitation },
          token
        );
        if (newGuest != false) newGuestList.push(newGuest);
      }
    }
    //On supprime les invités qui ne sont plus dans l'invitation mise à jour
    if (deleteList.length > 0) {
      for (let item of deleteList) {
        const isDelete = await deleteGuest(item, token);
        if (isDelete) deleteGuestList.push(item);
      }
    }
    //On met à jour les invités modifié
    if (updateList.length > 0) {
      for (let item of updateList) {
        const updateGuest = await putGuest(item, token);
        updateGuestList.push(updateGuest);
      }
    }

    //On met a jour les données
    if (newGuestList.length > 0) {
      for (let item of newGuestList) {
        invitation = {
          ...invitation,
          guest: [...invitation.guest, item],
        };
      }
    }
    if (updateGuestList.length > 0) {
      for (let item of updateGuestList) {
        invitation = {
          ...invitation,
          guest: invitation.guest.map((elmt) =>
            elmt.idGuest == item.idGuest ? item : elmt
          ),
        };
      }
    }
    if (deleteGuestList.length > 0) {
      for (let item of deleteGuestList) {
        invitation = {
          ...invitation,
          guest: invitation.guest.filter(
            (elmt) => elmt.idGuest != item.idGuest
          ),
        };
      }
    }

    setDatas((prev) =>
      prev.map((item) =>
        item.idInvitation == invitation.idInvitation ? invitation : item
      )
    );
  };

  const delInvitation = async (deleteData, token) => {
    const isDelete = await deleteInvitation(deleteData, token);
    if (isDelete == true)
      setDatas((prev) =>
        prev.filter((elmt) => elmt.idInvitation != deleteData.idInvitation)
      );
  };

  return {
    datas: datas,
    getInvitationList: useCallback(getInvitationList, []),
    createInvitation: createInvitation,
    updateInvitation: updateInvitation,
    deleteInvitation: delInvitation,
  };
}
