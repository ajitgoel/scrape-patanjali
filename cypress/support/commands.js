Cypress.Commands.add('writeFixtureFile', (fileName, data) => {
  cy.writeFile(`cypress/fixtures/${fileName}.json`,
    JSON.stringify(data, null, 2),
    { encoding: "utf-8", flag: "w", fixture: true }
  );
});