import base from './base.service';

const instance = base.service(false);

export const getCities = () => {
    return instance
        .get('choices/cities/')
        .then((result) => result.data)
        .catch((err) => Promise.reject(err));
};

export const getProblemTypes = () => {
    return instance
        .get("choices/event-type/")
        .then((result) => result.data)
        .catch((error) => Promise.reject(error));
}

const choicesService = {
    getCities,
    getProblemTypes,
}

export default choicesService;
