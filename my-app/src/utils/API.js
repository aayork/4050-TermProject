const API_BASEURL = "http://localhost:8000/";
// Auth API stuff
export const register = async ({
  firstName,
  lastName,
  email,
  username,
  password,
}) => {
  const response = await fetch(`${API_BASEURL}api/auth/register/`, {
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
      status: "customer",
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
  const response = await fetch(`${API_BASEURL}api/auth/login/`, {
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
    `${API_BASEURL}api/auth/account-confirm-email/`,
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
  const response = await fetch(`${API_BASEURL}api/auth/logout/`, {
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

// movie API stuff
export const getMovies = async () => {
  const response = await fetch(`${API_BASEURL}api/info/getMovies/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await parseResponse(response);

  return result;
};

export const getMovieDetails = async (id) => {
  const response = await fetch(
    `${API_BASEURL}api/info/getMovieDetails/${id}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = await parseResponse(response);

  return result;
};

export const createMovie = async (movie) => {
  const response = await fetch(`${API_BASEURL}api/info/createMovie/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      movie: JSON.stringify(movie),
    },
  });

  const result = await parseResponse(response);
  return result;
};

export const deleteMovie = async (id) => {
  const response = await fetch(`${API_BASEURL}api/info/deleteMovie/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await parseResponse(response);
  return result;
};

export const updateMovie = async (movie) => {
  const response = await fetch(
    `${API_BASEURL}api/info/updateMovie/${movie.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        movie: JSON.stringify(movie),
      },
    }
  );

  const result = await parseResponse(response);
  return result;
};

// user API
export const getUser = async () => {
  const token = localStorage.getItem("auth");

  const response = await fetch(`${API_BASEURL}api/auth/user/`, {
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

export const getAllUsers = async () => {
  const response = await fetch(`${API_BASEURL}api/auth/getAllUsers/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await parseResponse(response);
  return result;
};

export const addUser = async (user) => {
  const response = await fetch(`${API_BASEURL}api/auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      username: user.username,
      password1: user.password,
      password2: user.password,
      first_name: user.firstName,
      last_name: user.lastName,
      status: user.status,
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

export const deleteUser = async (id) => {
  const response = await fetch(`${API_BASEURL}api/auth/deleteUser/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await parseResponse(response);
  return result;
};

export const updateUser = async (user) => {
  const response = await fetch(`${API_BASEURL}api/auth/updateUser/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      username: user.username,
      first_name: user.firstName,
      last_name: user.lastName,
      movie_profile: {
        status: user.movie_profile.status,
      },
    }),
  });

  const result = await parseResponse(response);
  return result;
};

//need a get admin api

//promo apis
export const getPromos = async () => {
  const response = await fetch(`${API_BASEURL}api/info/getPromotions/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await parseResponse(response);

  return result;
};

export const createPromotion = async (promo) => {
  const response = await fetch(`${API_BASEURL}api/info/promotion/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(promo),
  });

  const result = await parseResponse(response);

  return result;
};

export const updatePromotion = async (promo) => {
  const response = await fetch(
    `${API_BASEURL}api/info/promotion/update/${promo.id}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promo),
    }
  );

  const result = await parseResponse(response);

  return result;
};

//delete promotion maybe?

//Payment Card API's
export const getPayments = async (id) => {
  const response = await fetch(`${API_BASEURL}api/info/user/payment/${id}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await parseResponse(response);

  return result;
};

export const createPayment = async (card) => {
  const response = await fetch(`${API_BASEURL}api/info/user/payment/add/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });

  const result = await parseResponse(response);

  return result;
};

export const deletePayment = async (id) => {
  const response = await fetch(
    `${API_BASEURL}api/info/user/payment/delete/${id}/`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = await parseResponse(response);
  return result;
};

// parse response for api
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
