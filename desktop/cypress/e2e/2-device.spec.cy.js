describe('product page', () => {
    it('validacao detalhada do produto', () => {
        // visita o site
        // cy.viewport(1440, 900)
        cy.visit('https://www.samsung.com/br/')

        const smartphone = 'Galaxy S23 FE'

        // pesquisa e seleciona o aparelho
        cy.get('button[class="nv00-gnb__utility-btn gnb__search-btn-js"]').click()
        cy.get('#gnb-search-keyword').type(smartphone)
        cy.get('button[type=submit][an-ca=search]').click()
        cy.get('a[class="result-title__link"][data-href-target="/br/smartphones/galaxy-s/galaxy-s23-fe-mint-128gb-sm-s711blgjzto/"]').click()

        // valida a cor selecionada
        cy.get('#pd-header-gallery h2[class="pd-info__title"]').should('have.text', smartphone)
        cy.get('label[for="pd-color-2"]').click()
        cy.get('span[id=multiColorText]').should('have.text', 'Azul')

        // valida armazenamento selecionado
        cy.get('ul li div input[an-la="storage:128 gb"] + label span span span').should('have.text', 'R$ 3.999,00')
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

        // clicar no botao comprar
        cy.get('span a[aria-label="Comprar agora:Galaxy S23 FE"]').should('have.text', 'Comprar agora').click()
        // cy.contains('continuar sua compra')

        // confere a existência do produto pela classe
        cy.get('div[class="vtex-flex-layout-0-x-flexRow vtex-flex-layout-0-x-flexRow--page-product-info"]', { timeout: 60000 })

        // digitando e pesquisando o cep
        cy.get('input[placeholder="Digite o CEP"]', { timeout: 60000 }).type('01310930')
        cy.get('#buttonPostalCodePdp').click()

        // clica em comprar
        cy.get('div[class="vtex-flex-layout-0-x-flexColChild vtex-flex-layout-0-x-flexColChild--product-content-buy-info pb0"] button[type="button"] span')
            .should('have.text', 'COMPRAR AGORA').click({ force: true })

        // verifica se estou na pagina de carrinho
        cy.url().should('eq', 'https://shop.samsung.com/br/checkout/#/cart')
    })
    it('cep em branco', () => {
        // visita o site
        // cy.viewport(1440, 900)
        cy.visit('https://www.samsung.com/br/')

        const fone = 'Galaxy Buds FE'

        // pesquisa e seleciona o aparelho
        cy.get('button[class="nv00-gnb__utility-btn gnb__search-btn-js"]').click()
        cy.get('#gnb-search-keyword').type(fone)
        cy.get('button[type=submit][an-ca=search]').click()
        cy.get('a[class="result-img__link"][data-href-target="/br/audio-sound/galaxy-buds/galaxy-buds-fe-graphite-sm-r400nzapzto/"]')
            .click()

        // ignorar token
        cy.on('uncaught:exception', (err, runnable) => {
            console.log(err)
            return false
        })

        // clicar no botao comprar
        cy.get('span a[aria-label="Comprar agora:Galaxy Buds FE"]')
            .should('have.text', 'Comprar agora').click()
        // cy.contains('continuar sua compra')

        // confere a existência do produto pela classe
        cy.get('div[class="flex mt0 mb0 pt0 pb0    justify-start vtex-flex-layout-0-x-flexRowContent vtex-flex-layout-0-x-flexRowContent--page-product-info items-stretch w-100"]', { timeout: 60000 })

        // não digita o cep
        cy.get('input[placeholder="Digite o CEP"]', { timeout: 60000 })

        // clica em comprar
        cy.get('div[class="vtex-flex-layout-0-x-flexColChild vtex-flex-layout-0-x-flexColChild--product-content-buy-info pb0"] button[type="button"] span')
            .should('have.text', 'COMPRAR AGORA').click({ force: true })

        // valida mensagem de erro
        cy.get('span[id="error-message-cep-pdp"]')
            .should('have.text', 'CEP válido obrigatório.')
    })
})