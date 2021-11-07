import bip39 from 'bip39'
import crypto from 'crypto'
import ethers from 'ethers'
import QRCode from 'qrcode'

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

// generate wallet
var wallet = ethers.Wallet.fromMnemonic(mnemonic)
console.log(`${bgcolor} wallet: ${resetbgcolor}`)
console.dir(wallet, {depth: null, colors: true})
console.log(`wallet._isSigner ? ${wallet._isSigner}`)

// sign a message
var message = 'test'
console.log(`${bgcolor} message: ${resetbgcolor}`)
console.log(message)
var signedMessage = await wallet.signMessage(message)
console.log(`${bgcolor} signedMessage: ${resetbgcolor}`)
console.log(signedMessage)

// verify signer IS the expected signer with EXACT message - happy path
var signerAddress = ethers.utils.verifyMessage(message , signedMessage)
console.log(`${bgcolor} signerAddress: ${resetbgcolor}`)
console.log(signerAddress)
var expectedSignerAddress = wallet.address
console.log(`${bgcolor} expectedSignerAddress: ${resetbgcolor}`)
console.log(expectedSignerAddress)
console.log(`${bgcolor} expectedSignerAddress === signerAddress ? ${resetbgcolor}`)
console.log(expectedSignerAddress === signerAddress)

// test qrcode
// var url = await QRCode.toString('I am a pony!',{type:'terminal'})
// console.log(url)

// qrcode - encode -public address -tokenid -signedMessage
var encodedString = [ signerAddress, ';',message, ';',signedMessage];
var url = await QRCode.toString(encodedString,{type:'terminal'})
// console.log(url)
// write qrcode to file
await QRCode.toFile('./qrcode.png', encodedString)

// verify signer IS NOT the expected signer with ALTERED message - unhappy path
var alteredMessage = message + 'altered'
console.log(`${bgcolor} alteredMessage: ${resetbgcolor}`)
console.log(alteredMessage)
var badSignerAddress = ethers.utils.verifyMessage(alteredMessage , signedMessage)
console.log(`${bgcolor} badSignerAddress: ${resetbgcolor}`)
console.log(badSignerAddress)
console.log(`${bgcolor} expectedSignerAddress === badSignerAddress ? ${resetbgcolor}`)
console.log(expectedSignerAddress === badSignerAddress)
