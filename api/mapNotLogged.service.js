import base from './base.service';

const instance = base.service(false);

export const getData = () => {
    return instance
        .get("report/get-all/")
        .then((result) => result.data)
        .catch((error) => Promise.reject(error));
};

const mapNotLoggedService = {
    getData,
};

export default mapNotLoggedService;
