const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnnotationSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    priority: {
        type: Boolean,
        required: true
    }
})

const annotations = mongoose.model('annotations', AnnotationSchema)

module.exports = annotations