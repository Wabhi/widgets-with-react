import { DOMAIN, MERCHANT_ID, STORY_VIEW_EVENT_ARGS_KEYS } from './constants';
import { getDeviceId } from './utils/deviceUtils';
// argsObj = {
//   articleId: "string",
//   eid: "string",
//   ref: "string",
//   ip: "string",
//   platform: "string"
// };
const storyViewEvent = async (argsObj) => {
  //debugger
  try {
    if (argsObj.articleId && argsObj.platform) {
      STORY_VIEW_EVENT_ARGS_KEYS.forEach((key) => {
        if (argsObj.hasOwnProperty(key)) {
          argsObj[key] = '' + argsObj[key];
        }
      });
      const requestBody = [
        {
          cid: argsObj.articleId, // Article ID
          uid: await getDeviceId(), // UserID / Device ID
          merchantId: MERCHANT_ID,
          eid: argsObj.eid || '',
          ref: argsObj.ref || '',
          timestamp: new Date().getTime().toString(), // epoch in millis
          ip: argsObj.ip || '',
          platform: argsObj.platform || 'web',
          eventType: 'STORY_VIEW_EVENT',
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
    } else {
      throw new Error('Either articleId or platform is not provided');
    }
  } catch (e) {
    console.error(e);
  }
};
export default storyViewEvent;