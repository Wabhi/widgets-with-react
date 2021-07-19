const MERCHANT_ID = '130926';
const DOMAIN = `https://api.wru.ai/${MERCHANT_ID}`;
const SECRET = 'keygen';
const API_CONTENT_TYPE = 'application/json';
const ELEMENT_CLASS_PREFIX = 'nws18-wru-widget';
const MOBILE = 'mobile';
const DESKTOP = 'desktop';
const DESKTOP_ARTICLE_COUNT = 2;
const MOBILE_ARTICLE_COUNT = 2;
const DESCRIPTION_MAX_CHARS = 55;
const WIDGET_DATA_KEYS = [
  'widgetId',
  'articleId',
  'gaTrackingId',
  'deviceType',
];
const STORY_VIEW_EVENT_ARGS_KEYS = [
  'articleId',
  'eid',
  'ref',
  'ip',
  'platform',
];
const IMAGE_PLACEHOLDER =
  'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
const FALLBACK_IMAGE_URL =
  'https://images.news18.com/static_news18/pix/ibnhome/news18/images/default-300x200.jpg?impolicy=website&width=150&height=100';
export {
  MERCHANT_ID,
  DOMAIN,
  SECRET,
  API_CONTENT_TYPE,
  ELEMENT_CLASS_PREFIX,
  MOBILE,
  DESKTOP,
  DESKTOP_ARTICLE_COUNT,
  MOBILE_ARTICLE_COUNT,
  DESCRIPTION_MAX_CHARS,
  WIDGET_DATA_KEYS,
  STORY_VIEW_EVENT_ARGS_KEYS,
  IMAGE_PLACEHOLDER,
  FALLBACK_IMAGE_URL,
};