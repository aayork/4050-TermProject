export const register = async ({
  firstName,
  lastName,
  email,
  username,
  password,
}) => {
  const response = await fetch("http://localhost:8000/api/auth/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      username: username,
      password1: password,
      password2: password,
      first_name: firstName,
      last_name: lastName,
    }),
  });

  const result = await parseResponse(response);
  const message = Object.values(result);

  if (!response.ok) {
    let errorMessage = "";
    for (let i = 0; i < message.length; i++) {
      errorMessage += message[i] + "\n";
    }
    throw new Error(errorMessage);
  }

  return message;
};

export const login = async ({ username, password }) => {
  const response = await fetch("http://localhost:8000/api/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  const result = await parseResponse(response);
  const message = Object.values(result);

  if (!response.ok) {
    let errorMessage = "";
    for (let i = 0; i < message.length; i++) {
      errorMessage += message[i] + "\n";
    }
    throw new Error(errorMessage);
  }

  localStorage.setItem("auth", message);
};

export const confirmEmail = async (key) => {
  const response = await fetch(
    "http://localhost:8000/api/auth/account-confirm-email/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key: key }),
    }
  );

  const result = await parseResponse(response);
  const message = Object.values(result);

  if (!response.ok) {
    let errorMessage = "";
    for (let i = 0; i < message.length; i++) {
      errorMessage += message[i] + "\n";
    }
    throw new Error(errorMessage);
  }
};

export const logout = async () => {
  const response = await fetch("http://localhost:8000/api/auth/logout/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await parseResponse(response);
  const message = Object.values(result);

  if (!response.ok) {
    let errorMessage = "";
    for (let i = 0; i < message.length; i++) {
      errorMessage += message[i] + "\n";
    }
    throw new Error(errorMessage);
  }

  localStorage.removeItem("auth");

  return message;
};

export const getUser = async () => {
  const token = localStorage.getItem("auth");

  const response = await fetch("http://localhost:8000/api/auth/user/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  const result = await parseResponse(response);

  if (!response.ok) {
    let errorMessage = "";
    for (let i = 0; i < result.length; i++) {
      errorMessage += result[i] + "\n";
    }
    throw new Error(errorMessage);
  }

  return result;
};

async function parseResponse(response) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let result = "";
  let done = false;

  while (!done) {
    const { value, done: streamDone } = await reader.read();
    done = streamDone;
    result += decoder.decode(value || new Uint8Array(), { stream: !done });
  }

  const parsedResult = JSON.parse(result);

  return parsedResult;
}
