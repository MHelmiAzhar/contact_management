export const createContact = async (token, contactData) => {
  return await fetch(`${import.meta.env.VITE_API_URL}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(contactData),
  })
}

export const getContacts = async (token, { page, name, email, phone } = {}) => {
  const paramsObj = {};
  if (page !== undefined) paramsObj.page = page;
  if (name) paramsObj.name = name;
  if (email) paramsObj.email = email;
  if (phone) paramsObj.phone = phone;

  const params = new URLSearchParams(paramsObj).toString();

  const url = params
    ? `${import.meta.env.VITE_API_URL}/contacts?${params}`
    : `${import.meta.env.VITE_API_URL}/contacts`;

  return await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: token,
    },
  });
}
