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
  it("renders initial info", () => {
    // expect the current weather to be displayed
    cy.get(".text-7xl").should("be.visible");
    // expect city name to be displayed
    cy.get(".text-primary").should("be.visible").contains("London");
    // expect the max and min temperatures to be displayed
    // max
    cy.get(
      ".text-muted-foreground > :nth-child(1) > .rt-Flex > .rt-Text"
    ).should("be.visible");
    // min
    cy.get(
      ".text-muted-foreground > :nth-child(2) > .rt-Flex > .rt-Text"
    ).should("be.visible");
    // expect that the first card is the wind one and contain  text "Wind Status"
    cy.get(".grid-cols-3 > :nth-child(1) > .p-4")
      .should("be.visible")
      .contains("Wind Status");
    // expect that the second card is the humidity one and contain  text "Humidity"
    cy.get(".grid-cols-3 > :nth-child(2) > .p-4")
      .should("be.visible")
      .contains("Humidity");
    // expect that the third card is the cloud cover one and contain  text "Cloud Cover"
    cy.get(".grid-cols-3 > :nth-child(3) > .p-4")
      .should("be.visible")
      .contains("Cloud Cover");
    // expect that the fourth card is the feels like one and contain  text "Feels"
    cy.get(".grid-cols-3 > :nth-child(4) > .p-4")
      .should("be.visible")
      .contains("Feels");
    // expect that the fifth card is the sunrise and sunset one and contain  text "Sunrise & Sunset"
    cy.get(".grid-cols-3 > :nth-child(5) > .p-4")
      .should("be.visible")
      .contains("Sunrise & Sunset");
    // expect that the sixth card is the chaince of rain one and contain  text "Chance of Rain"
    cy.get(".grid-cols-3 > :nth-child(6) > .p-4")
      .should("be.visible")
      .contains("Chance of Rain");
  });
  it("changes data view by clicking the tabs Forecast and Today", () => {
    // expect to change the data view to forecast
    // get by text "Forecast" and click
    cy.get('[role="tablist"] button:eq(1)').click();
    // expect to see the text "Forecast"
    cy.get("span[aria-label='Forecast (7 days)']").contains(
      "Forecast (7 days)"
    );
    // expect to change the data view to today
    // get by text "Today" and click
    cy.get('[role="tablist"] button:eq(0)').click();
    // expect to see the text "Today"
    cy.get("span[aria-label='Todays temperature']").contains(
      "Today's temperature"
    );
  });
  it.only("searches for a city", () => {
    cy.get(".rt-TextFieldInput").focus();
    cy.get("input[role=combobox]").type("New York");
    cy.get("a").contains("New York");
    cy.get("a").click();
    cy.get(".text-primary").should("be.visible").contains("New York");
    // show history
    cy.get(".rt-TextFieldInput").focus();
    cy.get("input[role=combobox]").type("New York");
    cy.get("div[role=group] div:eq(0)").contains("New York");
  });
});
