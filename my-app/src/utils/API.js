export const register = async ({ firstName, lastName, email, password }) => {

  const response = await fetch("http://localhost:8000/api/auth/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      username: email,
      password1: password,
      password2: password,
      first_name: firstName,
      last_name: lastName,
    }),
  });

  await errorCheck(response);

  console.log(response)

  const { token } = await response.json();

  localStorage.setItem("auth", token);
};

export const login = async ({ email, password }) => {
  const response = await fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });


  await errorCheck(response);

  const { isAdmin, token } = await response.json();

  localStorage.setItem("auth", token);

  return isAdmin;
};

export const confirmEmail = async (key) => {
  const response = await fetch("http://locahost:8000/api/auth/account-confirm-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({key})
  })

  await errorCheck(response);
}

export const logout = async () => {
  const response = await fetch("/api/account/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  await errorCheck(response);

  return response;
};

const errorCheck = async (res) => {
  if (!res.ok) {
    const errorData = await response.json();
    console.error("Error:", errorData);
    throw new Error(`HTTP error! Status: ${response.status}`);
    }
};
