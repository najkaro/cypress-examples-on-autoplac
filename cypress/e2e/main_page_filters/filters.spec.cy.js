/// <reference types="cypress" />

import { should } from "chai"
import { filtersData } from "./filters.data"
import { brandsAndModelData } from "./brands-and-models.data"
import { checkBrandAndModelText, checkCarBodyTypeText, checkOnlyOnAutoplacText, checkPriceFText, checkSpecialProgramText, checkVehicleTypeDefaultText, checkVehicleTypeText, checkYearOfProductionText, defaultVehicleTypeSelectedPopup, getBrandAndModelField, getCarBodyTypeField, getFilterChips, getLocationField, getMoreFiltersButton, getOnlyOnAutoplacCheckbox, getOnlyOnAutoplacField, getPriceField, getRandomVehicleType, getShowOffersButton, getSpecialProgramField, getVehicleTypeField, getYearOfProductionField } from "./filters-actions"

describe('Main Page', () => {
    beforeEach('open homepage', () => {
      cy.visit('/')
    })
    context ('checking filters inputs', () => {

        it('check filter input names', () => {
          cy.get('.main__form').children().should('be.visible')
          checkVehicleTypeText()
          checkBrandAndModelText()
          checkPriceFText()
          checkYearOfProductionText()
          checkCarBodyTypeText()
          checkOnlyOnAutoplacText()
          getOnlyOnAutoplacCheckbox().should('not.be.checked')      
          checkSpecialProgramText()
        })
        it('should show vehicle type field popup', () => {
         getVehicleTypeField().click()
         cy.get('.filter-popup__header').invoke('text').should('contain', filtersData.mainVehiceTypePopup[0].headerName)
         cy.get('nwa-filter-dialog-wrapper label').each((label, index) =>{
          const expectedType = filtersData.mainVehiceTypePopup[0].vehicleType[index].type
          cy.wrap(label).should('contain', expectedType)
         })
        })
  
        it('should show brand and model popup and set default vehicle type', () => {
          getBrandAndModelField().click()
          cy.get('.filter-popup__header').invoke('text').should('contain', brandsAndModelData.brandsAndModelsPopup[0].brandHeaderName)
          cy.get('.filter-popup__text-search').invoke('text').should('contain', brandsAndModelData.brandsAndModelsPopup[0].brandSearchFieldText)
          cy.get('.filter > .filter__text > :nth-child(1)').each((text, index) => {
            const expectedBrand = brandsAndModelData.brandsAndModelsPopup[0].passengerCars[index].brand
            console.log(expectedBrand.length)
            cy.wrap(text).should('contain', expectedBrand)
          })
          defaultVehicleTypeSelectedPopup()
          checkVehicleTypeDefaultText()
        })
  
        it('should show price popup and set default vehicle type', () => {
          getPriceField().click()
          cy.get('.range-dialog__title').invoke('text').should('contain', filtersData.pricePopupHeaderName)
          cy.get('.range-dialog__controls').children().eq(0).invoke('text').should('contain', filtersData.pricePopupFromInput)
          cy.get('.p-autocomplete-panel').should('be.visible')
          cy.get('.range-dialog__controls').children().eq(1).invoke('text').should('contain', filtersData.pricePopupToInput)
          cy.get('.range-dialog__buttons').children().eq(0).invoke('text').should('contain', filtersData.pricePopupCancelButton)
          cy.get('.range-dialog__buttons').children().eq(1).invoke('text').should('contain', filtersData.pricePopupSaveButton)       
          defaultVehicleTypeSelectedPopup()
          checkVehicleTypeDefaultText()
        })
  
        it('should show year of production popup and set defoult vehicle type', () => {
          getYearOfProductionField().click()
          cy.get('.range-dialog__title').invoke('text').should('contain', filtersData.yearOfProductionPopupHeaderName)
          cy.get('.p-autocomplete-panel').should('be.visible')
          cy.get('.range-dialog__controls').children().eq(0).should('contain', filtersData.yearOfProductionPopupFromInput)
          cy.get('.range-dialog__controls').children().eq(1).should('contain', filtersData.yearOfProductionPopupToInput)
          cy.get('.range-dialog__buttons').children().eq(0),should('contain', filtersData.yearOfProductionPopupCancelButton)
          cy.get('.range-dialog__buttons').children().eq(1).should('contain', filtersData.yearOfProductionPopupSaveButton)
          defaultVehicleTypeSelectedPopup()
          checkVehicleTypeDefaultText()
        })
  
        it('should show car body type popup and set defoult vehicle type', () => {
          getCarBodyTypeField().click()
          cy.get('.filter-popup__header').invoke('text').should('contain', filtersData.bodyTypePopupHeaderName)
          cy.get('.option--all').invoke('text').should('contain', filtersData.bodyTypePopupBodyTypes[0].allBodyType)
          cy.get('.filter-popup > div > label').invoke('text')
          .then( text => {
            filtersData.bodyTypePopupBodyTypes.slice(1).forEach(bodyType => {
              expect(text).to.contain(bodyType.bodyType)
            })
          })
          cy.get('.filter-popup > div > label > p-checkbox').should('not.be.checked')
          cy.get('.filter-popup__bottom-bar > ng-button > .button').should('contain', filtersData.bodyTypePopupButton)
          defaultVehicleTypeSelectedPopup()
          checkVehicleTypeDefaultText()
        })
  
        it('should show location popup and set defoult vehicle type', () => {
          getLocationField().click()
          cy.get('.filter-popup__header').invoke('text').should('contain', filtersData.locationPopupHeaderName)
          cy.get('.filter-popup__text-search').invoke('text').should('contain', filtersData.locationPopupSearchBox)
          cy.get('.abroad').invoke('text').should('contain', filtersData.locationPopupFilters[0].locationAbroad)
          cy.get('.option').invoke('text').should('contain', filtersData.locationPopupFilters[1].locationAllInPoland)
          cy.wait(1000)
          cy.get('.filter__text').should('be.visible').invoke('text').then( text => {
            filtersData.locationPopupFilters.slice(2).forEach(filter => {
              expect(text).to.contain(filter.locationVoivodeship)
            })
          })
          defaultVehicleTypeSelectedPopup()
          checkVehicleTypeDefaultText()
        })
  
        it('should check checkbox after click on only on autoplac field and set default vehicle type value', () => {
          getOnlyOnAutoplacCheckbox().should('not.be.checked')
          getOnlyOnAutoplacField().click()
          cy.get('.p-checkbox > .p-hidden-accessible > input').should('be.checked')
          defaultVehicleTypeSelectedPopup()
          checkVehicleTypeDefaultText()
        })
  
        it('should show special programs popup and set default vehicle type', () => {
          getSpecialProgramField().click()
          cy.get('.filter-popup__header').invoke('text').should('contain', filtersData.specialProgramsPopupHeaderName)
          const specialProgramsOptions = filtersData.specialProgramsPopupOptions.filter(option => option.specialProgramsName)
          cy.get('.filter-popup > div > .ng-star-inserted > .filter').each((element, index) => {
            cy.wrap(element).invoke('text').then(text => {
              expect(text.trim()).to.contain(specialProgramsOptions[index].specialProgramsName)
            })
          })
          defaultVehicleTypeSelectedPopup()
          checkVehicleTypeDefaultText()
        })
  
        it('should show used cars programs details', () => {
          const usedCarsVariants = filtersData.specialProgramsPopupOptions
          .filter(option => option.usedCarsVariant)
          .map(option => option.usedCarsVariant)
  
          getSpecialProgramField().click()
          cy.get('.filter-popup > div > .ng-star-inserted > .filter').eq(0).click()
          //cy.get('.filter-popup > div> .option.option--all').invoke('text').should('contain', mainPageData.specialProgramsPopupOptions[1].usedCarsAllVariant)
          
          cy.get('div.option.ng-star-inserted').not('.option--all')
            .should('have.length', usedCarsVariants.length)
            .each(($el, index) => {
              cy.wrap($el).invoke('text').then(fullText => {
                  const [extractedText] = fullText.split(/\s+\d+/)
                  // console.log(extractedText)
                  expect(extractedText.trim()).includes(usedCarsVariants[index])
              })
            })
        })
  
        it('should show dealers programs details', () => {
          const dealersVariants = filtersData.specialProgramsPopupOptions
          .filter(option => option.dealersVariant)
          .map(option => option.dealersVariant)
  
          getSpecialProgramField().click()
          cy.get('.filter-popup > div > .ng-star-inserted > .filter').eq(1).click()
        //   cy.get('.filter-popup > div> .option.option--all').invoke('text')
        //   .then((text) => {
        //     const trimmedText = text.replace(/\u00a0/g, ' ').trim()
        //     const expectedText = filtersData.specialProgramsPopupOptions.find(option => option.dealersAllVariant).dealersAllVariant
        //     expect(trimmedText).to.include(expectedText)
        //   })
          
          cy.get('div.option.ng-star-inserted').not('.option--all')
          .should('have.length', dealersVariants.length)
          .each(($el, index) => {
            cy.wrap($el).invoke('text').then(fullText => {
                const [extractedText] = fullText.split(/\s+\d+/)
                // console.log(extractedText)
                expect(extractedText.trim()).includes(dealersVariants[index])
            })
          })        
        })
  
    })
    context ('actions on filters', () => {
        const randomVehicleType = getRandomVehicleType()
        console.log(randomVehicleType)
        const { chipsName, link } = randomVehicleType
  
        it('should open page with selected random vehicle type and redirect to proper page', () => {
          getVehicleTypeField().click()
  
          cy.get('.filter-popup > div').contains(chipsName).click()       
          getShowOffersButton().click()
          cy.url().should('include', link)
          cy.get('.chip').should('contain', chipsName)
        })
  
        it('should open page with selected brand and model', () => {
          getBrandAndModelField().click()
          cy.get('.filter-popup > div > .ng-star-inserted > .filter').contains('Audi').click()
          cy.get('.filter-popup > div > .option').contains('A3').click()
          getShowOffersButton().click()
          cy.url().should('include', 'https://autoplac.pl/oferty/samochody-osobowe/audi/a3')
          getFilterChips().should('contain', 'Osobowe').and('contain', 'Audi A3')
          //ten test jest akurat przykładowy
          //można go zrandomizować jak ten wyżej ale nie mam danych wystarczających aby to zrobić
        })
  
      //   it('should open page with selected price', () => {
        
      //   })
  
      //  it('should open page with selected year of production', () => {
       
      //  })
  
      //  it('should open page with selected location', () => {
        
      //  })
      // it('should open page with only on autoplac offers', () => {
      
      // })  
      // it('should open page with selected special program', () => {
      
    // }) 
         it('should clear vehilce type and show popup', () => {
          getVehicleTypeField().click()
          cy.get('.filter-popup > div').contains(chipsName).click()       
          getShowOffersButton().click()
          cy.get('nwa-vehicle-type-input > nwa-readonly-input > .readonly-input > .ng-formfield > i.ng-star-inserted > .readonly-input__icon')
            .click()
          cy.get('.info__title').should('contain', filtersData.mainPageInfoPopup[0].infoTitle)
          cy.get('.info > .info__text').invoke('text').then((text) => {
            const normalizedText = text.replace(/\s+/g, ' ').trim();
            console.log(filtersData.mainPageInfoPopup[1].infoText)
            expect(normalizedText).to.include(filtersData.mainPageInfoPopup[1].infoText.trim())
          })
         cy.get('.info__buttons > .info__button--confirm > .button').click()
         checkVehicleTypeText()
      
      })         
    })
  
      it('should redirect to offers after click to the button', () => {
        getShowOffersButton().click()
        cy.url().should('include', filtersData.mainButtonOffersLink)
      })
  
      it('should redirect to filters after click to the button', () => {
        getMoreFiltersButton().click()
        cy.url().should('include', filtersData.mainButtonFiltersLink)
      })
})