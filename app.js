var bip39 = require('bip39')
var crypto = require('crypto')


// random seed
var  randomBytes = crypto.randomBytes(16)
console.log(`randomBytes:`)
console.log(randomBytes)

// generate mnemonic
var mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'))
console.log(`mnemonic:`)
console.log(mnemonic)
