const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "Afdf_iCNi1elHfNSMZWg45X-fBMVByVYfkBhGf8zO46c8_dj8nNnZuSSfHKTbBaXxGxg24BEn4urvpmI",
  client_secret: "ED4OHniySDDf6Lgw64qO7ZjeTknt33cSu3yU-u0jhS5_8my5gE1ZQiGbUhB5Niu76pZNZOd_mpLTZe6E",
});

module.exports = paypal;