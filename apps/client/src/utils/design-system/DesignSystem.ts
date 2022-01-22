import Color from 'color';

class DesignSystem {
  headerBackground = '#0e1726';
  siteBarBackground = Color(this.headerBackground).lighten(0.95).hex();
  widgetLibraryBackground = 'rgb(235, 236, 240)';
  widgetLibraryBorderColor = 'rgb(223, 225, 229)';
  pageZIndex = 0;
  headerZIndex = 1000;
  modalZIndex = 5000;
  loadingZIndex = 9000;
  sideBarWidth = 220;
  headerHeight = 54;
  colorRedBase = '#e7515a';
  colorGreenBase = '#1abc9c';
}

export const designSystem = new DesignSystem();
