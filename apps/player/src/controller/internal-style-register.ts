import { reboot } from '@shukun/widget';

export const registerReboot = () => {
  const style = document.createElement('style');
  style.innerHTML = reboot;
  document.head.append(style);
};
