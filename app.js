const express = require('express')
const sendmail = require('sendmail')()

const app = express()
const PORT = 4000

app.use(express.json())

function sendMail(email, msg) {
  return new Promise((resolve, reject) => {
    sendmail(
      {
        from: 'test@test.com',
        to: email,
        replyTo: 'test@test.com',
        subject: `Hello ${msg.username}`,
        html: `Hello ${msg.username}. Otp = ${msg.otp}. `,
      },
      function (err, reply) {
        if (err) {
          reject(err && err.stack)
        } else {
          resolve(reply)
        }
      }
    )
  })
}

app.post('/sendmail', async (req, res) => {
  const { email, msg } = req.body
  await sendMail(email, msg)
  res.send(`Email Sent Successfully to ${email}`)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
