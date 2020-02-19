const fetcher = (method, url, data, headers = {}) => new Promise((resolve, reject) => {
  const headerList = Object.assign(headers, {
    'Content-Type': 'application/json;',
    authorization: 'Bearer BQBeAkOcj-jYPuBqpCRtAVNFhIvi6tdY3Gpzeg-AuxQ_2mjb5wdGNL5gwPwZ7rFlKkictyqgPhyK44XLKcSMaaNP7SM-fjGUSUxxsu5jBOt8uZQSJplC3QMESQFw4DIX7Fs-8ntD9s3A4QsA6eorwG3nu7eLagANW_JEa7ZW8t6zn9X6dwoeT1ED0RdLxSMB84OJwk56MItgdF-nVSxIAeFBLDGevWzj1IDbtNIjHmRaRb5di_Tirsyxo1YqO2CPRSTwPYAgVMYM9w',
  });

  const config = {
    method,
    headers: new Headers(headerList),
  };

  if (method === 'POST' || method === 'PUT') {
    config.body = JSON.stringify(data);
  }

  if (method === 'DELETE') {
    return fetch(url, config).then(
      (response) => {
        if (response.ok) {
          resolve({ headers: response.headers });
        }
      },
    ).catch((err) => {
      console.error('Error:', err);
    });
  }

  return fetch(url, config).then(
    (response) => {
      if (response.ok) {
        response
          .json()
          .then((respJSON) => (respJSON.error
            ? reject(respJSON) : resolve({ headers: response.headers, data: respJSON })));
      } else {
        response
          .json()
          .then((respJSON) => reject(respJSON));
      }
    },
  ).catch((err) => {
    console.error('Error:', err);
  });
});

export default {
  get: (url, headers) => fetcher('GET', url, null, headers),
  post: (url, body, headers) => fetcher('POST', url, body, headers),
  delete: (url, headers) => fetcher('DELETE', url, null, headers),
  put: (url, body, headers) => fetcher('PUT', url, body, headers),
};
