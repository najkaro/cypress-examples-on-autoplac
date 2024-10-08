/// <reference types="cypress" />

import {headerData} from "./header.data"

describe('Main Page', () => {
    beforeEach('open homepage', () => {
      cy.visit('/')
    })
      it('should show expected text and should redirect to proper pages', () => {
      //Blog
      cy.get('.header__menu').children().eq(0).invoke('text').then(text => {
        expect(text).to.equal(headerData.blogButton)
      });
      cy.get('.header__menu').children().eq(0).invoke('attr', 'href').should('contain', headerData.blogPage);      
      
      //Wyceń auto
      cy.get('.header__menu').children().eq(1).invoke('text').then(text => {
        expect(text).to.contain(headerData.estimateCarButton)
      });
      cy.get('.header__menu').children().eq(1).invoke('attr', 'href').should('contain', headerData.estimateCarPage);
     
      //Finansowanie
      cy.get('.header__menu').children().eq(2).invoke('text').then(text => {
        expect(text).to.contain(headerData.financingButton)
      });
      cy.get('.header__menu').children().eq(2).invoke('attr', 'href').should('contain', headerData.financingPage);

      //Wystaw ogłoszenie
      cy.get('.header__menu').children().eq(3).invoke('text').then(text => {
        expect(text).to.contain(headerData.postAdButton)
      });
      cy.get('.header__menu').children().eq(3).invoke('attr', 'href').should('contain', headerData.postAdPage);
  
      //Ulubione
      cy.get('.header__menu').children().eq(4).find('img').invoke('attr', 'alt').should('contain', headerData.favoriteButton)
      cy.get('.header__menu').children().eq(4).invoke('attr', 'href').should('contain', headerData.favoritePage) 

      //Aktualności
      cy.get('.header__menu').children().eq(5).find('img').invoke('attr', 'alt').should('contain', headerData.newsButton)
        
      // Zaloguj
      cy.get('.header__menu').children().eq(6).invoke('text').then(text => {
        expect(text).to.contain(headerData.logInButton)
      });
      cy.get('.header__menu').children().eq(6).invoke('attr', 'href').should('contain', headerData.logInPage);
      })
})