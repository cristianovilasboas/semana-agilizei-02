// Arquivo com teste que será executado.
/// <reference types="Cypress" />

context('Compra', () => {
    it('Efetuar uma compra de produto', () => {
        // utilização de comando personalizado para realizar o background login. 
        // o comando personalizado é configurado no arquivo support/commands.js
        cy.backgroundLogin()

        /*
        //realizar a inclusão do cookie para realizar o background login
        cy.setCookie(
            'PrestaShop-a30a9934ef476d11b6cc3c983616e364',
            '8JYVddvvVUUWYwyn08WBQtURZoTMyMCe0bDt7xBrHJ8tnPDlbxEE7qcVGM%2FI8KVrVlr7RbPBMZeQ8a%2BLL4C4nogVbh9jY0gY4rqJQ7d6ZJw6WPEcvfaJrvcF%2B09MCmht6r50Ue3edrTQRMMsF5XV1wPI6T3ZBPeG5gTVgzS1uei7oodJiyx446Yf55ECIDhEQEHTGHFwpWafLFk30OEibj%2Fyx4l8Y%2B5CNp%2B7irlN%2BxOuTH6NGvOF%2B8LmQOt%2BLZYcO5B3i05MREsZ7qkOCOAVao8DfHtsc%2Fz3rlcY15xNxde9sSN6T8EtnIyP0RqML4Fzt953BpOZ4B0khkO1BpDN%2B7cAswOWnBlYhuPpQ0Z8lXDaIE6%2F2JcAd9%2FqmH7QWnZwc22SFPLMVZq8YlsdnK6yOjNsCqod6zwpzrHHEKtbQ5Pm6Xq%2BWD1vG7uHWDJdOfIM000323'
        )
        */
        //http://automationpractice.com/index.php
        // acesse o site cadastrado no parâmetro baseUrl do arquivo cypress.json
        cy.visit('/');

        let nomeProduto = 'Faded Short Sleeve T-shirts';
        //cy.contains - realiza a busca de elementos que contenha o texto determinado
        // .trigger - dipara o evento indicado no elemento
        cy.contains(nomeProduto).trigger('mouseover');

        cy.contains(nomeProduto)
            .parent() // acessa o pai do elemento localizado 
            .siblings('div.button-container') // acessa o elemento irmão de um elemento
            .children('a') // acessa o elemento filho indicado
            .first() // encontra o primeiro elemento filho
            .click();

        //valida se o produto correto foi adicionado no carrinho
        cy.get('.icon-ok')
            .parent() // acessa o pai do elemento localizado tag "h2"
            .should('contain.text', 'Product successfully added to your shopping cart');
        cy.get('span#layer_cart_product_title').should('contain.text', nomeProduto);

        //cy.pause() //realiza a pausa na execução do código

        //cy.get - encontrar elementos na DOM
        cy.get(".button-container a[href$='controller=order']").click();

        cy.get(".cart_navigation a[href$='order&step=1']").click();

        //Efetuar login na página quando não for utilizado o background login
        /* 
        cy.get('#email').type('dev123@domain.com.br');
        cy.get('#passwd').type('dev123');
        cy.get('button#SubmitLogin').click(); 
        */

        // Validando se o endereço de entrega é igual ao de cobrança 
        //[type=checkbox]#addressesAreEquals
        //tipo de asserção | atributo | valor do atributo  - Validar o conteúdo de um determinado elemento
        cy.get('[type=checkbox]#addressesAreEquals').should('have.attr', 'checked','checked');
        cy.get('[type=checkbox]#addressesAreEquals').should('have.attr', 'name','same');
        
        cy.get('button[name=processAddress]').click();

        cy.get('[type=checkbox]#cgv').click();

        cy.get('button[name=processCarrier]').click();

        cy.get('.bankwire').click();

        cy.get('.cart_navigation button[type=submit]')
            .find('span') // procura a tag indicada
            .contains('I confirm my order')
            .click();

        // should confirma se contem o texto indicado 
        cy.get('.cheque-indent strong').should('contain.text', 'Your order on My Store is complete.');
            // Mecanismos de busca: expect/should
            // expect - forma de asserção explicita
            // should - forma de asserção implicita
        
        //.invoke = invoca uma função no assunto anteriormente produzido. Invoke não retorna uma string neste caso é  necessário criar uma arrow function
        cy.get('div.box').invoke('text').then((text) => {
            console.log(text)
            // Expressão regular "[A-Z][A-Z]+" localiza texto começando e terminando com letras maíusculas.
            // / = inicia a expressão regular
            // [A-Z]{4,} = expressão regular(strings com caracteres de A-Z em caixa alta e que contenha 4 ou mais caracteres)
            // /g = realizar a busca global retornando todas as ocorrencias que encontrar no texto
            console.log(text.match(/[A-Z]{4,}/g))

            // Escrever um arquivo JSON com o conteúdo localizado 
            // Parâmetros: Caminho do Arquivo(sempre a partir do root) | Conteúdo do Arquivo
            cy.writeFile('cypress/fixtures/pedido.json', {id: `${text.match(/[A-Z]{4,}/g)}`})

        });
    
        cy.get('.cart_navigation a[href$="history"]').click();
        //then utilizado para acessar o conteúdo do arquivo
        cy.readFile('cypress/fixtures/pedido.json').then((pedido) => {
            cy.get('tr.first_item td.history_link a').should('contains.text', pedido.id)
        });        
             
        
    });
});