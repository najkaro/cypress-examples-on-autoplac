import { filtersData } from "./filters.data"
import { seoData } from "../main_page_seo/seo.data"

export function checkVehicleTypeText() {
    return cy.get('nwa-vehicle-type-input > nwa-readonly-input > .readonly-input label').invoke('text').should('contain', filtersData.mainVehicleTypeLabel)
  }

export function checkVehicleTypeDefaultText() {
    return cy.get('.main__vehicle-type > nwa-readonly-input > .readonly-input > .ng-formfield > .p-inputtext').invoke('val').should('contain', filtersData.mainVehiceTypePopup[0].vehicleType[0].type[0])
}  

export function getVehicleTypeField() {
    return cy.get('.main__vehicle-type').should('contain', filtersData.mainVehicleTypeLabel)
  }

export function checkBrandAndModelText() {
     return cy.get('nwa-brand-model-input > nwa-readonly-input').invoke('text').should('contain', filtersData.mainBrandAndModelLabel)
  }

export function getBrandAndModelField() {
    return cy.get('nwa-brand-model-input').should('contain', filtersData.mainBrandAndModelLabel)
}  

export function checkPriceFText() {
   return cy.get('nwa-price-range-input > nwa-filters-range-input').invoke('text').should('contain', filtersData.mainPriceLabel)
}

export function getPriceField() {
   return cy.get('nwa-price-range-input').should('contain', filtersData.mainPriceLabel)
}

export function checkYearOfProductionText() {
    return cy.get('nwa-year-range-input > nwa-filters-range-input ').invoke('text').should('contain', filtersData.mainYearOfProductionLabel)
}

export function getYearOfProductionField() {
    return cy.get('nwa-year-range-input').should('contain', filtersData.mainYearOfProductionLabel)
}

export function checkCarBodyTypeText() {
    return cy.get('nwa-body-types-input > nwa-readonly-input ').invoke('text').should('contain', filtersData.mainBodyTypeLabel)
}

export function getCarBodyTypeField() {
    return cy.get('nwa-body-types-input').should('contain', filtersData.mainBodyTypeLabel)
}

export function checkLocationText() {
    return cy.get('nwa-location-input > div > span').invoke('text').should('contain', filtersData.mainLocationLabel)
}

export function getLocationField() {
    return cy.get('nwa-location-input').should('contain', filtersData.mainLocationLabel)
}

export function checkOnlyOnAutoplacText(){
    return cy.get('.autoplac-label__text').invoke('text').should('contain', filtersData.mainOnlyOnAutoplacLabel)
}

export function getOnlyOnAutoplacCheckbox() {
    return cy.get('.p-checkbox-box')
}

export function getOnlyOnAutoplacField(){
    return cy.get('.main__autoplac-only')
}

export function checkSpecialProgramText(){
    return cy.get('.special-program__label').invoke('text').should('contain', filtersData.mainSpecialProgramLabel)
}

export function getSpecialProgramField(){
    return cy.get('.special-program').should('contain', filtersData.mainSpecialProgramLabel)
}

export function popupClose(){
    return  cy.get('.filter-popup__header > img').click()
}

export function defaultVehicleTypeSelectedPopup(){
    return cy.get('.snackbar__title').invoke('text').should('contain', filtersData.mainPageDefaultVehicleTypePopup)

}

export function getShowOffersButton(){
    return cy.get('.main__buttons').contains(filtersData.mainButtonOffers)
}

export function getMoreFiltersButton(){
    return cy.get('.main__buttons').contains(filtersData.mainButtonFilters)
}


export function getRandomVehicleType(){
    const vehicleTypes = seoData.seoChips.filter(chip => chip.chipsName !== "Wszystkie")
    const randomIndex = Math.floor(Math.random() * vehicleTypes.length)
    return vehicleTypes[randomIndex]
}

export function getFilterChips(){
    return cy.get('.chip')
}
