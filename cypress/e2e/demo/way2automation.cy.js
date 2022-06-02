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

        cy.url().should('equal', "https://www.selenium-tutorial.com/p/automation-architect-in-selenium-7-live-projects")
        
    })
})

