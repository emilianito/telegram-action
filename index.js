const https = require('https')
const core = require('@actions/core');
const github = require('@actions/github');

try {

  const botToken = core.getInput('bot-token');
  const customMessage = core.getInput('custom-message');
  const chatId = core.getInput('chat-id');
  const eventData = github.context.payload;
  const commits = eventData.commits;
  const changes = commits.map(commit => commit.message).join(',')

  const payload = JSON.stringify({
    chat_id: chatId,
    text: `${customMessage}\n${changes}`,
    disable_notification: true,
  })

  const options = {
    hostname: 'api.telegram.org',
    port: 443,
    path: `/bot${botToken}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const req = https.request(options, (res) => {
    res.setEncoding('utf8')
    res.on('data', (chunk) => {
      console.log('Telegram Api Response', chunk)
    })
    res.on('end', () => {})
  })

  req.on('error', (e) => {
    console.log(e)
  })

  req.write(payload)
  req.end()

} catch (error) {
  core.setFailed(error.message);
}