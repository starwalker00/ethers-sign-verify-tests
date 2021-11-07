import bip39 from 'bip39'
import crypto from 'crypto'
import ethers from 'ethers'

var bgcolor = '\x1b[45m'
var resetbgcolor = '\x1b[0m'

// random seed
var  randomBytes = crypto.randomBytes(16)
console.log(`${bgcolor} randomBytes: ${resetbgcolor}`)
console.log(randomBytes)

// generate mnemonic
var mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'))
console.log(`${bgcolor} mnemonic: ${resetbgcolor}`)
console.log(mnemonic)

var wallet = ethers.Wallet.fromMnemonic(mnemonic)
console.log(`${bgcolor} wallet: ${resetbgcolor}`)
console.dir(wallet, {depth: null, colors: true})
console.log(`wallet._isSigner ? ${wallet._isSigner}`)

var message = 'test'
signedMessage = await wallet.signMessage(message)
console.log(signedMessage)
// ethers.utils.verifyMessage( message , signature )
