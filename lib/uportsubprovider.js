/*
 * Emulate 'eth_accounts' / 'eth_sendTransaction' using 'eth_sendRawTransaction'
 *
 * The two callbacks a user needs to implement are:
 * TODO - update this
 * - getAccounts() -- array of addresses supported
 * - signTransaction(tx) -- sign a raw transaction object
 */

import async from 'async'
import Subprovider from 'web3-provider-engine/subproviders/subprovider'

// handles the following RPC methods:
// eth_coinbase
// eth_accounts
// eth_sendTransaction

class UportSubprovider extends Subprovider {
  constructor (opts) {
    super()
    // Chasqui URL (default to standard)
    this.msgServer = opts.msgServer

    // uportConnectHandler deals with displaying the
    // uport connect data as QR code or clickable link
    this.uportConnectHandler = opts.uportConnectHandler

    // ethUriHandler deals with displaying the
    // ethereum URI either as a QR code or
    // clickable link for mobile
    this.ethUriHandler = opts.ethUriHandler

    // Set address if present
    this.address = opts.address
  }

  handleRequest (payload, next, end) {
    let self = this
    let txParams = payload.params[0]
    switch (payload.method) {
      case 'eth_coinbase':
        this.getAddress((error, address) => { end(error, address) })
        return
      case 'eth_accounts':
        this.getAddress((error, address) => { end(error, [address]) })
        return
      case 'eth_sendTransaction':
        async.waterfall([
          self.validateTransaction.bind(self, txParams),
          self.txParamsToUri.bind(self, txParams),
          self.signAndReturnTxHash.bind(self)
        ], end)
        return
      default:
        next()
        return
    }
  }

  txParamsToUri (txParams, cb) {
    let symbol
    let uri = 'ethereum:' + txParams.to
    if (!txParams.to) {
      return cb(new Error('Contract creation is not supported by uportProvider'))
    }
    if (txParams.value) {
      uri += '?value=' + parseInt(txParams.value, 16)
    }
    if (txParams.data) {
      symbol = txParams.value ? '&' : '?'
      uri += symbol + 'bytecode=' + txParams.data
    }
    if (txParams.gas) {
      symbol = txParams.value || txParams.data ? '&' : '?'
      uri += symbol + 'gas=' + parseInt(txParams.gas, 16)
    }
    cb(null, uri)
  }

  signAndReturnTxHash (ethUri, cb) {
    let topic = this.msgServer.newTopic('tx')
    ethUri += '&callback_url=' + topic.url
    this.ethUriHandler(ethUri)
    this.msgServer.waitForResult(topic, (error, txHash) => { cb(error, txHash) })
  }

  getAddress (cb) {
    if (this.address) {
      cb(null, this.address)
    } else {
      let topic = this.msgServer.newTopic('address')
      let ethUri = 'ethereum:me?callback_url=' + topic.url
      this.uportConnectHandler(ethUri)
      this.msgServer.waitForResult(topic, (error, address) => {
        if (error) return cb(error)
        this.address = address
        cb(error, this.address)
      })
    }
  }

  validateTransaction (txParams, cb) {
    this.validateSender(txParams.from, (error, senderIsValid) => {
      if (error) return cb(error)
      if (!senderIsValid) return cb(new Error('Unknown address - unable to sign transaction for this address.'))
      cb(error, true)
    })
  }

  validateMessage (msgParams, cb) {
    this.validateSender(msgParams.from, (error, senderIsValid) => {
      if (error) return cb(error)
      if (!senderIsValid) return cb(new Error('Unknown address - unable to sign message for this address.'))
      cb(error, true)
    })
  }

  validateSender (senderAddress, cb) {
    let senderIsValid = senderAddress === this.address
    cb(null, senderIsValid)
  }
}

export default UportSubprovider
