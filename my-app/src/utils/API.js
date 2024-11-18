// Order API Stuff
export const createOrder = async (
  discountPercentage,
  totalPrice,
  userId,
  purchaseDate,
  tickets,
) => {
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
    }),
  });

  const result = await parseResponse(response);

  if (!response.ok) {
    const errorMessage = Object.values(result).join("\n");
    throw new Error(errorMessage);
  }

  return result;
};
