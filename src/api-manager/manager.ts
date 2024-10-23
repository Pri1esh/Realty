import Axios from 'axios';
import https from 'https';

const Agent = new https.Agent({ rejectUnauthorized: process.env.NEXT_PUBLIC_ENV === 'dev' ? false : true });
export async function postAPI(url: string, payload: Record<string, any> = {}) {
  const res = await Axios.post(url, payload, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PATCH',
      'Access-Control-Allow-Credentials': 'true',
      'Strict-Transport-Security': 'max-age=31536000; includeSubdomains;preload',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      // 'Content-Type': 'application/json',
    },
  });

  if (res.data.errors) {
    throw new Error('Failed to fetch API');
  }

  return res.data;
}

export async function getAPI(url: string, sitecoreURL = false) {
  let res;
  if (sitecoreURL) {
    res = await Axios.get(url, { httpsAgent: Agent });
  } else {
    res = await Axios.get(url, {
      headers: {
        traceId: 'TestWeb',
        agentId: '',
        channelId: 'web',
      },
      httpsAgent: Agent,
    });
  }

  if (res.data.errors) {
    throw new Error('Failed to fetch API');
  }

  return res.data;
}

export async function getAllAPI(apis: string[]) {
  const combinedRequest: any[] = [];
  apis.forEach((url) => {
    combinedRequest.push(Axios.get(url, { httpsAgent: Agent }));
  });
  const combinedResponse = await Axios.all(combinedRequest);
  const finalData: any[] = [];
  combinedResponse.forEach((item: any) => {
    finalData.push(item.data);
  });
  return finalData;
}
