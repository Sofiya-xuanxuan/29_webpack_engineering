const express = require('express')
const app = express()

app.get('/favicon.ico', (req, res) => {
    res.json({
        data: 0,
        msg: '找不到favicon'
    })
})
app.get('/api/info', (req, res) => {
    res.json({
        name: '开课吧',
        age: 5,
        msg: '欢迎欢迎'
    })
})

app.listen('9092')