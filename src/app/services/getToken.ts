interface Data {
  access_token: string;
}

async function setToken(): Promise<void> {
  const searchParams = encodeURIComponent('grant_type') + '=' + encodeURIComponent('client_credentials'); // eslint-disable-line
  try {
    const token = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;',
        Authorization: `Basic ${new Buffer('1392633d303d49939f94d65e5f53b072' + ':' + '2d6efdf7a7804ca9b4ee0acdb5f197dc').toString('base64')}`, // eslint-disable-line
      },
      body: searchParams,
    });

    const tokenAsJson: Data = await token.json();
    localStorage.setItem('token', tokenAsJson.access_token);
  } catch (err) {
    console.log('fetch failed', err);
  }
}

const GetToken = () => {
  setToken();
};
export default GetToken;
