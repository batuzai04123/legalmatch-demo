const config = require('../fixtures/config.json')

export const fillUpRegistrationForm = () => {
    cy.get('[name=name]').type(config.name)
    cy.get('[name=phone]').type(config.phone)
    cy.get('[name=email]').type(config.email)
    cy.get('[name=country]').select(config.country)
    cy.get('[name=city]').type(config.city)
    cy.get('[name=username]').last().type(config.username)
    cy.get('[name=password]').last().type(config.password)
}