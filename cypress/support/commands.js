// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Criando um comendo personalizado para realizar o backgroundLogin
Cypress.Commands.add('backgroundLogin', () => {
    cy.setCookie(
        'PrestaShop-a30a9934ef476d11b6cc3c983616e364',
        '8JYVddvvVUUWYwyn08WBQtURZoTMyMCe0bDt7xBrHJ8tnPDlbxEE7qcVGM%2FI8KVrVlr7RbPBMZeQ8a%2BLL4C4nogVbh9jY0gY4rqJQ7d6ZJw6WPEcvfaJrvcF%2B09MCmht6r50Ue3edrTQRMMsF5XV1wPI6T3ZBPeG5gTVgzS1uei7oodJiyx446Yf55ECIDhEQEHTGHFwpWafLFk30OEibj%2Fyx4l8Y%2B5CNp%2B7irlN%2BxOuTH6NGvOF%2B8LmQOt%2BLZYcO5B3i05MREsZ7qkOCOAVao8DfHtsc%2Fz3rlcY15xNxde9sSN6T8EtnIyP0RqML4Fzt953BpOZ4B0khkO1BpDN%2B7cAswOWnBlYhuPpQ0Z8lXDaIE6%2F2JcAd9%2FqmH7QWnZwc22SFPLMVZq8YlsdnK6yOjNsCqod6zwpzrHHEKtbQ5Pm6Xq%2BWD1vG7uHWDJdOfIM000323'
    )
})