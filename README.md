npx cypress open
npx cypress run --spec 'cypress/e2e/patanjali-scraper.cy.js' --browser chrome --config video=false, screenshotOnRunFailure=false
https://example.cypress.io/commands/traversal

https://www.analyticsvidhya.com/blog/2020/12/web-scraping-using-cypress-tool/
https://github.com/vgyaan91/Webscrape/blob/master/scrape.js
cy.get('#dtDGrid>tbody>tr.DataRow') => "#" => "id", "." => "class"