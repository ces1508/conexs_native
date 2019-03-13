const fs = require('fs')
const path = require('path')

console.log(path.join(__dirname))

const getImage = text => {
  return new Promise((resolve, reject) => {
    fs.readdir(path.join(__dirname), (err, files) => {
      if (err) {
        throw new Error(err)
      }
      files.find(item => {
        if (item.includes(text)) {
          return resolve(item)
        }
      })
      resolve('no hay foto')
    })
  })
}

module.exports = getImage
