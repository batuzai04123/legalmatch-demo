/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

import {fillUpRegistrationForm, waitFor7LiveProject} from '../../steps/way2automation'

const config = require('../../fixtures/config.json')

describe('LegalMatch Automation Exam', () => {

    beforeEach(() => {
        cy.viewport('macbook-16')
        cy.visit(config.url)
    })

    it('Automate Way2Automation Website', () => {
        
        cy.xpath("//h2[text()='Submit Button Clicked']/parent::a")
            .then((el) => {
                const link = el.attr('href')
                cy.log(link)
                cy.visit(link)
            })

        fillUpRegistrationForm()

        cy.contains('EXPLORE LIFETIME MEMBERSHIP').click({force: true})
        cy.contains('30+ Courses video library FREE ACCESS').scrollIntoView().should('be.visible')
        
        waitFor7LiveProject()

        cy.get("h4").contains("Automation Architect Selenium with 7 live projects").parents('div.pp-info-box-title-wrap').next('.pp-info-box-footer').find('a').click()

        cy.origin('www.selenium-tutorial.com', () => {
            cy.url().should('equal', "https://www.selenium-tutorial.com/p/automation-architect-in-selenium-7-live-projects")
            cy.get('#more_lecture_sections').click()
            cy.contains("CucumberParallelWithPageObjects - Project Code").click()
        })

        cy.contains('CucumberParallelWithPageObjects - Project Code').should('be.visible')
    
        cy.origin('www.selenium-tutorial.com', () => {
            cy.visit("https://www.selenium-tutorial.com/p/automation-architect-in-selenium-7-live-projects")  

            // 13. Select "Pay in British Pounds"
            cy.get('h3').contains('Pay in British Pounds').parents('label').click()

            // 14. Assert the value is equals to "£15"
            cy.get('h3').contains('Pay in British Pounds').parent('.product-details').next('.product-price').find('.default-product-price')
                .should('have.text', '£15')

            // 15. Click on "Enroll in Course"
            // 16. Assert that the button is changed from "Enroll in Course" to "Processing..."
            cy.get('#enroll-button').then(el => {
                cy.wrap(el).click()
            }).should('contain.text', 'Processing...')
        })

        
        cy.origin('teachable.com', () => {
            const clickandCheck = (selector) => {
                cy.get(`#${selector}`).click()
                cy.get('span').contains('Contact Information').click()
                cy.get(`#${selector}`).parent().next().find('span').contains('Cannot be blank')
            }

            const getIframe = (selector) => {
                return cy
                    .get(`${selector} iframe`)
                    .its('0.contentDocument.body').should('not.be.empty')
                    .then(cy.wrap)
            }

            //17. Assert the page loaded contains "Order Summary"
            cy.get('span').contains('Order Summary').should('be.visible')
            
            // 18. Click on each of the input boxes
            // 19. Verify when navigating away on each boxes, an error field will be displayed
            clickandCheck('email')
            clickandCheck('username')
            clickandCheck('cardName')
            
            getIframe('#cardNumber').find('[name="cardnumber"]').click()
            cy.get('span').contains('Contact Information').click()
            cy.get(`#cardNumber`).next().find('span').contains('Cannot be blank')

            getIframe('#cardExpiration').find('[name="exp-date"]').click()
            cy.get('span').contains('Contact Information').click()
            cy.get(`#cardExpiration`).next().find('span').contains('Cannot be blank')

            getIframe('#cardCvc').find('[name="cvc"]').click()
            cy.get('span').contains('Contact Information').click()
            cy.get(`#cardCvc`).next().find('span').contains('Cannot be blank')
            
            clickandCheck('billingStreetAddressLine1')
            clickandCheck('billingCity')

            // 20. Screenshot the entire page.
            cy.screenshot()
        })
    })
})