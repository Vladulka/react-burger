describe("Check correct opening and closing ingredient details modal", function () {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
        cy.intercept("GET", "api/all-ingredients", {fixture: "ingredients.json"});
    });

    const currentIngredient = '[data-test-marker="current-ingredient"]';

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