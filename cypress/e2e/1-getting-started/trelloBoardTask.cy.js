/// <reference types="Cypress" />

describe('Trello API Tests', () => {
    const apiKey = '7f075737602118388cf94134f7f5d98d'
    const userToken = 'ATTAf83f054c25a2b757a95282e3518a00fd0fe9b0459fcc7fa57d43bcd010ae53e32B6DF66F'
    let boardId, card1Id, card2Id
  
    it('Create Board', () => {
      cy.request({
        method: 'POST',
        url: 'https://api.trello.com/1/boards/',
        body: { name: 'New Board' },
        qs: {
          key: apiKey,
          token: userToken,
        },
      })
        .then((res) => {
          expect(res.status).to.equal(200)
          boardId = res.body.id
        })
    })
  
    it('Create 2 Cards', () => {
      cy.request({
        method: 'POST',
        url: 'https://api.trello.com/1/cards',
        body: { name: 'New Card 1', idList: boardId },
        qs: {
          key: apiKey,
          token: userToken,
        },
      })
        .then((res) => {
          expect(res.status).to.equal(200)
          card1Id = res.body.id
        })
  
      cy.request({
        method: 'POST',
        url: 'https://api.trello.com/1/cards',
        body: { name: 'New Card 2', idList: boardId },
        qs: {
          key: apiKey,
          token: userToken,
        },
      })
        .then((res) => {
          expect(res.status).to.equal(200)
          card2Id = res.body.id
        })
    })
  
    it('Update Random Card Name', () => {
      const updatedCardName = 'Updated Card Name'
  
      // Get the ID of a random card
      const randomCardId = Math.random() < 0.5 ? card1Id : card2Id
  
      cy.request({
        method: 'PUT',
        url: `https://api.trello.com/1/cards/${randomCardId}`,
        body: { name: updatedCardName },
        qs: {
          key: apiKey,
          token: userToken,
        },
      })
        .then((res) => {
          expect(res.status).to.equal(200)
          expect(res.body.name).to.equal(updatedCardName)
        })
    })
  
    it('Delete Cards', () => {
      cy.request({
        method: 'DELETE',
        url: `https://api.trello.com/1/boards/${boardId}/cards`,
        qs: {
          key: apiKey,
          token: userToken,
        },
      })
        .then((res) => {
          expect(res.status).to.equal(200)
        })
    })
  
    it('Delete Board', () => {
      cy.request({
        method: 'DELETE',
        url: `https://api.trello.com/1/boards/${boardId}`,
        qs: {
          key: apiKey,
          token: userToken,
        },
      })
        .then((res) => {
          expect(res.status).to.equal(200)
        })
    })
  })
  
    //Create Card end pointi calismiyor maalesef