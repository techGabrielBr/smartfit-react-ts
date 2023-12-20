describe('Form Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');

        cy.intercept('GET', 'https://test-frontend-developer.s3.amazonaws.com/data/locations.json', {
            fixture: 'locations.json',
        }).as('getLocations');

        cy.wait('@getLocations');
    });

    it('should update list and redirect', () => {
        cy.get('#radio-manha').click();
        cy.get('#find-btn').click();
        cy.url().should('include', '/#list-box');
    });
  
    it('should not update list', () => {
        cy.get('#find-btn').click();
        cy.url().should('not.include', '/#list-box');
    });
  
    it('should reset filter', () => {
        cy.get('#reset-btn').click();
        cy.get('#check-fechadas').should('not.be.checked');
        cy.get('[name=hour]').should('not.be.checked');
    });
  });
  