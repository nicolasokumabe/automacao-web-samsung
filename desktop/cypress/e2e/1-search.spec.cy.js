describe('search page', () => {
    it('pesquisando por tablet', () => {
        // visita o site
        // cy.viewport(1440, 900)
        cy.visit('https://www.samsung.com/br/')

        const tablet = 'Galaxy Tab A8 (Wi-Fi)'

        // pesquisa o aparelho
        cy.get('button[class="nv00-gnb__utility-btn gnb__search-btn-js"]').click()
        cy.get('#gnb-search-keyword').type(tablet)
        cy.get('button[type=submit][an-ca=search]').click()

        // valida tab-bar list - apenas "Produtos" deve estar selecionado
        cy.get('ul[class="srp-tab-bar__list"]')

        cy.get('li[data-tab-name="Tudo"]').contains('Selecionado').should('not.exist')
        cy.get('li[data-tab-name="Produtos"]').contains('Selecionado')
        // cy.get('li[data-tab-name="Acessórios"]').contains('Selecionado').should('not.exist')
        cy.get('li[data-tab-name="Suporte"]').contains('Selecionado').should('not.exist')

        // verificar se encontrou o produto
        cy.contains(tablet)

        // clica no smartphone desejado
        cy.get('[class="result-title line-clamp-mobile-3"] [data-modelcode="sm-x200nzauzto"]')
            .contains(tablet).click()

        // valida se foi para a pagina correta
        cy.get('.pd-buying-tool__info > .pd-info > .pd-info__title')
            .contains(tablet)
    })
})