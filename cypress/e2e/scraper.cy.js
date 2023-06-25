describe('Collecting Data', () => {
    before(() => {
        cy.visit('https://bet.szerencsejatek.hu/cmsfiles/otos.html');
    });

    it('creating data object', () => {
        const results = [];
        cy.get('tr').each(($tr, index) => {
            if (index !== 0) {
                const rowElement = $tr.get(0);
                const cells = rowElement.cells;

                results.push({
                    year: cells[0].innerText,
                    week: cells[1].innerText,
                    drawDate: cells[2].innerText,
                    numbers: [
                        parseInt(cells[11].innerText, 10),
                        parseInt(cells[12].innerText, 10),
                        parseInt(cells[13].innerText, 10),
                        parseInt(cells[14].innerText, 10),
                        parseInt(cells[15].innerText, 10)
                    ]
                });
            }
            const largeString = JSON.stringify(results);
            return cy.writeFile('cypress/fixtures/output.txt', largeString, 
                { encoding: 'utf-8', flag: 'w', fixture: true });
        }).then(() => {
            console.log(results);
        });
    });
});