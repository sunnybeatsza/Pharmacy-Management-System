# Form Algorithm

This document breaks down a typical JavaScript form submission handler into methodical, reusable steps for better understanding and reuse.

---

## ♻ REUSABLE STEPS EXPLANATION

---

### **1. Wait for the DOM to load**

```javascript
document.addEventListener("DOMContentLoaded", function () { ... });
```

**Step:**

- **Create an event listener for the \*\***\`\`\***\*.**
- **Argument 1:** `"DOMContentLoaded"` – this tells the browser **_wait until all HTML is loaded and parsed_**, but **before** CSS/images are done.
- **Argument 2:** `function () { ... }` – the **callback function** to run when the DOM is ready.

**Why:**

> Ensures that the script runs **after the page's elements (like forms)** exist, avoiding `null` errors when trying to access them.

---

### **2. Get the form from the HTML**

```javascript
const form = document.getElementById("stockForm");
```

**Step:**

- **Create a variable to reference the form.**
- Use `getElementById("stockForm")` to find the form with `id="stockForm"` in your HTML.

**Why:**

> We need to connect our JavaScript to the form so we can listen for submission and extract input values.

---

### **3. Check if form exists and attach a submit listener**

```javascript
if (form) {
  form.addEventListener("submit", function (e) {
    ...
  });
}
```

**Step:**

- **Check if the form actually exists** to avoid errors.
- **Add a "submit" event listener** to the form.
- Inside the function:
  - `e.preventDefault();` stops the form from refreshing the page (default behavior).

**Why:**

> We want to intercept the form submission and handle it with JavaScript instead of letting the browser reload the page.

---

### **4. Collect form data**

```javascript
const formData = new FormData(form);
const data = {};
formData.forEach((value, key) => {
  data[key] = value;
});
```

**Step:**

- Create a `FormData` object from the form — this grabs **all input values**.
- Initialize an empty object `data`.
- Loop through each form field (`key`) and its value, and store it in the `data` object.

**Why:**

> We need the form input in **JSON format** (a plain JavaScript object) so we can send it to the server.

---

### ❌ Issue in Your Code

The next part (fetch call) is **outside** of the form submit function — which means `data` will be `undefined` when you try to send it. Let’s fix and explain it too.

---

### ✅ **5. Send the data to the backend (inside the submit handler)**

```javascript
fetch("backend-route", {
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
```

**Step:**

- Use the `fetch()` function to send a POST request.
- Set `Content-Type` to `application/json` to tell the server we’re sending JSON.
- Convert `data` into a JSON string using `JSON.stringify(data)`.

**Why:**

> This is how we **submit the form data to the backend** without reloading the page.

---

## 🧠 Final Reusable Algorithm Summary:

1. **Listen for the DOM to be ready.**

   - `document.addEventListener("DOMContentLoaded", callbackFunction);`

2. **Get the form element using its ID.**

   - `const form = document.getElementById("formId");`

3. **If the form exists, add a submit listener.**

   - `form.addEventListener("submit", function (e) { ... });`

4. **Prevent page reload and collect form data.**

   - `e.preventDefault();`
   - `const formData = new FormData(form);`
   - Convert `FormData` to JSON object.

5. **Send the JSON data to the backend using fetch().**

   - Use `fetch()` with POST, headers, and JSON body.
   - Use `.then()` and `.catch()` to handle response and errors.

---

## ✅ Fixed and Final Version

```javascript
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

      fetch("backend-route", {
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
```
