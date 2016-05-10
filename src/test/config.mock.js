export default (ngModule) => {

  ngModule.config(($locationProvider) => {
    // Need to set requireBase to false for testing, because tests cant find the
    // base tag in html
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  });
};