describe("Check creating order with ingredients when user be sing in", function () {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
        cy.intercept("GET", "api/all-ingredients", {fixture: "ingredients.json"});
    });

    const burgerConstructor = '[data-test-market="burger-constructor"]';
    const currentIngredient = '[data-test-marker="current-ingredient"]';
    const orderButton = '[data-test-marker="submit-order-button"]';

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
        cy.get(orderButton).click();

        cy.get("form").within(() => {
            cy.get("input:first").type("vladulka.v@yandex.ru");
            cy.get("input:last").type("1234567890");
        });
        cy.get('[data-test-marker="submit-login-button"]').click();

        cy.get(orderButton).click();
        cy.wait(15500);

        cy.get('[data-test-marker="order-number"]').should('not.have.text', '');
        cy.wait(2000);

        cy.get('[data-test-marker="modal-close"]').click();

    });
});