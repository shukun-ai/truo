export const environments = {
  production: import.meta.env?.PROD ? true : false,
  serverDomain: import.meta.env?.VITE_PRESENTER_BASE_URL ?? '',
  storageDomain: import.meta.env?.VITE_PRESENTER_STORAGE_URL ?? '',
  assetDomain: import.meta.env?.VITE_PRESENTER_STORAGE_URL ?? '',
  postMessageCrossOrigin: import.meta.env
    ?.VITE_PRESENTER_POST_MESSAGE_CROSS_ORIGIN
    ? true
    : false,
};
