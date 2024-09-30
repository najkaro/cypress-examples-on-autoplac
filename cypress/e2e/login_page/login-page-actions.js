import { loginPageData } from "./login-page.data.js"

export function getSubmitButton() {
    return cy.get('button[type="submit"]')
}

export function getErrorMessage() {
    return cy.get('.message > .p-error > span').should('be.visible')
}

export function getPhoneNumberField() {
    return cy.get('.ng-star-inserted > .ng-formfield')
}

export function getPasswordField() {
    return cy.get('.ng-formfield > input')
}

export function closePrivacyChoicesPopup() {
    cy.get('.unic-modal-container').should('be.visible')
    cy.contains('Zgadzam się i kontynuuj').click()
    cy.get('.unic-modal-container').should('not.exist')
}

export function getInvalidDataPopup() {
    cy.get('.snackbar__container').should('be.visible').contains(loginPageData.invalidDataPopup)         
}