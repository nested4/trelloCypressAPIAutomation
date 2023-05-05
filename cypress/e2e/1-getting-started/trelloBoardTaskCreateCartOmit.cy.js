/// <reference types="Cypress" />

describe("Trello Test", () => {
    let boardId;
    let cardIds;
    const key = "7f075737602118388cf94134f7f5d98d";
    const token =
      "ATTAf83f054c25a2b757a95282e3518a00fd0fe9b0459fcc7fa57d43bcd010ae53e32B6DF66F";
    const name = "test" + Cypress._.random(0, 1e6);
  
    it("create a new board", () => {
      cy.request({
        method: "POST",
        url: `https://api.trello.com/1/boards?key=${key}&token=${token}&name=${name}`,
      }).then((response) => {
        boardId = response.body.id;
        expect(response.status).to.eq(200);
      });
    });
    it.skip("Create two new cards", () => {
      const cardNames = [];
      cardNames.push("Card1" + Cypress._.random(0, 1e6));
      cardNames.push("Card2" + Cypress._.random(0, 1e6));
      cy.wrap(cardNames).each((name) => {
        cy.request({
          method: "POST",
          url: `https://api.trello.com/1/cards?key=${key}&token=${token}&idList=${boardId}&name=${name}`,
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  
    it.skip("update one of the cards", () => {
      const updatedCardName = "Card" + Cypress._.random(0, 1e6);
      cy.request({
        method: "GET",
        url: `https://api.trello.com/1/boards/${boardId}/cards?key=${key}&token=${token}`,
      }).then((response) => {
        cardIds = response.body.map((card) => card.id);
        const randomCardId = cardIds[Math.floor(Math.random() * cardIds.length)];
        cy.request({
          method: "PUT",
          url: `https://api.trello.com/1/cards/${randomCardId}?key=${key}&token=${token}&name=${updatedCardName}`,
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
    it.skip("delete the cards", () => {
      cy.wrap(cardIds).each((cardId) => {
        cy.request({
          method: "DELETE",
          url: `https://api.trello.com/1/cards/${cardId}?key=${key}&token=${token}`,
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  
    it("delete the board", () => {
      cy.request({
        method: "DELETE",
        url: `https://api.trello.com/1/boards/${boardId}?key=${key}&token=${token}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
  

  //Create Card end pointi calismiyor maalesef