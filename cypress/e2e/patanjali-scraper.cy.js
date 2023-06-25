describe("Patanjali scraper", () => {
  before(() => {});
  Cypress.on("uncaught:exception", (err, runnable) => {
    cy.log(err);
    return false;
  });

  it("Get all the parent urls", () => {
      const parentUrls = [];
      cy.visit("https://www.patanjaliayurved.net/category/digestives/138");
      cy.get("div.categorytree>ul>li>ul>li>a").each(($a) => {
          cy.wrap($a).invoke("attr", "href").then((parentUrl) => {
              parentUrls.push({url: parentUrl});
          });
      }).then(() => {
        cy.log(parentUrls);
        cy.writeFile("cypress/fixtures/parentUrls.json",
          JSON.stringify(parentUrls, null, 2),
          { encoding: "utf-8", flag: "w", fixture: true });
      });
  });

  it("Get all the child urls", () => {
    const childUrls = [];
    cy.fixture("parentUrls").then((parentUrls) => {
      parentUrls.forEach((parentUrl) => {
        cy.visit(parentUrl);
        cy.get('div#gridview>div>article>figure>a.figure-href').each(($a) => {
            cy.wrap($a).invoke('attr', 'href').then((childUrl) => {
                childUrls.push({url: childUrl});
            });
        })
        // cy.get('div#gridview').then(($div) => {
        //     const childElements=$div.find('div>article>figure>a.figure-href');
        //     if(childElements?.length>0) {
        //         childElements.each(($a) => {
        //             $a
        //             cy.wrap($a).invoke('attr', 'href').then((childUrl) => {
        //                 childUrls.push({url: childUrl});
        //             });
        //         });
        //     }})

        // cy.get("div#gridview>div>article>figure>a.figure-href").then(($elements) => {
        //     if ($elements.length > 0) {
        //       $elements.each(($a) => {
        //         cy.wrap($a).invoke("attr", "href").then((childUrl) => {
        //             childUrls.push({ url: childUrl });
        //           });
        //       });
        //     }
        //   })
        .then(() => {
            cy.log(childUrls);
            cy.writeFile("cypress/fixtures/childUrls.json",
              JSON.stringify(childUrls, null, 2),
              { encoding: "utf-8", flag: "w", fixture: true }
            );
          });
        });
    });
  });

  // it("Get all the details from detail page", () => {

  //     const productDetails = [];
  //     productCategoryUrls.forEach(productCategoryUrl => {
  //         cy.visit(productCategoryUrl);
  //     });
  //     cy.get("div.categorytree>ul>li>ul>li>a").each(($a) => {
  //         cy.wrap($a).invoke("attr", "href").then((parentUrl) => {
  //         cy.visit(parentUrl);
  //         urls.push({url: parentUrl});
  //         cy.get("div#gridview>div>article>figure>a.figure-href").each(($a) => {
  //             $a.click();
  //             cy.get('div.container').then(($detailPage) => {
  //                 const breadcrumb1 = $detailPage.find('div.block-breadcrumb>ul>li:nth-child(2)>a').text();
  //                 const breadcrumb2 = $detailPage.find('div.block-breadcrumb>ul>li:nth-child(3)>a').text();
  //                 const breadcrumb3 = $detailPage.find('div.block-breadcrumb>ul>li:nth-child(4)').text();
  //                 data.push({breadcrumb1: breadcrumb1, breadcrumb2: breadcrumb2, breadcrumb3: breadcrumb3, });
  //                 cy.log('data: ' + data);
  //                 cy.writeFile("cypress/fixtures/data.txt",JSON.stringify(data, null, 2),
  //                 { encoding: "utf-8", flag: "w", fixture: true });
  //                 cy.go('back');
  //             });
  //             //body > section:nth-child(8) > div > div
  //             // let breadcrumb1;
  //             // let breadcrumb2;
  //             // let breadcrumb3;
  //             // cy.wrap($a).invoke("attr", "href").then((childUrl) => {
  //             // cy.visit(childUrl);
  //             // //cy.log("inner loop: " + childUrl);
  //             // cy.get("div.block-breadcrumb>ul>li:nth-child(2)>a").invoke('text').then(text => {
  //             //     breadcrumb1=text;
  //             // });
  //             // cy.get("div.block-breadcrumb>ul>li:nth-child(3)>a").invoke('text').then(text => {
  //             //     breadcrumb2=text;
  //             // });
  //             // cy.get("div.block-breadcrumb>ul>li:nth-child(4)").invoke('text').then(text => {
  //             //     breadcrumb3=text;
  //             // });
  //         }).then(() => {
  //             // data.push({breadcrumb1: breadcrumb1, breadcrumb2: breadcrumb2, breadcrumb3: breadcrumb3, });
  //             // cy.log('data: ' + data);
  //             // cy.writeFile("cypress/fixtures/data.txt",JSON.stringify(data, null, 2),
  //             // { encoding: "utf-8", flag: "w", fixture: true });
  //         });
  //     })
  //     .then(() => {
  //       cy.log(productDetails);
  //       cy.writeFile("cypress/fixtures/productDetails.txt",
  //         JSON.stringify(productDetails, null, 2),
  //         { encoding: "utf-8", flag: "w", fixture: true });
  //     });
  // });
  // });
});
