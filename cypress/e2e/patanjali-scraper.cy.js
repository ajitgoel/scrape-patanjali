describe('Patanjali scraper', () => {
    before(() => {

    });
    it('creating data object', () => {
        cy.visit('https://www.patanjaliayurved.net/category/digestives/138');
        const urls=[];
        cy.get('div.categorytree>ul>li>ul>li>a').each(($a) => {
            cy.wrap($a).invoke('attr', 'href').then((href) => {
                urls.push({url: href});
            });
        }).then(() => {
            cy.log(urls);
        });
    });
});