# BIP70 Merchant Services

Web GUI for pay.bitcoin.com

## Usage

### Getting started

At first you have to install all node modules:

```bash
yarn install
```

Afterwards you can start the app with:

```bash
yarn start
```

Then will then have a server running at **[http://localhost:3000](http://localhost:3000)** with hot code replacement and live reloading in the browser.

### Adding Components

Create a new `Component.tsx` in `src/components/`

### Adding Styles

Create a new `Component.less` in `src/less/`

Import less file in to `src/index.less`

```less
@import "less/Component";
```

### Sample data

#### Sample Request

- `src/components/bchTxSampleRequest.ts`
- `src/components/slpTxSampleRequest.ts`

#### Sample Response

- `src/components/bchTxSampleResponse.ts`
- `src/components/slpTxSampleResponse.ts`

### Building a distribution

If you want to build a distribution, you have to execute

```bash
npm run build:dev
```

or

```bash
npm run build:prod
```

In the prod distribution all js- and css-files are uglified and there are no source maps.

You will find the distribution under **/dist**.

### Testing

You can run the tests with

```bash
npm test
```

If you want to develop against the tests with hot reloading, you have to execute

```bash
npm run test:watch
```

The following technologies are used for writing and running tests:

- Test runner: [KarmaJS](https://karma-runner.github.io)
- Headless WebKit browser: [PhantomJS](http://phantomjs.org)
- Testing framework: [Jasmine](https://jasmine.github.io/)

## External resources

- [Bitcoin.com Developer Resources](https://developer.bitcoin.com)
- [Bitcoin.com Developer Discord](http://geni.us/CashDev)

## Credit

- [Gabriel Cardona](https://twitter.com/cgcardona)
- [Vin Armani](https://twitter.com/vinarmani)

## Copyright and license

The code is released under the [MIT license](LICENSE?raw=true).
