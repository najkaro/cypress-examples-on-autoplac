/// <reference types="cypress" />

import { getSubmitButton } from "./login-page-actions"
import { loginPageData } from "./login-page.data"

describe ('Login page', () => {
    it('should redirect to the proper page', () => {
        cy.visit('/')
        cy.get('.header__item--login').click()
        cy.url().should('include', loginPageData.loginUrl)
    })

    beforeEach('open login page', () => {
        cy.visit('/auth/login')
    })
    context('login form', () => {
        it('should have proper elements', () => {
            cy.get('.ng-formfield > label').eq(0).invoke('text').should('contain', loginPageData.phoneNumberFieldLabel)
            cy.get('.ng-formfield > label').eq(1).invoke('text').should('contain', loginPageData.passwordFieldLabel)
            getSubmitButton().invoke('text').should('contain', loginPageData.submitButton)
        })
    })
})