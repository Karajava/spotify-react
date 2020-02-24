
interface Config {
  method: string;
  headers: Headers;
  body?: string;
}

function fetcher(method: string, url: string, data?: object | null, headers: object = {}): Promise<object> {
  return new Promise((resolve, reject) => {
    const headerList = Object.assign(headers, {
      'Content-Type': 'application/json;',
    });

    const apiKey = 'SaFFFOLMtjkDiJuJxgmQSjEps8oLT8Wmf0i9lQxr';
    const config: Config = {
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

    return fetch(`${url}?api_key=${apiKey}`, config).then(
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
}

export default {
  get: (url: string, headers?: object): Promise<object> => fetcher('GET', url, null, headers),
  post: (url: string, body?: object, headers?: object): Promise<object> => fetcher('POST', url, body, headers),
  delete: (url: string, headers: object): Promise<object> => fetcher('DELETE', url, null, headers),
  put: (url: string, body?: object, headers?: object): Promise<object> => fetcher('PUT', url, body, headers),
};
