import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

let todo = [
    {
        id:1,
        text: 'hi',
        isCommpleted: true
    },
    {
        id:2,
        text: 'there',
        isCommpleted: false
    },
    {
        id:3,
        text: 'aejaz',
        isCommpleted: false
    },
]

app.use(bodyParser.json())
app.options('*', cors()) 

app.get('/todo', cors(), (req, res) => {
    res.json({todo})
})

app.post('/todo', cors(), (req, res) => {
    let text = req.body.text
    if(!text) {
        return res.status(400).json({
            success: false,
            error: "you must provide text", 
            data: null
        })
    }
    const newTodo = {
        id: todo.length + 1,
        text: text,
        isCompleted: false
    }
    todo.push(newTodo)
    return res.status(201).json({
        success: true,
        error: null,
        data: {
            todo: newTodo
        }
    })
}) 

app.delete('/todo', cors(), (req, res) => {
    let id = parseInt(req.body.id)
    if(!id) {
        return res.status(400).json({
            success: false,
            error: "id returned as null or undefined",
            data: null
        })
    }
    let filterData = todo.filter((item) => item.id !== id)
    todo = filterData
    return res.status(200).json({
        success: true,
        error: null,
        data: {
            todo: filterData
        }
    }
    )
})

app.listen(4000)