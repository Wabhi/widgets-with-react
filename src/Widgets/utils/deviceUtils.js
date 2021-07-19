import FingerprintJS from '@fingerprintjs/fingerprintjs';
export const getDeviceId = async () => {
  try {
    if (localStorage.getItem('wruUserId')) {
      return localStorage.getItem('wruUserId');
    } else {
      const fpPromise = FingerprintJS.load();
      return fpPromise
        .then((fp) => fp.get())
        .then((result) => {
          localStorage.setItem('wruUserId', result.visitorId);
          return result.visitorId;
        });
    }
  } catch (e) {
    console.error('There was a problem getting fingerprint data', e);
  }
};