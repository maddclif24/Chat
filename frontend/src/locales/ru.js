export default {
  translation: {
    loginPage: {
      title: 'Войти',
      username: 'Ваш ник',
      password: 'Ваш пароль',
      footer: {
        text: 'Нет аккаунта?',
        link: 'Регистрация',
      },
    },
    chatPage: {
      channels: {
        name: 'Каналы',
        modalAdd: {
          title: 'Добавить канал',
          close: 'Закрыть',
          submit: 'Отправить',
        },
        modalRename: {
          name: 'Переименовать',
          title: 'Переименовать канал',
          close: 'Закрыть',
          submit: 'Отправить',
        },
        modalRemove: {
          name: 'Удалить',
          title: 'Удалить канал',
          body: 'Вы уверены?',
          close: 'Закрыть',
          submit: 'Удалить',
        },
      },
      form: {
        header: {
          channelName: '',
          countMessages: '',
        },
        inputPlaceholder: 'Введите сообщение...',
      },
      messages: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
      log_out: 'Выйти',
    },
    tostify: {
      successRename: 'Канал переименован',
      successRemove: 'Канал удалён',
      successAdd: 'Канал создан',
      errors: {
        connection: 'Ошибка подключения',
        network: 'Ошибка сети',
      },
    },
    signup: {
      title: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirm_password: 'Подтвердите пароль',
      submit: 'Зарегистрироваться',
    },
  },
};
