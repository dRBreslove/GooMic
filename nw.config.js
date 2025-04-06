module.exports = {
  appName: 'GooMic',
  appVersion: '1.0.0',
  main: 'src/index.html',
  window: {
    title: 'GooMic - AI Governance',
    icon: 'icon.png',
    width: 1024,
    height: 768,
    min_width: 800,
    min_height: 600,
    position: 'center',
    fullscreen: true,
    resizable: true,
    always_on_top: false,
    frame: true,
    show_in_taskbar: true,
    show: true,
    toolbar: false,
    webview: true,
    transparent: false,
    background_color: '#ffffff'
  },
  build: {
    appId: 'com.goomic.app',
    productName: 'GooMic',
    targets: ['mobile'],
    mobile: {
      android: {
        package: 'com.goomic.app',
        versionCode: 1
      },
      ios: {
        bundleId: 'com.goomic.app'
      }
    }
  }
}; 