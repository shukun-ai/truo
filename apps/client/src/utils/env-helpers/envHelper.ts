export const enableCrossOriginAuth = () => {
  return process.env?.['REACT_APP_ENABLE_CROSS_ORIGIN_AUTH'] || false;
};
