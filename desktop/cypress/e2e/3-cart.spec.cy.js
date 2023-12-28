describe('cart page', () => {
    it('testando a funcionalidade de carrinho de compras', () => {
        // visita o site
        // cy.viewport(1440, 900)
        cy.visit('https://www.samsung.com/br/')

        const monitor = 'Monitor Samsung Odyssey G30 24”'
        const cep = '01310-930'

        // pesquisa e seleciona o aparelho
        cy.get('button[class="nv00-gnb__utility-btn gnb__search-btn-js"]').click()
        cy.get('#gnb-search-keyword').type(monitor)
        cy.get('button[type=submit][an-ca=search]').click()
        cy.get('.result-list__wrap > :nth-child(1) > .result-item > .result-item__content > .result-title > .result-title__link')
            .should('have.text', monitor).click()

        // ignorar token
        cy.on('uncaught:exception', (err, runnable) => {
            console.log(err)
            return false
        })

        // clicar no botao comprar
        cy.get('.cost-box__cta > .cta').should('have.text', 'Comprar agora')
            .click()

        // confere a existência do produto pela classe
        cy.get('.vtex-flex-layout-0-x-flexRowContent--page-product-info', { timeout: 60000 })

        // digitando e pesquisando o cep
        cy.get('input[placeholder="Digite o CEP"]', { timeout: 60000 })
            .type(cep)
        cy.get('#buttonPostalCodePdp').click()
        cy.get('.samsungbr-app-pdp-2-x-deliveryBody')

        // clica em comprar
        cy.get('div[class="vtex-flex-layout-0-x-flexColChild vtex-flex-layout-0-x-flexColChild--product-content-buy-info pb0"] button[type="button"] span')
            .should('have.text', 'COMPRAR AGORA').click({ force: true })

        // verifica se estou na pagina de carrinho
        cy.url().should('eq', 'https://shop.samsung.com/br/checkout/#/cart')

        // valida conteudo do carrinho
        cy.get('.full-cart')
        cy.get('#product-name3861', { timeout: 60000 })

        // valida opcoes de entrega
        cy.get('.srp-main-title').should('have.text', 'Entrega', { timeout: 60000 })
        cy.contains('a.srp-address-title', '01310-930')
            .should('exist').and('have.class', 'blue').and('have.text', cep)

        // valida a quantidade do item
        // cy.get('#item-quantity-3861', { timeout: 60000 }).should('have.length', 1)

        // valida o aumento de produtos
        cy.get('#item-quantity-change-increment-3861 > .icon').click()
        // cy.get('#item-quantity-3861', { timeout: 60000 }).should('have.length', 2)

        // aguarda atualizar o numero
        cy.wait(5000)

        // valida a diminuicao de produtos
        cy.get('#item-quantity-change-decrement-3861 > .icon').click()
        // cy.get('#item-quantity-3861', { timeout: 60000 }).should('have.length', 1)

        // remove o produto
        cy.get('#item-remove-3861 > .icon').click()

        // valida mensagem de remocao
        cy.get('.img-empty-cart')
        cy.get('.empty-cart-title').should('have.text', 'Seu carrinho está vazio.')
        cy.get('.empty-cart-message > p')
            .should('have.text', 'Para continuar comprando, navegue pelas categorias do site ou faça uma busca pelo seu produto.')

        // clica em voltar para a pagina inicial  
        cy.get('#cart-choose-products')
            .click()

        // valida se voltou para a pagina inicial
        cy.url().should('eq', 'https://www.samsung.com/br/offer/')
        cy.get('.text-block-container__headline')
            .should('have.text', 'Conheça nossas ofertas')
    })
})