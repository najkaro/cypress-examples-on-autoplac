import { loginPageData } from "./login-page.data.js"

export function getSubmitButton() {
    return cy.get('button[type="submit"]')
}

export function getErrorMessage() {
    return cy.get('.message > .p-error > span').should('be.visible')
}