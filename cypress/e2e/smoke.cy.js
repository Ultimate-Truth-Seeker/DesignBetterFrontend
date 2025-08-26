describe('smoke', () => {
  it('loads homepage', () => {
    cy.visit('/')
    cy.contains('p') // ajusta a algo que exista en tu app
  })
})