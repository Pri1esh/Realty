import { ENDPOINT, getAPI } from '@api-manager';

interface IData {
  pageData?: any;
}

export async function getLayoutdata() {
  const response: IData = {};
  const pageLayoutData = await getAPI(ENDPOINT.homepageLayout, true);

  response.pageData = pageLayoutData;
  return response;
}
