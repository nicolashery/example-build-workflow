// NOTE: This is a Lo-Dash template

(function() {
  window.config = {
    VERSION: '<%= pkg.version %>' || '',
    API_URL: '<%= process.env.API_URL %>' || 'http://localhost:3001'
  };
}());
