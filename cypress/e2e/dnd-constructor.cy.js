describe("Checking dnd - constructor and own pages for feeds and ingredients", function () {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
        cy.intercept("GET", "api/all-ingredients", {fixture: "ingredients.json"});
    });

    const burgerConstructor = '[data-test-market="burger-constructor"]';
    const currentIngredient = '[data-test-marker="current-ingredient"]';

    it("Check dnd - functions behind ingredient list and burger constructor", () => {
        cy.get(currentIngredient).each((element) => {
            cy.wrap(element).trigger("dragstart");
            cy.get(burgerConstructor).trigger("drop");
        });
    });
});