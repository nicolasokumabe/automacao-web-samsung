describe('home page', () => {
    it('pesquisando por smartphone', () => {
        // visita o site
        // cy.viewport(1440, 900)
        cy.visit('https://www.samsung.com/br/')

        const smartphone = 'Galaxy S23 FE'

        // pesquisa e seleciona o aparelho
        cy.get('button[class="nv00-gnb__utility-btn gnb__search-btn-js"]').click()
        cy.get('#gnb-search-keyword').type(smartphone)
        cy.get('button[type=submit][an-ca=search]').click()
        cy.get('a[class="result-title__link"][data-href-target="/br/smartphones/galaxy-s/galaxy-s23-fe-mint-128gb-sm-s711blgjzto/"]').click()

        // valida a pagina do aparelho - valida cor selecionada
        cy.get('#pd-header-gallery h2[class="pd-info__title"]').should('have.text', smartphone)
        cy.get('label[for="pd-color-2"]').click()
        cy.get('span[id=multiColorText]').should('have.text', 'Azul')

        // valida a pagina do aparelho - valida armazenamento selecionado
        cy.get('ul li div input[an-la="storage:128 gb"] + label span span span').should('have.text', 'R$ 3.699,00')
        cy.get('ul li div input[an-la="storage:256 gb"] + label span span span').should('not.have.text')
        cy.get('ul li div input[an-la="storage:256 gb"] + label[class="pd-option-selector__label"]').click()
        cy.get('.pd-option-selector__sub-text').should('not.have.text')
        cy.get('ul li div input[an-la="storage:256 gb"] + label span span span').should('have.text', 'R$ 4.499,00')
        cy.get('ul li div input[an-la="storage:128 gb"] + label span span span').should('not.have.text')

        // ignorar token
        cy.on('uncaught:exception', (err, runnable) => {
            console.log(err)
            return false
        })

        // clicar no botão comprar
        cy.get('span a[aria-label="Comprar agora:Galaxy S23 FE"]').should('have.text', 'Comprar agora').click()
        // cy.contains('continuar sua compra')

        // confere a existência do produto pela classe
        cy.get('div[class="vtex-flex-layout-0-x-flexRow vtex-flex-layout-0-x-flexRow--page-product-info"]')

        // digitando e pesquisando o cep
        cy.get('input[placeholder="Digite o CEP"]', { timeout: 60000 }).type('01310930')
        cy.get('#buttonPostalCodePdp').click()

        // clica em comprar
        cy.get('div[class="vtex-flex-layout-0-x-flexColChild vtex-flex-layout-0-x-flexColChild--product-content-buy-info pb0"] button[type="button"] span')
            .should('have.text', 'COMPRAR AGORA').click({ force: true })

        // verifica se estou na pagina de carrinho
        cy.url().should('eq', 'https://shop.samsung.com/br/checkout/#/cart')

        // valida conteúdo do carrinho
        cy.get('.full-cart')
    })
})