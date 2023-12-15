describe('home page', () => {
    it('pesquisando por smartphone', () => {
        cy.viewport(1440, 900)
        cy.visit('https://www.samsung.com/br/')

        cy.get('button[class="nv00-gnb__utility-btn gnb__search-btn-js"]').click()
        cy.get('#gnb-search-keyword').type('Galaxy S23 FE')
        cy.get('button[type=submit][an-ca=search]').click()

        cy.get('a[class="result-title__link"][data-href-target="/br/smartphones/galaxy-s/galaxy-s23-fe-mint-128gb-sm-s711blgjzto/"]').click()
        cy.get('#pd-header-gallery h2[class="pd-info__title"]').should('have.text', 'Galaxy S23 FE')
        cy.get('label[for="pd-color-2"]').click()
        cy.get('span[id=multiColorText]').should('have.text', 'Azul')

    })
})