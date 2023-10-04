import base from './base.service';

const instance = base.service(true);

export const getStatus = () => {
    return instance
        .get('users/status/')
        .then((res) => res.data)
        .catch((err) => Promise.reject(err));
};

export const getUserById = (id) => {
    return instance
        .get(`users/get-user/${id}`)
        .then((result) => result.data)
        .catch((error) => Promise.reject(error));
};

export const updateUserProfile = (first_name, last_name, email) => {
    return instance
        .patch("users/change-user-data/", {first_name, last_name, email})
        .then((result) => result.data)
        .catch((error) => Promise.reject(error));
};

export const updateUserPassword = (password, password_repeat, password_old) => {
    return instance
        .put("users/change-user-password/", {password, password_repeat, password_old})
        .then((result) => result.data)
        .catch((error) => Promise.reject(error));
}

const authService = {
    getStatus,
    getUserById,
    updateUserProfile,
    updateUserPassword
}

export default authService;
