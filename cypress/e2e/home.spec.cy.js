describe('home page', () => {
    it('site deve estar online', () => {
        cy.viewport(1440, 900)
        cy.visit('https://www.samsung.com/br/')
        cy.get('h2[class="text-block-container__headline"]').should('have.text', 'DestaquesProcurando algo mais?')
    })
})