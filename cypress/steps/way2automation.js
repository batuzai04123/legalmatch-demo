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

/**
 * Recursive function to continuously find 
 * the Automation Architect Selenium with 7 live projects from carousel
 */
export const waitFor7LiveProject = () => {
    cy.get("h4").contains("Automation Architect Selenium with 7 live projects").then(($proj) => {
        if ($proj.is(':visible')) {
            return
        }
        cy.get('div.swiper-button-prev').scrollIntoView()
        cy.get('div.swiper-button-prev').click({force: true})
        waitFor7LiveProject()
    })
}

export const clickOnEveryTextInput = () => {
    clickandCheck('email')
}

const clickandCheck = (selector) => {
    cy.get(`#${selector}`).click()
    cy.get('span').contains('Contact Information').click()
    cy.get(`#${selector}`).parent().next().find('span').contains('Cannot be blank')
}