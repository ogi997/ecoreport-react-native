import base from './base.service';

const instance = base.service(true);

export const getReportById = (id) => {
    return instance.get(`report/eco-problem/${id}`)
        .then((result) => result.data)
        .catch((error) => Promise.reject(error));
};

const reportService = {
    getReportById,
};

export default reportService;
