describe('Connection', () => {
  it('passes', () => {
    cy.visit('http://localhost:5001')
  })
})

beforeEach(() => {
  cy.restoreLocalStorage();
});

afterEach(() => {
  cy.saveLocalStorage();
});

describe('Registration', () => {

  it('validation', () => {
    cy.visit('http://localhost:5001/signup/')
    cy.get('input[name="username"]').focus().type('u')
    cy.get('input[name="password"]').type('pass')
    cy.get('input[placeholder="Подтвердите пароль"]').type('passw')
    cy.get('button[type="submit"]').click()
    cy.contains('От 3 до 20 символов').should('have.text', 'От 3 до 20 символов')
    cy.contains('Не менее 6 символов').should('have.text', 'Не менее 6 символов')
    cy.contains('Пароли должны совпадать').should('have.text', 'Пароли должны совпадать')
  })

  it('add new User', () => {
    cy.reload()
    cy.get('input').first().focus().type('user').should('have.value', 'user')
    cy.get('input[name="password"]').type('user_password').should('have.value', 'user_password')
    cy.get('input[placeholder="Подтвердите пароль"]').type('user_password').should('have.value', 'user_password')
    cy.get('button[type="submit"]').click()
    cy.get('input').first().should('have.value', '')
    // Возможно тут нужно использовать стаббинг
  })
})

describe('Auth', () => {

  it('validation login', () => {
    cy.visit('http://localhost:5001/login')
    cy.get('input[name="username"]').focus().type('guest')
    cy.get('input[name="password"]').type('passw')
    cy.get('button[type="submit"]').click()
    cy.contains('Неверные имя пользователя или пароль').should('have.text', 'Неверные имя пользователя или пароль')
  })
  it('auth pass', () => {
    cy.reload()
    cy.get('input[name="username"]').focus().type('admin')
    cy.get('input[name="password"]').type('admin')
    cy.get('button[type="submit"]').click()
    cy.get('input').first().should('have.value', '')
  })
})

describe('Chat', () => {

  it('new message with filter_words', () => {
    cy.get('input').first().type('Nice ass').should('have.value', 'Nice ass')
    cy.get('button[type="submit"]').click()
    cy.get('input').clear()
    cy.get('#messages-box').contains('Nice').should('have.text', 'admin:Nice ***')
  })
  it('add channel', () => {
    cy.contains('+').click()
    cy.get('input[name="name"]').type('Test channel3')
    cy.get('.modal-footer').contains('Отправить').click()
    cy.get('.Toastify').children().should('have.text', 'Канал создан')
  })
  it('rename channel', () => {
    cy.contains('Управление каналом').click()
    cy.contains('Переименовать').click()
    cy.get('input[name="name"]').clear().type('new name channel')
    cy.get('.modal-footer').contains('Отправить').click()
    cy.contains('# new name channel').should('have.text', '# new name channel')
    cy.get('.Toastify').contains('Канал переименован').should('have.text', 'Канал переименован')
  })
  it('remove channel', () => {
    cy.contains('Управление каналом').click()
    cy.contains('Удалить').click()
    cy.get('.modal-footer').contains('Удалить').click()
    cy.get('.Toastify').contains('Канал удалён').should('have.text', 'Канал удалён')
    cy.contains('# general').should('have.text', '# general')
  })
})
