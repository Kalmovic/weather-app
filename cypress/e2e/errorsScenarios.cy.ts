describe("template spec", () => {
  beforeEach(() => {
    cy.visit("https://weather-app-challenge-jk.netlify.app/");
    // await url to include /weather/London
    // Intercept the network request and wait for it to complete
    cy.intercept(
      "GET",
      "https://api.weatherapi.com/v1/forecast.json?key=cc4874072fe84a688bb143039242401&q=London&aqi=no&days=7&aqi=no&alerts=no"
    ).as("getWeather");
  });
  it("render city error page by wrong url", () => {
    cy.visit(
      "https://weather-app-challenge-jk.netlify.app/weather/thiscitydoesntexist!!!"
    );
    cy.get(".text-4xl").should("be.visible").contains("Oops!");
    cy.get(".text-xl").should("be.visible").contains("City not found");
  });
  it("searches a city that doesnt exist", () => {
    cy.get("input").type("thiscitydoesntexist!!!");
    cy.get("button[type=submit]").click();
    cy.get(".toaster > .group").should("be.visible");
    cy.intercept(
      "GET",
      "https://api.weatherapi.com/v1/forecast.json?key=cc4874072fe84a688bb143039242401&q=this city doesnt exist!!!&aqi=no&days=7&aqi=no&alerts=no"
    ).as("getNYWeather");
    cy.get(".toaster > .group").contains("City not found");

    // cy.get(".text-primary").should("be.visible").contains("New York");
  });
});
