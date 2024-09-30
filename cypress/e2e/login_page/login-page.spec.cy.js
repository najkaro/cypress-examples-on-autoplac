/// <reference types="cypress" />

import { closePrivacyChoicesPopup, getErrorMessage, getInvalidDataPopup, getPasswordField, getPhoneNumberField, getSubmitButton } from "./login-page-actions"
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
    context('login form elements', () => {
        it('should have proper elements', () => {
            cy.get('.ng-formfield > label').eq(0).invoke('text').should('contain', loginPageData.phoneNumberFieldLabel)
            cy.get('.ng-formfield > label').eq(1).invoke('text').should('contain', loginPageData.passwordFieldLabel)
            getSubmitButton().invoke('text').should('contain', loginPageData.submitButton)
        })

        it('should redirect to forget password page', () => {
            cy.get('.login__links-wrapper').children().eq(0).invoke('text').should('contain', loginPageData.forgetPasswordInfo)
            cy.get('.login__links-wrapper').should('be.visible').children().eq(0).click()
            cy.url().should('include', loginPageData.resetPasswordUrl)
        })

        it('should redirect to register page', () => {
            cy.get('.login__links-wrapper').children().eq(1).invoke('text').should('contain', loginPageData.registerInfo)
            cy.get('.login__links-wrapper').should('be.visible').children().eq(1).click()
            cy.url().should('include', loginPageData.registerUrl)
        })      
    })
    context.only('login actions', () => {
        it('should not allow to login when empty fields', () => {
            cy.get('button[type="submit"]').click()
            getErrorMessage().eq(0).invoke('text').should('include', loginPageData.emptyPhoneNumberError)
            getErrorMessage().eq(1).should('contain', loginPageData.emptyPasswordError)
            cy.url().should('include', loginPageData.loginUrl)
        }) 
        
        it('should login successfully using valid phone number and password', () => {
            getPhoneNumberField().type(loginPageData.phoneNumber)
            getPasswordField().type(loginPageData.password)
            getSubmitButton().click()
            cy.url().should('not.include', loginPageData.loginUrl)
            cy.get('.header__menu').children().eq(6).invoke('text').should('contain', loginPageData.myAccount)         
        })
        
        it('should not login when is invalid phone number', () => {        
            getPhoneNumberField().type(loginPageData.phoneNumber)
            getPhoneNumberField().click()
            getPhoneNumberField().type('{backspace}')
            getErrorMessage().should('contain', loginPageData.invalidPhoneNumberError)
            getPhoneNumberField().should('not.have.value', loginPageData.phoneNumber)
            closePrivacyChoicesPopup()
            getPhoneNumberField().click()
            getPhoneNumberField().type('1')
            getPasswordField().type(loginPageData.password)
            getSubmitButton().click()
            cy.url().should('include', loginPageData.loginUrl)
            cy.get('.header__menu').children().eq(4).invoke('text').should('not.contain', loginPageData.myAccount)
            getInvalidDataPopup()
        }) 
        
        it('should not logIn when is invalid password', () => {        
            getPhoneNumberField().type(loginPageData.phoneNumber)
            getPasswordField().type(loginPageData.password)
            getPasswordField().click()
            closePrivacyChoicesPopup()
            getPasswordField().type('{backspace}')
            getSubmitButton().click()
            cy.url().should('include', loginPageData.loginUrl)
            cy.get('.header__menu').children().eq(4).invoke('text').should('not.contain', loginPageData.myAccount)
            getInvalidDataPopup()
        })
    })
})