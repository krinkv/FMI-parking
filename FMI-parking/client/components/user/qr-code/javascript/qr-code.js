var getQrCode = function getName() {
  return getImageName().then((response) => {
    return response["image_name"];
  })
  .catch((errorMessage) => {
      console.log(errorMessage);
  });
};

function getImageName() {
    return fetch("../../../../server/controller/get_user_qrcode.php", {
        method: "GET",
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        return data;
    })
}

window.onload = function() {
    let qrCodeImage = document.getElementById("qr-code-image");
    if (qrCodeImage) {
        getQrCode().then(function(name) {
            qrCodeImage.src="../../../../server/qrcode/generated/" + name;
        });
    } else {
        console.error("Element with id 'qr-code-image' not found");
    }
};
