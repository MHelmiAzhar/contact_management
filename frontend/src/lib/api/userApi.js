export const userRegister = async ({username, password, name}) => {
    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: {
            'content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({username, password, name})
    })
}

export const userLogin = async ({username, password}) => {
    return fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
        method: "POST",
        headers: {
            'content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({username, password})
    })
}

export const userUpdateProfile = async ({token, name}) => {
    return fetch(`${import.meta.env.VITE_API_URL}/users/current`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify({name})
    })
}

export const userUpdatePassword = async ({token, password}) => {
    return fetch(`${import.meta.env.VITE_API_URL}/users/current`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify({password})
    })
}
export const userLogout = async ({token}) => {
    return fetch(`${import.meta.env.VITE_API_URL}/users/logout  `, {
        method: "DELETE",
        headers: {
            'Authorization': `${token}`
        },
    })
}

export const getUserProfile = async (token) => {    
    return fetch(`${import.meta.env.VITE_API_URL}/users/current`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': `${token}`
        }
    })
}