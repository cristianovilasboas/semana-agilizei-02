// Cypress Commands Intellisense
// Arquivo criado para que o Cyprees adicione os comandos personalizados(commands.js) ao autocomplite

/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Comando para executar o login.
       * @example
       * cy.backgroundLogin()
       */
      backgroundLogin(): Chainable<any>

    }
  }