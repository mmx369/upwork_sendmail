const express = require('express')
const sendmail = require('sendmail')()

const app = express()
const PORT = 4000

app.use(express.json())

function sendMail(email, msg) {
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
        console.log(err && err.stack)
      } else {
        console.dir(reply)
      }
    }
  )
}

app.post('/sendmail', (req, res) => {
  const { email, msg } = req.body
  sendMail(email, msg)
  console.log(888888, `Email Sent Successfully to ${email}`)
  res.send(`Email Sent Successfully to ${email}`)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
