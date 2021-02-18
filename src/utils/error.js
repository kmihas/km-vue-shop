const ERROR_CODES = {
  EMAIL_NOT_FOUND: 'Пользователь с таким email не найден',
  INVALID_PASSWORD: 'Пароль не верный',
  USER_DISABLED: 'учетная запись пользователя отключена администратором',
  EMAIL_EXISTS: 'адрес электронной почты уже используется',
  OPERATION_NOT_ALLOWED: 'пароль для входа в этот проект отключен',
  TOO_MANY_ATTEMPTS_TRY_LATER: 'мы заблокировали все запросы с этого устройства из-за необычной активности. Попробуйте позже',
  OPERATION_NOT_ALLOWED: 'вход анонимного пользователя отключен',
  ADMIN_ONLY_OPERATION: 'данная операция только для администратора'
}

export function error(code) {
  return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}