import App from './App'

describe('<App />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<App />)

    cy.findByRole('button', { name: 'Button 1'}).should('be.visible')
    cy.findByRole('checkbox', { name: 'Enabled'}).should('be.checked')

    // spinbutton role is standard
    cy.findByRole('spinbutton', { name: 'number'}).should('have.value', 100)

    // colorpicker role was passed to ColorPicker as a prop (not recognized by TS)
    cy.findByRole('colorpicker').should('have.text', '#154194')

    cy.findByRole('textbox', { name: 'Select date'}).should('be.visible')

    // regex must be used for buttons with icons (that is stupid)
    cy.findByRole('button', { name: /Open Modal/}).click()
    cy.findByRole('dialog', { name: 'Basic Modal' }).should('be.visible')
  })
})