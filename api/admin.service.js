import base from './base.service';

const instance = base.service(true);

export const getAllUsers = () => {
    return instance
        .get("admin-user/get-all-users/")
        .then((result) => result.data)
        .catch((error) => Promise.reject(error));
};

export const getAllReportProblems = () => {
    return instance
        .get("admin-user/get-all-report-problem/")
        .then((result) => result.data)
        .catch((error) => Promise.reject(error));
};

export const activateReportProblemById = (id) => {
    return instance
        .put(`admin-user/activate-report/${id}`)
        .then((result) => result.data)
        .catch((error) => Promise.reject(error));
};

export const deactivateReportProblemById = (id) => {
    return instance
        .put(`admin-user/deactivate-report/${id}`)
        .then((result) => result.data)
        .catch((error) => Promise.reject(error));
};

export const activateUserById = (id) => {
    return instance
        .put(`admin-user/activate-user/${id}`)
        .then((result) => result.data)
        .catch((error) => Promise.reject(error));
};

export const deactivateUserById = (id) => {
    return instance
        .put(`admin-user/deactivate-user/${id}`)
        .then((result) => result.data)
        .catch((error) => Promise.reject(error));
};

export const setAdminForUserById = (id) => {
    return instance
        .put(`admin-user/make-user-admin/${id}`)
        .then((result) => result.data)
        .catch((error) => Promise.reject(error));
};

export const removeAdminForUserById = (id) => {
    return instance
        .put(`admin-user/remove-admin-user/${id}`)
        .then((result) => result.data)
        .catch((error) => Promise.reject(error));
}

const adminService = {
    getAllUsers,
    getAllReportProblems,
    activateReportProblemById,
    deactivateReportProblemById,
    activateUserById,
    deactivateUserById,
    setAdminForUserById,
    removeAdminForUserById,
}

export default adminService;
