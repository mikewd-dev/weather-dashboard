//get the document ready
$(document).ready(function () {
  //using date from dayjs
  var date = dayjs().format("[(]DD/MM/YYYY[)]");
  //set api key and geo location using api key from openweathermap
  var APIKey = "86061c8c252ff7eec10b635e30fa010b";
  var weatherAPI =
    "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&lang=en&appid=" +
    APIKey;
  var geocodingAPI = "https://api.openweathermap.org/geo/1.0/direct?q=";

  $("#search-button").click(function (event) {
    event.preventDefault();
    //save value of input in search field to a variable
    var cityName = $("#search-input").val();
    //check for any existing data and clear
    $("#today").empty();


    //use fetch  for a get request to get weather data from Openweather
    //first fetch the city's geolocation data using the latitude and longitude from the api
    fetch(geocodingAPI + cityName + "&limit=1&appid=" + APIKey)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.length > 0) {
          var latitude = data[0].lat;
          var longitude = data[0].lon;
          var weatherURL = weatherAPI
            .replace("{lat}", latitude)
            .replace("{lon}", longitude);
          //then fetch the weather data for that particular city
          fetch(weatherURL)
            .then(function (response) {
              return response.json();
            })
            .then(function (weatherData) {
              const forecasts = weatherData.list;

              // Display today's weather details
              var city = $("<h1>").html(weatherData.city.name).append(date);

              $("#today").append(city);
              console.log("Crent date", date);
              var weatherIcon = weatherData.list[0].weather[0].icon;
              var iconURL =
                "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
              var icon = $("<img>").attr("src", iconURL);
              $("#today").append(icon);
              var temperature = $("<p>").html(
                "Temperature: " + weatherData.list[0].main.temp + "&deg;C"
              );
              $("#today").append(temperature);

              var wind = $("<p>").text(
                "Wind: " + weatherData.list[0].wind.speed + " KPH"
              );
              $("#today").append(wind);

              var humidity = $("<p>").text(
                "Humidity: " + weatherData.list[0].main.humidity + "%"
              );
              $("#today").append(humidity);

              $("#today").append(humidity);

              // Display weather over the next five days on the cards
              for (let i = 0; i <= 5; i++) {
                const forecast = getForecastForNoon(forecasts, i + 1);
                if (forecast) {
                  //with each loop create a new card and append forecast on the cards
                  const cardBody = $("<div>").addClass("card-body");
                  const date = $("<p>").text(
                    dayjs(forecast.dt_txt).format("DD/MM/YYYY")
                  );
                  weatherIcon = forecast.weather[0].icon;
                  iconURL =
                    "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
                  var icon = $("<img>").attr("src", iconURL);
                  icon.append(date);
                  var city = $("<h1>").text(weatherData.city.name).append(icon);
                  const temperature = $("<p>").html(
                    "Temperature: " + forecast.main.temp + "&deg;C"
                  );
                  const wind = $("<p>").text(
                    "Wind: " + forecast.wind.speed + " KPH"
                  );
                  const humidity = $("<p>").text(
                    "Humidity: " + forecast.main.humidity + "%"
                  );

                  cardBody.append(date, icon, temperature, wind, humidity);
                  $(".card").eq(i).html(cardBody);
                }
              }

              // Save and retrieve data after updating the DOM
              saveData(weatherData);
              retrieveData();
            })
            //handle any errors that may arise
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


  //works the same as the above code except the data being search is the button text
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
          var weatherURL = weatherAPI
            .replace("{lat}", latitude)
            .replace("{lon}", longitude);

          fetch(weatherURL)
            .then(function (response) {
              return response.json();
            })
            .then(function (weatherData) {
              const forecasts = weatherData.list;

              localStorage.setItem("forecasts", JSON.stringify(forecasts));
              saveData(weatherData);
              retrieveData();
              for (let i = 0; i < 6; i++) {
                const forecast = getForecastForNoon(forecasts, i + 1);
                if (forecast) {
                  const cardBody = $("<div>").addClass("card-body");
                  const date = $("<p>").text(
                    dayjs(forecast.dt_txt).format("DD/MM/YYYY")
                  );
                  weatherIcon = weatherData.list[0].weather[0].icon;
                  iconURL =
                    "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
                  var icon = $("<img>").attr("src", iconURL);
                  icon.append(date);
                  var city = $("<h1>")
                    .text(weatherData.city.name)
                    .append(date)
                    .append(icon);
                  const temperature = $("<p>").html(
                    "Temperature: " + forecast.main.temp + "&deg;C"
                  );
                  const wind = $("<p>").text(
                    "Wind: " + forecast.wind.speed + " KPH"
                  );
                  const humidity = $("<p>").text(
                    "Humidity: " + forecast.main.humidity + "%"
                  );

                  cardBody.append(date, icon, temperature, wind, humidity);
                  $(".card").eq(i).html(cardBody);
                }
              }
              var city = $("<h1>").text(weatherData.city.name);

              $("#today").append(city);

              var date = $("<p>").html(
                dayjs(forecast.dt_txt).format("DD/MM/YYYY")
              );

              var iconURL =
                "https://openweathermap.org/img/wn/" + weatherIcon + ".png";

              city.append(date);

              var temperature = $("<p>").html(
                "Temperature: " + weatherData.list[0].main.temp + "&deg;C"
              );
              $("#today").append(temperature);

              var wind = $("<p>").text(
                "Wind: " + weatherData.list[0].wind.speed + " KPH"
              );
              $("#today").append(wind);

              var humidity = $("<p>").text(
                "Humidity: " + weatherData.list[0].main.humidity + "%"
              );
              $("#today").append(humidity);

              // Save and retrieve data after updating the DOM
              saveData(weatherData);
              retrieveData();
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

//save data in local storage
function saveData(weatherData) {
  if (weatherData && weatherData.city && weatherData.city.name) {
    localStorage.setItem("city", weatherData.city.name);
    localStorage.setItem("date", dayjs().format("[(]DD/MM/YYYY[)]"));
    const weatherIcon = weatherData.list[0].weather[0].icon;
    const iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
    localStorage.setItem("iconURL", iconURL); // Store the icon URL as a string

    localStorage.setItem("temperature", weatherData.list[0].main.temp);
    localStorage.setItem("wind", weatherData.list[0].wind.speed);
    localStorage.setItem("humidity", weatherData.list[0].main.humidity);
    localStorage.setItem("forecasts", JSON.stringify(weatherData.list));
  } else {
    console.error("Invalid or incomplete weather data");
  }
}

// retrieve data from local storage
function retrieveData() {
  // Clear existing data before populating
  $("#today").empty();

  var city = localStorage.getItem("city");
  var date = localStorage.getItem("date");
  var iconURL = localStorage.getItem("iconURL");
  var temperature = localStorage.getItem("temperature");
  var wind = localStorage.getItem("wind");
  var humidity = localStorage.getItem("humidity");
  var storedForecasts = JSON.parse(localStorage.getItem("forecasts")) || [];

  // Display the retrieved city in the header
  if (city && date && iconURL) {
    var icon = $("<img>").attr("src", iconURL);
    var cityElement = $("<h1>").text(city).append(date).append(icon);

    $("#today").append(cityElement);
  }

  // Display main weather details (today's weather)
  if (temperature && wind && humidity) {
    var temperatureElement = $("<p>").html(
      "Temperature: " + temperature + "&deg;C"
    );
    var windElement = $("<p>").text("Wind: " + wind + " KPH");
    var humidityElement = $("<p>").text("Humidity: " + humidity + "%");

    $("#today").append(temperatureElement, windElement, humidityElement);
  }

  // Loop through stored forecasts and display each forecast card
  if (storedForecasts.length > 0) {
    storedForecasts.forEach(function (forecast, index) {
      // Check if forecast and forecast.dt_txt exist before using
      if (forecast && forecast.dt_txt) {
        const cardBody = $("<div>").addClass("card-body");
        const date = $("<p>").text(
          dayjs(forecast.dt_txt).format("MMM DD, YYYY")
        );
        const weatherIcon = forecast.weather[0].icon;
        const iconURL =
          "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
        const icon = $("<img>").attr("src", iconURL);
        icon.append(date);
        const temperature = $("<p>").html(
          "Temperature: " + forecast.main.temp + "&deg;C"
        );
        const wind = $("<p>").text("Wind: " + forecast.wind.speed + " KPH");
        const humidity = $("<p>").text(
          "Humidity: " + forecast.main.humidity + "%"
        );

        cardBody.append(date, icon, temperature, wind, humidity);
        $(".card").eq(index).html(cardBody);
      }
    });
  }
}

// Call retrieveData after defining it to populate the page with stored data
retrieveData();


// set the weather forecast for a set time of the day instead of the default 3 hour interval with openweather.
// I chose noon because it is about the middle of the day
function getForecastForNoon(forecasts, day) {
  const today = dayjs().add(day, "day").startOf("day").unix();
  const noon = today + 12 * 60 * 60;

  const forecastForNoon = forecasts.find((forecast) => {
    const forecastTime = dayjs(forecast.dt_txt).unix();
    return forecastTime >= noon;
  });

  return forecastForNoon;
}
