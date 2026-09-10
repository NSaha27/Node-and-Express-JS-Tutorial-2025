const regForm = document.querySelector("#reg-form");

const handleRegForm = async() => {
  const formData = new FormData(regForm);
  // extracting form field values
  const username = formData.get("username");
  const name = formData.get("name");
  const address = formData.get("address");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if(username.length === 0 || name.length === 0 || address.length === 0 || phone.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0){
    alert("All fields are required!");
    return;
  }

  if(password !== confirmPassword){
    alert("Confirm password must be same as the password!");
    return;
  }

  const response = await fetch("/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({username, name, address, phone, email, password})
  });
  
  if(!response.ok){
    const error = await response.json();
    alert(error.message);
    return;
  }

  regForm.reset();
  const data = await response.json();
  alert(data.message);
  window.location.href = "/login";
}