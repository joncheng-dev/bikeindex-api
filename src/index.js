import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import apiService from "./api-service.js";

// User Interface Logic
$(document).ready(function () {
  $("#search").click(function () {
    const location = $("#location").val();
    const distance = $("#distance").val();
    clearFields();
    apiCall(location, distance);
  });

  function clearFields() {
    $("#location").val("");
    $("#distance").val("");
    $("#showResults").html("");
  }

  function apiCall(location, distance) {
    let promise = apiService.getResults(location, distance);

    promise.then(
      function (response) {
        const body = JSON.parse(response);
        getElements(body);
      },
      function (error) {
        $(".showErrors").text(
          `There was an error processing your request: ${error}`
        );
      }
    );
  }

  function getElements(response) {
    for (let i = 0; i < 3; i++) {
      // Row 1: Number / Title of Post
      let title = `<h4>${i + 1}. ${response.bikes[i].title}</h4>`;
      $(".showResults").append(`<br><div class="row">${title}</div>`);
      // Row 2: (left side) - Picture
      let picture = `<a href="${response.bikes[i].url}"><img src="${response.bikes[i].thumb}" alt="${response.bikes[i].description}"></a>`;
      // Row 2: (right side) - Details
      let details = `<h5>Details</h5><ul><li>Date Stolen: ${response.bikes[i].date_stolen}</li><li>Description: ${response.bikes[i].description}</li><li>Manufacturer Name: ${response.bikes[i].manufacturer_name}</li><li>Year: ${response.bikes[i].year}</li></ul>`;
      // Row 2: Display to HTML
      $(".showResults").append(
        `<div class="row"><div class="col-md-6">${picture}</div><div class="col-md-6">${details}</div></div>`
      );
    }
  }
});
