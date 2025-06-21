document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("stockForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      console.log(data);
      fetch("http://localhost:3000/api/stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("Success", result);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    });
  }
});
