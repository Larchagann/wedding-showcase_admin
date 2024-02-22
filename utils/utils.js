const addressMailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const checkValideAddressMail = (addressMail) => {
  return addressMail.match(addressMailRegex);
};

// export const isMobile = () => {
//     return window.innerWidth <= 800
// };

export const isMobile = () => {
  if (typeof window !== "undefined") {
    const isMobileCheck = {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return (
          navigator.userAgent.match(/IEMobile/i) ||
          navigator.userAgent.match(/WPDesktop/i)
        );
      },
      any: function () {
        return (
          isMobileCheck.Android() ||
          isMobileCheck.BlackBerry() ||
          isMobileCheck.iOS() ||
          isMobileCheck.Opera() ||
          isMobileCheck.Windows()
        );
      },
    };
    return isMobileCheck.any();
  } else {
    return false;
  }
};
