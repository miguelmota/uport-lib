[![uport][uport-image]][uport-url]
[![uport chat][gitter-image]][gitter-url]

<!--npm-->
<!--
  [![NPM version][npm-image]][npm-url]
  [![Downloads][downloads-image]][downloads-url]
  [![NPM][nodei-image]][nodei-url]
-->

<!--build-->
<!--
  [![Build Status][travis-image]][travis-url]
  [![Appveyor Status][appveyor-image]][appveyor-url]
  [![Coverage Status][coveralls-image]][coveralls-url]
-->

<!--dependencies-->
<!--
  [![Dependency Status][david-image]][david-url]
  [![devDependency Status][david-dev-image]][david-dev-url]
  [![peerDependency Status][david-peer-image]][david-peer-url]
-->

# Introduction

**Uport** is a system for self-sovereign digital identity.

This is the client side library that is used to interact with the mobile application where the end-user's keys are stored.

Signing transactions thus requires that the transactions are sent to the phone where they can be signed.
This is accomplished by showing the user a QR-code for each transaction.
The user can then verify the transaction on the phone and send it to the Ethereum network.

In order to make this flow easy for developers, `uport-lib` provides a custom web3 provider which takes care of all of this.

---------------------------------------------

## Using uPort in your dapp

### Getting Started
First we will instantiate the Uport and Web3 objects.
Then we will get the information of the connected user.
Since the information of the connected user is stored on ipfs we need to provide uport-lib with an ipfs provider upon on creation of Uport instance.
Here we use [Infura](https://infura.io/) as an example.

```js
import { Uport } from 'uport-lib'

let uport = new Uport('MyDApp')
let web3 = uport.getWeb3()

uport.getUserPersona()
     .then((persona) => {
       let profile = persona.profile
       console.log(profile)
     })
```

After the above setup, you can now use the `web3` object as normal.

Also, the following calls will show a QR code for the user to scan:

* `web3.eth.getCoinbase()` - returns your uport address
* `web3.eth.getAccounts()`- returns your uport address in a list
* `web3.eth.sendTransaction(txObj)` - returns a transaction hash
* `myContract.myMethod()` - returns a transaction hash

Check out the examples folder too for how to integrate **uport** in your DApp

---------------------------------------------

### Custom Display of QR codes

`uport-lib` features a default QR-code display function, which injects a `<div>` containing the QR-code into the DOM.
However, you might want to display the QR-code in a different way.

You can provide a `qrDisplay` object with two functions when uport is created.
The `openQr` function is called when the user needs to confirm something on the uport app.
The data argument is a uri that needs to be displayed in a QR-code so that the uport app can scan it.
The `closeQr` function is called when the action has been confirmed in the uport app and the QR-code can be removed from the screen.

```js
let options = {
  qrDisplay: {
    openQr(data) { // your code here },
    closeQr() { // your code here }
  }
}
```

The `openQr` function is called each time some information needs to get to the phone.

The `closeQr` is called once the phone has taken an action on the data in the QR-code.

---------------------------------------------

### Interacting with persona objects of other users

You can also import the `Persona` classes from uport lib to interact with any persona in the `uport-registry`.

```js
uport.getUserPersona()
     .then((persona) => {
       let profile = persona.profile
       console.log(profile)
    })
```

More information on how to use personas can be found in the [uport-persona](https://github.com/ConsenSys/uport-persona) repo, or by reading the documentation below.

---------------------------------------------

## Contributing
#### Testing / Building (& watching) / Docs

This basic commands can be found in `package.json -> scripts: { }` for contributing to the library.

```
npm run test
npm run build
npm run watch
npm run gen-readme
```

---------------------------------------------

<!-- Badge Variables -->

[uport-image]: https://ipfs.pics/ipfs/QmVHY83dQyym1gDWeMBom7vLJfQ6iGycSWDYZgt2n9Lzah
[uport-url]: https://uport.me
[gitter-image]: https://img.shields.io/badge/gitter-uport--lib-red.svg?style=flat-square
[gitter-url]: https://gitter.im/ConsenSys/uport-lib

<!-- TODO: Add applicable badges
[travis-url]: https://travis-ci.org/webpack/webpack
[travis-image]: https://img.shields.io/travis/webpack/webpack/master.svg
[appveyor-url]: https://ci.appveyor.com/project/sokra/webpack/branch/master
[appveyor-image]: https://ci.appveyor.com/api/projects/status/github/webpack/webpack?svg=true
[coveralls-url]: https://coveralls.io/r/webpack/webpack/
[coveralls-image]: https://img.shields.io/coveralls/webpack/webpack.svg
[npm-url]: https://www.npmjs.com/package/webpack
[npm-image]: https://img.shields.io/npm/v/webpack.svg
[downloads-image]: https://img.shields.io/npm/dm/webpack.svg
[downloads-url]: http://badge.fury.io/js/webpack
[david-url]: https://david-dm.org/webpack/webpack
[david-image]: https://img.shields.io/david/webpack/webpack.svg
[david-dev-url]: https://david-dm.org/webpack/webpack#info=devDependencies
[david-dev-image]: https://david-dm.org/webpack/webpack/dev-status.svg
[david-peer-url]: https://david-dm.org/webpack/webpack#info=peerDependencies
[david-peer-image]: https://david-dm.org/webpack/webpack/peer-status.svg
[nodei-image]: https://nodei.co/npm/webpack.png?downloads=true&downloadRank=true&stars=true
[nodei-url]: https://www.npmjs.com/package/webpack
-->

## Documentation
ERROR, Cannot find class.
ERROR, Cannot find class.
ERROR, Cannot find class.
