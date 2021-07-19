import { generateSignature } from './utils/signatureUtils';
import { getDeviceId } from './utils/deviceUtils';
import { MERCHANT_ID, DOMAIN, SECRET, API_CONTENT_TYPE } from './constants';
export const fetchArticleData = async (articleId, strategy = 'english') => {
  const apiUrl = `${DOMAIN}?uid=${await getDeviceId()}&source=true&cid=${articleId}&st=${strategy}`;
  const signature = generateSignature(apiUrl, SECRET, API_CONTENT_TYPE);
  const header = {
    accept: API_CONTENT_TYPE,
    'content-type': API_CONTENT_TYPE,
    authorization: `Authorization me:${signature[0]}`,
    dateused: signature[1],
  };
  try {
    return fetch(apiUrl, { method: 'GET', headers: header })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  } catch (error) {
    throw error;
  }
};
export const articleClickEventHandler = async (articleId, strategy) => {
  let requestBody = [
    {
      uid: await getDeviceId(), // UserID / Device ID
      cid: articleId,
      eid: 'EVENT1',
      merchantId: MERCHANT_ID,
      timestamp: new Date().getTime().toString(),
      eventType: 'RECOMMENDATION_VIEW_EVENT',
      recommendation: 'wru',
      userAgent: navigator.userAgent,
      ref: strategy,
    },
  ];
  return fetch(`${DOMAIN}/user`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
};
export const widgetViewEventHandler = async function (articleId) {
  const requestBody = [
    {
      uid: await getDeviceId(), // UserID / Device ID
      cid: articleId,
      eid: 'EVENT2',
      merchantId: MERCHANT_ID,
      timestamp: new Date().getTime().toString(),
      eventType: 'WIDGET_VIEW_EVENT',
      userAgent: navigator.userAgent,
    },
  ];
  fetch(`${DOMAIN}/user`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Wru WIDGET_VIEW_EVENT failed');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};