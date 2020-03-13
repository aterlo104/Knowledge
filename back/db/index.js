const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/curriculumproj', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const Curriculum = require('./Curriculum')

module.exports = {
  Curriculum
}
