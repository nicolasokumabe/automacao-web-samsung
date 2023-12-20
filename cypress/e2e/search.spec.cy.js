describe('home page', () => {
    it('pesquisando por smartphone', () => {
        // visita o site
        // cy.viewport(1440, 900)
        cy.visit('https://www.samsung.com/br/')

        // pesquisa e seleciona o aparelho
        cy.get('button[class="nv00-gnb__utility-btn gnb__search-btn-js"]').click()
        cy.get('#gnb-search-keyword').type('Galaxy S23 FE')
        cy.get('button[type=submit][an-ca=search]').click()
        cy.get('a[class="result-title__link"][data-href-target="/br/smartphones/galaxy-s/galaxy-s23-fe-mint-128gb-sm-s711blgjzto/"]').click()

        // valida a pagina do aparelho - valida cor selecionada
        cy.get('#pd-header-gallery h2[class="pd-info__title"]').should('have.text', 'Galaxy S23 FE')
        cy.get('label[for="pd-color-2"]').click()
        cy.get('span[id=multiColorText]').should('have.text', 'Azul')

        // valida a pagina do aparelho - valida armazenamento selecionado
        cy.get('ul li div input[an-la="storage:128 gb"] + label span span span').should('have.text', 'R$ 3.699,00')
        cy.get('ul li div input[an-la="storage:256 gb"] + label span span span').should('not.have.text')
        // cy.get('#option-device-memory-IM003 > .pd-select-option__wrap > .pd-select-option__list > :nth-child(2) > .pd-option-selector > .pd-option-selector__label').click()
        cy.get('ul li div input[an-la="storage:256 gb"] + label[class="pd-option-selector__label"]').click()
        cy.get('.pd-option-selector__sub-text').should('not.have.text');
        cy.get('ul li div input[an-la="storage:256 gb"] + label span span span').should('have.text', 'R$ 4.499,00')
        cy.get('ul li div input[an-la="storage:128 gb"] + label span span span').should('not.have.text')

        // cy.get('span a[aria-label="Comprar agora:Galaxy S23 FE"]').click()

        cy.on('uncaught:exception', (err, runnable) => {
            console.log(err);
            return false;
        });

        cy.get('span a[aria-label="Comprar agora:Galaxy S23 FE"]').should('have.text', 'Comprar agora').click()
        cy.contains('continuar sua compra')
        cy.wait(20000)
        // cy.visit('https://www.samsung.com/br/smartphones/galaxy-s/galaxy-s23-fe-mint-128gb-sm-s711blgjzto/') 
        // // clica no botao de compra
        cy.get('div[class="vtex-flex-layout-0-x-flexRow vtex-flex-layout-0-x-flexRow--page-product-info"]')
        cy.get('.samsungbr-app-pdp-2-x-inputPostalCode').type('01310930')
    })
})