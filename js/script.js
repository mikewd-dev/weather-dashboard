var date = dayjs().format('[(]DD/MM/YYYY[)]')

$(document).ready(function () {
  $(document).ready(function () {
    var APIKey = "86061c8c252ff7eec10b635e30fa010b";
    var weatherAPI =
      "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&lang=en&appid=" +
      APIKey;
    var geocodingAPI = "https://api.openweathermap.org/geo/1.0/direct?q=";

    $("#search-button").click(function (event) {
      event.preventDefault(); // Prevent form submission (or page reload in this case)


      var cityName = $("#search-input").val();

  // Clear previous data when initiating a new fetch
  $("#today").empty();

      // Use the geocoding API to get coordinates based on the city name
      fetch(geocodingAPI + cityName + "&limit=1&appid=" + APIKey)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          if (data.length > 0) {
            // Retrieve latitude and longitude from the geocoding response
            var latitude = data[0].lat;
            var longitude = data[0].lon;

            // Replace {lat} and {lon} with the obtained coordinates
            var weatherURL = weatherAPI
              .replace("{lat}", latitude)
              .replace("{lon}", longitude);

            // Fetch weather data using the coordinates
            fetch(weatherURL)
              .then(function (response) {
                return response.json();
              })
              .then(function (weatherData) {

                var date = dayjs().format('[(]DD/MM/YYYY[)]')
                $(document).ready(function () {
                  $(document).ready(function () {
                    var APIKey = "86061c8c252ff7eec10b635e30fa010b";
                    var weatherAPI =
                      "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&lang=en&appid=" +
                      APIKey;
                    var geocodingAPI = "https://api.openweathermap.org/geo/1.0/direct?q=";

                    $("#search-button").click(function (event) {
                      event.preventDefault(); // Prevent form submission (or page reload in this case)


                      var cityName = $("#search-input").val();

                  // Clear previous data when initiating a new fetch
                  $("#today").empty();

                      // Use the geocoding API to get coordinates based on the city name
                      fetch(geocodingAPI + cityName + "&limit=1&appid=" + APIKey)
                        .then(function (response) {
                          return response.json();
                        })
                        .then(function (data) {
                          if (data.length > 0) {
                            // Retrieve latitude and longitude from the geocoding response
                            var latitude = data[0].lat;
                            var longitude = data[0].lon;

                            // Replace {lat} and {lon} with the obtained coordinates
                            var weatherURL = weatherAPI
                              .replace("{lat}", latitude)
                              .replace("{lon}", longitude);

                            // Fetch weather data using the coordinates
                            fetch(weatherURL)
                              .then(function (response) {
                                return response.json();
                              })
                              .then(function (weatherData) {
                                // Process weatherData and display information as needed
                                var city = $("<h1>").text(weatherData.city.name);

                                $("#today").append(city);

                                var temperature= $('<p>').html("Temperature: " + weatherData.list[0].main.temp + "&deg;C")
                                $("#today").append(temperature);

                                $(".card-body").append(temperature)

                               var wind= $("<p>").text("Wind: " + weatherData.list[0].wind.speed + " KPH")
                               $("#today").append(wind);

                               var humidity= $("<p>").text("Humidy: " + weatherData.list[0].main.humidity + "%")
                               $("#today").append(humidity);

                                // Display other weather information as required
                                console.log(weatherData);

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
                      event.preventDefault(); // Prevent form submission (or page reload in this case)
                      // ("#today").empty();
                      var cityName = $(this).text();

                      // Clear previous data when initiating a new fetch
                  $("#today").empty();

                      // Use the geocoding API to get coordinates based on the city name
                      fetch(geocodingAPI + cityName + "&limit=1&appid=" + APIKey)
                        .then(function (response) {
                          return response.json();
                        })
                        .then(function (data) {
                          if (data.length > 0) {
                            // Retrieve latitude and longitude from the geocoding response
                            var latitude = data[0].lat;
                            var longitude = data[0].lon;

                            // Replace {lat} and {lon} with the obtained coordinates
                            var weatherURL = weatherAPI
                              .replace("{lat}", latitude)
                              .replace("{lon}", longitude);

                            // Fetch weather data using the coordinates
                            fetch(weatherURL)
                              .then(function (response) {
                                return response.json();
                              })
                              .then(function (weatherData) {
                                // Process weatherData and display information as needed
                                var city = $("<h1>").text(weatherData.city.name).append(date);

                                $("#today").append(city);

                var temperature= $('<p>').html("Temperature: " + weatherData.list[0].main.temp + "&deg;C")
                 $("#today").append(temperature);

                var wind= $("<p>").text("Wind: " + weatherData.list[0].wind.speed + " KPH")
                $("#today").append(wind);

                var humidity= $("<p>").text("Humidy: " + weatherData.list[0].main.humidity + "%")
                $("#today").append(humidity);

                                // Display other weather information as required
                                console.log(weatherData);
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


                });


                var iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
                var icon =$("<img>").attr("src",iconURL)
                // Process weatherData and display information as needed
                var city = $("<h1>").text(weatherData.city.name).append(date).append(icon);;

                $("#today").append(city);

                var temperature= $('<p>').html("Temperature: " + weatherData.list[0].main.temp + "&deg;C")
                $("#today").append(temperature);



                $(".card-body").append(temperature)

               var wind= $("<p>").text("Wind: " + weatherData.list[0].wind.speed + " KPH")
               $("#today").append(wind);

               var humidity= $("<p>").text("Humidy: " + weatherData.list[0].main.humidity + "%")
               $("#today").append(humidity);

                // Display other weather information as required
                console.log(weatherData);


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
      event.preventDefault(); // Prevent form submission (or page reload in this case)
      // ("#today").empty();
      var cityName = $(this).text();

      // Clear previous data when initiating a new fetch
  $("#today").empty();

      // Use the geocoding API to get coordinates based on the city name
      fetch(geocodingAPI + cityName + "&limit=1&appid=" + APIKey)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.length > 0) {
            // Retrieve latitude and longitude from the geocoding response
            var latitude = data[0].lat;
            var longitude = data[0].lon;

            // Replace {lat} and {lon} with the obtained coordinates
            var weatherURL = weatherAPI
              .replace("{lat}", latitude)
              .replace("{lon}", longitude);

            // Fetch weather data using the coordinates
            fetch(weatherURL)
              .then(function (response) {
                return response.json();
              })
              .then(function (weatherData) {
                // Process weatherData and display information as needed
                weatherIcon = weatherData.list[0].weather[0].icon
                iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
var icon =$("<img>").attr("src",iconURL)
                var city = $("<h1>").text(weatherData.city.name).append(date).append(icon);

                $("#today").append(city);


var temperature= $('<p>').html("Temperature: " + weatherData.list[0].main.temp + "&deg;C")
 $("#today").append(temperature);

 $(".card-body");


var wind= $("<p>").text("Wind: " + weatherData.list[0].wind.speed + " KPH")
$("#today").append(wind);

var humidity= $("<p>").text("Humidy: " + weatherData.list[0].main.humidity + "%")
$("#today").append(humidity);

                // Display other weather information as required
                console.log(weatherData);
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


});