# Telegram action

Sends commit message and custom message to a Telegram Chat ID 

## Inputs

### `bot-token`

**Mandatory** Telegram Bot Token.

### `chat-id`

**Mandatory** Chat where the message is send to.

### `custom-message`

Custom message.

## Example

```yml
  
on: [push]

jobs:
  telegram_job:
    runs-on: ubuntu-latest
    name: Send alert to Telegram
    steps:
    - name: Telegram action step
      uses: emilianito/telegram-action@v1
      with:
        bot-token: ${{ secrets.TELEGRAM_BOT_TOKEN }}
        chat-id: ${{ secrets.TELEGRAM_CHAT_ID }}
        custom-message: 'Custom message'
```