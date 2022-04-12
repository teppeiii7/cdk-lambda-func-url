import serverlessExpress from '@vendia/serverless-express'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/hoge', (_, res) => {
  res.status(200).send({
    message: 'hogehoge!!!!!!!'
  })
})

app.get('/fuga', (_, res) => {
  res.status(200).send({
    message: 'fugafuga!!!!!!!'
  })
})

export const handler = serverlessExpress({ app })
