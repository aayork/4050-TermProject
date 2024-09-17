export const register = async ({ firstName, lastName, email, password }) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  });

  await errorCheck(response);

  const { token } = await response.json();

  localStorage.setItem("auth", token);
};

export const login = async ({ email, password }) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password,
    }),
  });

  await errorCheck(response);

  const { isAdmin, token } = await response.json();

  localStorage.setItem("auth", token);

  return isAdmin;
};

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
  const status = res.status;

  if (!res.ok) {
    const response = await res.json();

    if (response.errors) {
      for (const { message, type } of response.errors) {
        throw new Error(type, { cause: message });
      }
    } else {
      throw new Error(status, { cause: response });
    }
  }
};
