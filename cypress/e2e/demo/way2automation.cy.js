/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

import {fillUpRegistrationForm} from '../../steps/way2automation'

const config = require('../../fixtures/config.json')

describe('LegalMatch Automation Exam', () => {

    beforeEach(() => {
        // cy.viewport('macbook-16')
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

        // cy.get('.elementor-image-box-title').scrollIntoView().should('be.visible')
        cy.contains('30+ Courses video library FREE ACCESS').scrollIntoView().should('be.visible')

        // cy.contains('30+ Courses video library FREE ACCESS')
        //     .parents('section').next('section').find('.swiper-wrapper')
        //     .each((el, index, $list) => {
                
        //         cy.get('h4').filter(':contains("Automation Architect Selenium with 7 live projects")').then(project => {
        //             const isVisible = Cypress.dom.isVisible(project)
        //             // cy.log(isVisible)
        //             if (isVisible) {
        //                 return false
        //             } else {
        //                 cy.get('div.swiper-button-next').scrollIntoView()
        //                 cy.get('div.swiper-button-next').click()
        //             }
                    
        //         })
            // })
        cy.contains('Automation Architect Selenium with 7 live projects', {timeout: 15000}).should('be.visible')
    })
})