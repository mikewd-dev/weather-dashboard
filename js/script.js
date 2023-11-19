var date = dayjs().format('[(]DD/MM/YYYY[)]');

$(document).ready(function () {
  var APIKey = "86061c8c252ff7eec10b635e30fa010b";
  var weatherAPI =
    "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&lang=en&appid=" +
    APIKey;
  var geocodingAPI = "https://api.openweathermap.org/geo/1.0/direct?q=";



  $("#search-button").click(function (event) {
    event.preventDefault();
    var cityName = $("#search-input").val();
    $("#today").empty();

    fetch(geocodingAPI + cityName + "&limit=1&appid=" + APIKey)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.length > 0) {
          var latitude = data[0].lat;
          var longitude = data[0].lon;
          var weatherURL = weatherAPI.replace("{lat}", latitude).replace("{lon}", longitude);

          fetch(weatherURL)
            .then(function (response) {
              return response.json();
            })
            .then(function (weatherData) {
              const forecasts = weatherData.list;
              for (let i = 0; i <=5; i++) {
                const forecast = getForecastForNoon(forecasts, i + 1);
                if (forecast) {
                  const cardBody = $("<div>").addClass("card-body");
                  const date = $("<p>").text(dayjs(forecast.dt_txt).format("MMM DD, YYYY"));
                  weatherIcon = weatherData.list[0].weather[0].icon;
                  iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
                  var icon = $("<img>").attr("src", iconURL);
                  var city = $("<h1>").text(weatherData.city.name).append(icon);
                  const temperature = $("<p>").html("Temperature: " + forecast.main.temp + "&deg;C");
                  const wind = $("<p>").text("Wind: " + forecast.wind.speed + " KPH");
                  const humidity = $("<p>").text("Humidity: " + forecast.main.humidity + "%");

                  cardBody.append(date, icon, temperature, wind, humidity);
                  $(".card").eq(i).html(cardBody);
                }
              }

              var city = $("<h1>").text(weatherData.city.name).append(date);

              $("#today").append(city);

              var temperature = $('<p>').html("Temperature: " + weatherData.list[0].main.temp + "&deg;C");
              $("#today").append(temperature);

              var wind = $("<p>").text("Wind: " + weatherData.list[0].wind.speed + " KPH");
              $("#today").append(wind);

              var humidity = $("<p>").text("Humidity: " + weatherData.list[0].main.humidity + "%");
              $("#today").append(humidity);

            })
            .catch(function (error) {
              console.error("Error fetching weather data:", error);
            });
        } else {
          console.error("City not found");
        }
      })
      .catch(function (error) {
        console.error("Error fetching city coordinates:", error);
      });
  });

  $(".search-city-button").click(function (event) {
    event.preventDefault();
    var cityName = $(this).text();
    $("#today").empty();

    fetch(geocodingAPI + cityName + "&limit=1&appid=" + APIKey)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.length > 0) {
          var latitude = data[0].lat;
          var longitude = data[0].lon;
          var weatherURL = weatherAPI.replace("{lat}", latitude).replace("{lon}", longitude);

          fetch(weatherURL)
            .then(function (response) {
              return response.json();
            })
            .then(function (weatherData) {
              const forecasts = weatherData.list;
              for (let i = 0; i < 6; i++) {
                const forecast = getForecastForNoon(forecasts, i + 1);
                if (forecast) {
                  const cardBody = $("<div>").addClass("card-body");
                  const date = $("<p>").text(dayjs(forecast.dt_txt).format("MMM DD, YYYY"));
                  weatherIcon = weatherData.list[0].weather[0].icon;
                  iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
                  var icon = $("<img>").attr("src", iconURL);
icon.append(date);
                  var city = $("<h1>").text(weatherData.city.name).append(icon);
                  const temperature = $("<p>").html("Temperature: " + forecast.main.temp + "&deg;C");
                  const wind = $("<p>").text("Wind: " + forecast.wind.speed + " KPH");
                  const humidity = $("<p>").text("Humidity: " + forecast.main.humidity + "%");

                  cardBody.append(date, icon, temperature, wind, humidity);
                  $(".card").eq(i).html(cardBody);
                }
              }
              var city = $("<h1>").text(weatherData.city.name).append(date);

              $("#today").append(city);

              var temperature = $('<p>').html("Temperature: " + weatherData.list[0].main.temp + "&deg;C");
              $("#today").append(temperature);

              var wind = $("<p>").text("Wind: " + weatherData.list[0].wind.speed + " KPH");
              $("#today").append(wind);

              var humidity = $("<p>").text("Humidity: " + weatherData.list[0].main.humidity + "%");
              $("#today").append(humidity);
            })
            .catch(function (error) {
              console.error("Error fetching weather data:", error);
            });
        } else {
          console.error("City not found");
        }

      })
      .catch(function (error) {
        console.error("Error fetching city coordinates:", error);
      });
  });
});


function getForecastForNoon(forecasts, day) {
  const today = dayjs().add(day, 'day').startOf('day').unix();
  const noon = today + (12 * 60 * 60);

  const forecastForNoon = forecasts.find(forecast => {
    const forecastTime = dayjs(forecast.dt_txt).unix();
    return forecastTime >= noon;
  });

  return forecastForNoon;
}