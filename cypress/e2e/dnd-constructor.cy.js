describe("Checking dnd - constructor and own pages for feeds and ingredients", function () {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
        cy.intercept("GET", "api/all-ingredients", {fixture: "ingredients.json"});
        cy.intercept("GET", "api/auth", {fixture: "auth.json"});
    });

    const burgerConstructor = '[data-test-market="burger-constructor"]';
    const currentIngredient = '[data-test-marker="current-ingredient"]';

    it("Check dnd - functions behind ingredient list and burger constructor", () => {
        cy.get(currentIngredient).each((element) => {
            cy.wrap(element).trigger("dragstart");
            cy.get(burgerConstructor).trigger("drop");
        });
    });

    it("Check creating order with ingredients when user be sing in", () => {
        cy.get('[data-test-marker="bun"]').find(currentIngredient).first().trigger("dragstart");
        cy.get(burgerConstructor).trigger("drop");

        cy.get('[data-test-marker="main"]').find(currentIngredient).each((element) => {
            cy.wrap(element).trigger("dragstart");
            cy.get(burgerConstructor).trigger("drop");
        });

        cy.get('[data-test-marker="sauce"]').find(currentIngredient).each((element) => {
            cy.wrap(element).trigger("dragstart");
            cy.get(burgerConstructor).trigger("drop");
        });

        cy.get('[data-test-marker="submit-order-button"]').click();
    });

    it("Check correct opening and closing ingredient details modal", () => {

        const regEx = 'not.have.text';
        cy.get(currentIngredient).each((element) => {
            cy.wrap(element).click();

            cy.get('[data-test-marker="name"]').should(regEx, '');
            cy.get('[data-test-marker="calories"]').should(regEx, '');
            cy.get('[data-test-marker="proteins"]').should(regEx, '');
            cy.get('[data-test-marker="fat"]').should(regEx, '');
            cy.get('[data-test-marker="carbohydrates"]').should(regEx, '');

            cy.get('[data-test-marker="modal-close"]').click();
        });
    });
});