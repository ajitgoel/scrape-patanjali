describe('Patanjali scraper', () => {
    before(() => {

    });
    it('creating data object', () => {
        cy.visit('https://www.patanjaliayurved.net/category/digestives/138');
        const urls=[];
        cy.get('div.categorytree>ul>li>ul>li>a').each(($a) => {
            cy.wrap($a).invoke('attr', 'href').then((href) => {
                cy.visit(href);
                //cy.log(href);
                cy.get('div.col-md-9.col-sm-9.col-xs-12.filter-sidebar-box-right>div>h1>span')
                    .invoke('text').then(text => {
                        urls.push({url: href, heading: text});
                });
                cy.get('div#gridview>div>article>figure>a.figure-href').each(($a) => {
                    cy.wrap($a).invoke('attr', 'href').then((href) => {
                        cy.visit(href);
                        cy.log('inner loop: ' + href);
                    });
                });
            }).then(() => {
                //cy.log(urls);
            });
        }).then(() => {
            cy.log(urls);
            cy.writeFile('cypress/fixtures/output.txt', JSON.stringify(urls, null, 2), 
                { encoding: 'utf-8', flag: 'w', fixture: true });
        });
    });
});