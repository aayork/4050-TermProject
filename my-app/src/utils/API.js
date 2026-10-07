const API_BASEURL = "http://localhost:8000/";
// Auth API stuff
export const register = async ({
  firstName,
  lastName,
  email,
  username,
  password,
  receive_promotions,
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
      receive_promotions: receive_promotions,
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

export const managerCreate = async ({
  firstName,
  lastName,
  email,
  username,
  password,
  status,
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
      status: status,
      receive_promotions: false,
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

export const suspendAccount = async (id) => {
  const response = await fetch(`${API_BASEURL}api/auth/user/suspend/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = parseResponse(response);

  return result;
};

export const unsuspendAccount = async (id) => {
  const response = await fetch(`${API_BASEURL}api/auth/user/unSuspend/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = parseResponse(response);

  return result;
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

export const getMoviesByShowday = async (date) => {
  const response = await fetch(
    `${API_BASEURL}api/info/showtime/date/?date=${date}`,
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
    body: JSON.stringify({
      movieName: movie.movieName,
      year: movie.year,
      trailer: movie.trailer,
      rating: movie.rating,
      runtime: movie.runtime,
      critics_score: movie.critics_score,
      audience_score: movie.audience_score,
      description: movie.description,
      photo: movie.photo,
      studio: movie.studio,
      is_active: movie.is_active,
      actors: movie.actors,
      directors: movie.directors,
      genres: movie.genres,
      showtimes: movie.showtimes,
    }),
  });

  const result = await parseResponse(response);
  return result;
};

export const deleteMovie = async (id) => {
  const response = await fetch(`${API_BASEURL}api/info/deleteMovie/${id}/`, {
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
    `${API_BASEURL}api/info/updateMovie/${movie.id}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieName: movie.movieName,
        year: movie.year,
        trailer: movie.trailer,
        rating: movie.rating,
        runtime: movie.runtime,
        critics_score: movie.critics_score,
        audience_score: movie.audience_score,
        description: movie.description,
        photo: movie.photo,
        studio: movie.studio,
        is_active: movie.is_active,
        actors: movie.actors,
        directors: movie.directors,
        genres: movie.genres,
        showtimes: movie.showtimes,
      }),
    }
  );

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

export const getGenres = async () => {
  const response = await fetch(`${API_BASEURL}api/info/getGenres/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = parseResponse(response);
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

export const validateAdmin = async () => {
  const token = localStorage.getItem("auth");

  const response = await fetch(
    `${API_BASEURL}api/auth/user/validateAdmin/${token}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

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
  const response = await fetch(`${API_BASEURL}api/auth/deleteUser/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await parseResponse(response);
  return result;
};

export const updateUser = async (user, userId) => {
  const response = await fetch(`${API_BASEURL}api/auth/updateUser/${userId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      movie_profile: {
        status: user.movie_profile.status,
        receive_promotions: user.movie_profile.receive_promotions,
        address: {
          street: user.movie_profile.address.street,
          city: user.movie_profile.address.city,
          state: user.movie_profile.address.state,
          postalCode: user.movie_profile.address.postalCode,
        },
      },
    }),
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

export const managerUpdateUser = async (user, userId) => {
  const response = await fetch(`${API_BASEURL}api/auth/updateUser/${userId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      movie_profile: {
        status: user.movie_profile.status,
        receive_promotions: user.movie_profile.receive_promotions,
      },
    }),
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
  const response = await fetch(`${API_BASEURL}api/info/promotion/add/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: promo.name,
      discountPercentage: promo.discountPercentage,
      code: promo.code,
      startDate: promo.startDate,
      endDate: promo.endDate,
    }),
  });

  const result = await parseResponse(response);

  return result;
};

export const updatePromotion = async (promo, ogCode) => {
  const response = await fetch(
    `${API_BASEURL}api/info/promotion/update/${ogCode}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: promo.name,
        discountPercentage: promo.discountPercentage,
        code: promo.code,
        startDate: promo.startDate,
        endDate: promo.endDate,
      }),
    }
  );

  const result = await parseResponse(response);

  return result;
};

export const validatePromotion = async (code) => {
  const response = await fetch(
    `${API_BASEURL}api/info/promotion/validate/${code}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = await parseResponse(response);

  if (!response.ok) {
    throw new Error(result.error);
  }

  return result;
};

//delete promotion maybe?

// Manage prices api
export const getPrices = async () => {
  const response = await fetch(`${API_BASEURL}api/info/prices/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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

export const updatePrices = async (prices) => {
  const response = await fetch(`${API_BASEURL}api/info/prices/update/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(prices),
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

  if (!response.ok) {
    let errorMessage = "";
    for (let i = 0; i < result.length; i++) {
      errorMessage += result[i] + "\n";
    }
    throw new Error(errorMessage);
  }

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

  return response;
};

// Sends reset pw email
export const requestPasswordReset = async (email) => {
  const response = await fetch(`${API_BASEURL}api/auth/password/reset/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const result = await parseResponse(response);

  if (!response.ok) {
    const errorMessage = Object.values(result).join("\n");
    throw new Error(errorMessage);
  }

  return result;
};

// Resets pw on backend
export const confirmPasswordReset = async (uid, token, newPassword) => {
  const response = await fetch(
    `${API_BASEURL}api/auth/password/reset/confirm/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        new_password1: newPassword,
        new_password2: newPassword,
        uid,
        token,
      }),
    }
  );

  const result = await parseResponse(response);

  if (!response.ok) {
    const errorMessage = Object.values(result).join("\n");
    throw new Error(errorMessage);
  }

  return result;
};

// Order API Stuff
export const createOrder = async (
  discountPercentage,
  totalPrice,
  userId,
  purchaseDate,
  tickets,
  cardNumber,
  street,
  city,
  state,
  zip
) => {
  console.log(
    JSON.stringify(
      {
        discountPercentage,
        totalPrice,
        userId,
        purchaseDate,
        tickets,
        cardNumber,
        street,
        city,
        state,
        zip,
      },
      null,
      2
    )
  );

  const response = await fetch(`${API_BASEURL}api/info/createOrder/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      discountPercentage: discountPercentage,
      totalPrice: totalPrice,
      userId: userId,
      purchaseDate: purchaseDate,
      tickets: tickets,
      cardNumber: cardNumber,
      street: street,
      city: city,
      state: state,
      zip: zip,
    }),
  });

  const result = await parseResponse(response);

  if (!response.ok) {
    const errorMessage = Object.values(result).join("\n");
    throw new Error(errorMessage);
  }

  return result;
};

// Get seats by showtime
export const getSeats = async (id) => {
  const response = await fetch(`${API_BASEURL}api/info/getSeats/${id}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await parseResponse(response);

  return result;
};

// Showtime API's
export const getAvailableRooms = async (movie_id, date, time) => {
  const response = await fetch(
    `${API_BASEURL}api/info/showtime/available-rooms/?movie_id=${movie_id}&date=${date}&time=${time}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = parseResponse(response);

  return result;
};

export const createShowtime = async (movie_id, date, time, movieRoom_id) => {
  const response = await fetch(`${API_BASEURL}api/info/showtime/add/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      movie_id: movie_id,
      movieRoom_id: movieRoom_id,
      date: date,
      startTime: `${date}T${time}:00`,
    }),
  });

  const result = parseResponse(response);
  return result;
};

export const getPaymentInfo = async (id) => {
  const response = await fetch(
    `${API_BASEURL}api/info/user/payment/card_info/${id}/`,
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

export const deleteShowtime = async (id) => {
  await fetch(`${API_BASEURL}api/info/showtime/delete/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return `Successfully deleted showtime ${id}`;
};

export const refundOrder = async (id) => {
  const response = await fetch(`${API_BASEURL}api/info/refundOrder/${id}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = parseResponse(response);

  return result;
};

// parse response for api (keep at bottom)
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
