export const createAddress = async (token, id, addressData) => {
  return await fetch(`${import.meta.env.VITE_API_URL}/contacts/${id}/addresses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(addressData),
  });
}

export const getAllAddress = async (token, contactId) => {
  return await fetch(`${import.meta.env.VITE_API_URL}/contacts/${contactId}/addresses`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  });
};

export const getAddressById = async (token, contactId, addressId) => {
  return await fetch(`${import.meta.env.VITE_API_URL}/contacts/${contactId}/addresses/${addressId}`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  });
};

export const updateAddress = async (token, contactId, addressId, addressData) => {
  return await fetch(`${import.meta.env.VITE_API_URL}/contacts/${contactId}/addresses/${addressId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(addressData),
  });
};
