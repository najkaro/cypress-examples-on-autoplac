import { loginPageData } from "./login-page.data.js"

export function getSubmitButton() {
    return cy.get('button[type="submit"]')
}