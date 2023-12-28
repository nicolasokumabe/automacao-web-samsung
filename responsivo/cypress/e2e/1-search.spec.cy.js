describe('search page', () => {
    it('pesquisando por notebook', () => {
        // visita o site
        // cy.viewport(430, 932)
        cy.visit('https://www.samsung.com/br/')

        const notebook = 'Galaxy Book2'

        // pesquisa o aparelho
        cy.get('button[class="nv00-gnb__utility-btn gnb__search-btn-js"]').click()
        cy.get('#gnb-search-keyword').type(notebook)
        cy.get('button[type=submit][an-ca=search]').click()

        // valida tab-bar list - apenas "Produtos" deve estar selecionado
        cy.get('ul[class="srp-tab-bar__list"]')

        cy.get('li[data-tab-name="Tudo"]').contains('Selecionado').should('not.exist')
        cy.get('li[data-tab-name="Produtos"]').contains('Selecionado')
        // cy.get('li[data-tab-name="Acessórios"]').contains('Selecionado').should('not.exist')
        cy.get('li[data-tab-name="Suporte"]').contains('Selecionado').should('not.exist')

        // verificar se encontrou o produto
        cy.contains(notebook)

        // clica no smartphone desejado
        cy.get('.result-list__wrap > :nth-child(1) > .result-item > .result-item__content > .result-title > .result-title__link')
            .contains(notebook).click()

        // valida se foi para a pagina correta
        cy.wait(2000)
        cy.get('.pd-header-navigation__headline-text')
            .should('have.text', 'Galaxy Book2')
    })
})