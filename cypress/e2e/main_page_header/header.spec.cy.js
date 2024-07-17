/// <reference types="cypress" />

import {headerData} from "./header.data"

describe('Main Page', () => {
    beforeEach('open homepage', () => {
      cy.visit('/')
    })
      it('should show expected text and should redirect to proper pages', () => {
        //Radio Yanosik
        cy.get('.header__menu').children().eq(0).invoke('text').then(text => {
          expect(text).to.equal(headerData.radioButton)
        });
        cy.get('.header__menu').children().eq(0).invoke('attr', 'href').should('contain', headerData.radioPage);
  
        //Moje poszukiwania
        cy.get('.header__menu').children().eq(1).invoke('text').then(text => {
          expect(text).to.equal(headerData.mySearchButton)
        });
        cy.get('.header__menu').children().eq(1).invoke('attr', 'href').should('contain', headerData.mySearchPage);
  
        //Wystaw ogłoszenie
        cy.get('.header__menu').children().eq(2).invoke('text').then(text => {
          expect(text).to.equal(headerData.postAdButton)
        });
        cy.get('.header__menu').children().eq(2).invoke('attr', 'href').should('contain', headerData.postAdPage);
  
        //Aktualności
        cy.get('.header__menu').children().eq(3).find('img').invoke('attr', 'alt').should('contain', headerData.newsButton)
        
        // Zaloguj
        cy.get('.header__menu').children().eq(4).invoke('text').then(text => {
          expect(text).to.equal(headerData.logInButton)
        });
        cy.get('.header__menu').children().eq(4).find('a').invoke('attr', 'href').should('contain', headerData.logInPage);
      })
})