var appName = 'Deseret Book Search';

module.exports = {
  development: {
    appName: 'DEV - ' + appName
  },
  test: {
    appName: 'TEST - ' + appName
  },
  production: {
    appName: appName
  }
}
