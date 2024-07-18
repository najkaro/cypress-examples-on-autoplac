/// <reference types="cypress" />

import {seoData} from "./seo.data"

describe('Main Page', () => {
    beforeEach('open homepage', () => {
      cy.visit('/')
    })
    it('check text and redirect from seo chips', () => {
        cy.get('.seo__link').each((a, index) => {
          const expectedChipsName = seoData.seoChips[index].chipsName;
          const expectedChipsLink = seoData.seoChips[index].link;
          cy.wrap(a).should('contain.text', expectedChipsName)
          cy.wrap(a).should('have.attr', 'href', expectedChipsLink)
        })
      })
})