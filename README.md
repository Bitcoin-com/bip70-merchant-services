# react-typescript-bootstrap-webpack-starter
A basic starter for a project build with ReactJS, Typescript, Webpack 2 and Bootstrap

## Usage

### Getting started
At first you have to install all node modules:

```bash
npm install
```

Afterwards you can start the app with:

```bash
npm start
```

Then will then have a server running at **[http://localhost:3000](http://localhost:3000)** with hot code replacement and live reloading in the browser.

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

* Test runner: [KarmaJS](https://karma-runner.github.io)
* Headless WebKit browser: [PhantomJS](http://phantomjs.org)
* Testing framework: [Jasmine](https://jasmine.github.io/)

## External resources

* A short book about React and Typescript: [Hello React and TypeScript](https://charleslbryant.gitbooks.io/hello-react-and-typescript/content/index.html)

## Creator

**Stephan Zerhusen**

* <https://twitter.com/stzerhus>
* <https://github.com/szerhusenBC>

## Copyright and license

The code is released under the [MIT license](LICENSE?raw=true).

---------------------------------------

Please feel free to send me some feedback or questions!
