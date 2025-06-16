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
      alert("Data has been captured!");
    });
  }
});
