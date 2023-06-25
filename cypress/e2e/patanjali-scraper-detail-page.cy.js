describe("Patanjali scraper", () => {
  before(() => {});
  Cypress.on("uncaught:exception", (err, runnable) => {
    cy.log(err);
    return false;
  });

  it("Get all the details from detail page", () => {
    const productDetails = [];
    cy.fixture("childUrls").then((elements) => {
      elements.forEach((element) => {
        cy.visit(element.childUrl);
        cy.get('div.container').then(($detailPage) => {
          const breadcrumb1 = $detailPage.find('div.block-breadcrumb>ul>li:nth-child(2)>a').text();
          const breadcrumb2 = $detailPage.find('div.block-breadcrumb>ul>li:nth-child(3)>a').text();
          const breadcrumb3 = $detailPage.find('div.block-breadcrumb>ul>li:nth-child(4)').text();
          productDetails.push({breadcrumb1: breadcrumb1, breadcrumb2: breadcrumb2, breadcrumb3: breadcrumb3, });
        });
      }).then(() => {
        cy.log(productDetails);
        cy.writeFile("cypress/fixtures/productDetails.txt",
          JSON.stringify(productDetails, null, 2),
          { encoding: "utf-8", flag: "w", fixture: true });
      });
    });
  });
});
