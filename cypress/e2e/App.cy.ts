describe('App.cy.ts', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/');

      cy.intercept('GET', 'https://test-frontend-developer.s3.amazonaws.com/data/locations.json', {
          fixture: 'locations.json',
      }).as('getLocations');

      cy.wait('@getLocations');
    });
  
    it('should render the app correctly', () => {
      cy.get('h1').should('have.text', 'REABERTURA SMART FIT');
      cy.get('form').should('exist');
      cy.get('#legend-container').should('exist');
      cy.get('#list-box p#notfound').should('not.exist');
    });
  
    it('should update the list when the form is submitted', () => {
      cy.get('#radio-manha').check();
      cy.get('button').contains('ENCONTRAR UNIDADE').click();
      cy.get('#list').should('exist');
    });
  
    it('should show an error toast when the form is submitted without selecting a time', () => {
      cy.get('button').contains('ENCONTRAR UNIDADE').click();
      cy.contains('É necessário selecionar um horário de treino para realizar a pesquisa.').should('exist');
    });

    it('should redirect to /#list-box when form successfully submitted', () => {
      cy.get('#radio-manha').check();
      cy.get('button').contains('ENCONTRAR UNIDADE').click();
      cy.location('hash').should('eq', '#list-box');
    });
  });
  