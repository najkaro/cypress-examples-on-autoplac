/// <reference types="cypress" />

import { loginPageData } from "./login-page.data"

describe ('Login page', () => {
    it('should redirect to the proper page', () => {
        cy.visit('/')
        cy.get('.header__item--login').click()
        cy.url().should('include', loginPageData.loginUrl)
    })
})