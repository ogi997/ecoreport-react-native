import base from './base.service';

const instance = base.service(true);

export const getData = () => {
    return instance
        .get("report/create-problem/")
        .then((result) => result.data)
        .catch((error) => Promise.reject(error));
};

export const getFilteredData = (val) => {
    return instance
        .get(`report/create-problem/?problem_type=${val}`)
        .then((result) => result.data)
        .catch((error) => Promise.reject(error));
};

export const createProblem = (value) => {
  return instance
      .post("report/create-problem/", value,{
          headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
          },
        })
      .then((result) => result.data)
      .catch((error) => console.error(error));
};

const mapLoggedService = {
    getData,
    getFilteredData,
    createProblem,
}

export default mapLoggedService;
