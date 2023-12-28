describe('product page', () => {
    it('validacao detalhada do produto', () => {
        // visita o site
        // cy.viewport(430, 932)
        cy.visit('https://www.samsung.com/br/')

        const smartwatch = 'Galaxy Watch6 (LTE, 44mm)'

        // pesquisa e seleciona o aparelho
        cy.get('button[class="nv00-gnb__utility-btn gnb__search-btn-js"]').click()
        cy.get('#gnb-search-keyword').type(smartwatch)
        cy.get('button[type=submit][an-ca=search]').click()
        cy.get('.result-list__wrap > :nth-child(1) > .result-item > .result-item__content > .result-title > .result-title__link')
            .click()

        // valida se foi para a pagina certa
        cy.get('[class="summary__product-name"]').should('have.text', smartwatch)

        // valida a cor selecionada
        cy.get('label[for="pd-color-1"]').click()
        cy.get('span[id=multiColorText]').should('have.text', 'Grafite')

        // ignorar token
        cy.on('uncaught:exception', (err, runnable) => {
            console.log(err)
            return false
        })

        // clicar no botao comprar
        cy.get('span a[aria-label="Comprar agora:Galaxy Watch6 (LTE, 44mm)"]')
            .should('have.text', 'Comprar agora').click()
        // cy.contains('continuar sua compra')

        // confere a existência do produto pela classe
        cy.get('.w-40 > span', { timeout: 60000 })

        // clica em comprar
        cy.get('[style="height: 100%;"] > .vtex-button').click({ force: true })

        // verifica se estou na pagina de carrinho
        cy.url().should('eq', 'https://shop.samsung.com/br/checkout/#/cart')

        // digita o cep
        cy.get('.srp-data > #shipping-calculate-link').click()
        cy.get('#ship-postalCode', { timeout: 60000 }).type('01310930')

        // valida de aceitou o cep
        cy.get('.srp-delivery-select')
    })
    it('cep em branco', () => {
        // visita o site
        // cy.viewport(430, 932)
        cy.visit('https://www.samsung.com/br/')

        const geladeira = 'Geladeira Bespoke 315L 1 porta Flex'

        // pesquisa e seleciona o aparelho
        cy.get('button[class="nv00-gnb__utility-btn gnb__search-btn-js"]').click()
        cy.get('#gnb-search-keyword').type(geladeira)
        cy.get('button[type=submit][an-ca=search]').click()
        cy.get('.result-list__wrap > :nth-child(1) > .result-item > .result-item__content > .result-title > .result-title__link')
            .click()

        // ignorar token
        cy.on('uncaught:exception', (err, runnable) => {
            console.log(err)
            return false
        })

        // clicar no botao comprar
        cy.get('span a[aria-label="Comprar agora:Geladeira Bespoke 315L 1 porta Flex"]')
            .should('have.text', 'Comprar agora').click()
        // cy.contains('continuar sua compra')

        // confere a existência do produto pela classe
        cy.get('.vtex-sticky-layout-0-x-container > .vtex-flex-layout-0-x-flexRow', { timeout: 60000 })

        // clica em comprar
        cy.get('[style="height: 100%;"] > .vtex-button').click({ force: true })

        // verifica se estou na pagina de carrinho
        cy.url().should('eq', 'https://shop.samsung.com/br/checkout/#/cart')

        // nao digita o cep
        cy.get('.srp-data > #shipping-calculate-link').click()
        cy.get('#ship-postalCode', { timeout: 60000 })

        // verifica mensagem de erro
        cy.get('.summary-to-new-components > .summary-template-holder > .row-fluid > .span5 > .coupon-column > .coupon > .coupon-form > .coupon-fieldset > [data-bind="fadeVisible: isUsingCoupon()"] > .coupon-fields > [data-bind="visible: !isCouponTyped()"] > #cart-coupon-add')
            .click()
        cy.get('span[class="help error"]').should('have.text', 'Campo obrigatório.')
    })
})