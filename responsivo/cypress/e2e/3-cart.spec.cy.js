describe('cart page', () => {
    it('testando a funcionalidade de carrinho de compras', () => {
        // visita o site
        // cy.viewport(430, 932)
        cy.visit('https://www.samsung.com/br/')

        const tv = 'Smart TV 85" Neo QLED 8K'
        const cep = '01310-930'

        // pesquisa e seleciona o aparelho
        cy.get('button[class="nv00-gnb__utility-btn gnb__search-btn-js"]').click()
        cy.get('#gnb-search-keyword').type(tv)
        cy.get('button[type=submit][an-ca=search]').click()
        cy.get('.result-list__wrap > :nth-child(1) > .result-item > .result-item__content > .result-title > .result-title__link')
            .contains(tv).click()

        // ignorar token
        cy.on('uncaught:exception', (err, runnable) => {
            console.log(err)
            return false
        })

        // clicar no botao comprar
        cy.get('.cost-box__cta > .cta').should('have.text', 'Comprar agora')
            .click()

        // confere a existência do produto pela classe
        cy.get('.vtex-flex-layout-0-x-flexRow', { timeout: 60000 })

        // clicando em comprar
        cy.get('.vtex-add-to-cart-button-0-x-buttonText').click({ force: true })

        // verifica se estou na pagina de carrinho
        cy.url().should('eq', 'https://shop.samsung.com/br/checkout/#/cart')

        // digita o cep
        cy.get('.srp-data > #shipping-calculate-link').click()
        cy.get('#ship-postalCode', { timeout: 60000 }).type('01310930')

        // valida conteudo do carrinho
        cy.get('.full-cart')
        cy.contains(tv, { timeout: 60000 })

        // valida opcoes de entrega
        cy.get('.srp-main-title').should('have.text', 'Entrega', { timeout: 60000 })
        cy.contains('a.srp-address-title', '01310-930')
            .should('exist').and('have.class', 'blue').and('have.text', cep)

        // valida o aumento de produtos
        cy.get('#item-quantity-change-increment-4647 > .icon').click()

        // aguarda atualizar o numero
        cy.wait(5000)

        // valida a diminuicao de produtos
        cy.get('#item-quantity-change-decrement-4647 > .icon').click()
        // cy.get('#item-quantity-3861', { timeout: 60000 }).should('have.length', 1)

        // remove o produto
        cy.get('#item-remove-4647 > .icon').click()

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