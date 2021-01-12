const express = require('express');
const getConnection = require('../db');
const app = express.Router()
const connection = getConnection()


app.get('/', (req, res) => {
    connection.query('SELECT * FROM clinical_trial', (err, rows, fields) => {
        console.log('Thanh cong')
        res.json(rows)
    })
})

app.get('/:id/clinical-trial', (req, res) => {
    const id = req.params['id']
    connection.query('SELECT * FROM patient, clinical_trial WHERE patient.insurance_id =  AND patient.insurance_id = clinical_trial.insurance_id', [id], (err, rows, fields) => {
        console.log('Thanh cong')
        res.json(rows)
    })
})

app.delete('/:id/clinical_trial', (req, res) => {
    const id = req.params['id']
    console.log('id', id)
    // const query = `DELETE FROM patient WHERE insurance_id =  ${id} `
    connection.query('DELETE FROM result WHERE id_clinical_trail = ?', [id], (err, rows, fields) => {
        console.log('rows', rows)
        if (!err) {
            connection.query('DELETE FROM clinical_trial WHERE id_clinical_trail = ?', [id], (err, rows, fields) => {
                console.log('Success')
                res.json(rows)
            })
        }

    })
})


module.exports = app