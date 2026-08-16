fetch("https://web-portofolio-kappa-nine.vercel.app/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Test", email: "test@test.com", message: "Test" })
})
.then(res => res.text())
.then(text => console.log(text))
.catch(err => console.error(err));
