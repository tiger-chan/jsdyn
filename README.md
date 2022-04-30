# JsDyn

![GitHub](https://img.shields.io/github/license/tiger-chan/jsdyn)
![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/tiger-chan/jsdyn)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/tiger-chan/jsdyn/main)

Simple Collision Detection implementation for JavaScript (ESM)

## Prerequisites

This project requires NodeJS (version 14 or later) and NPM. [Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.

To make sure you have them available on your machine, try running the following command.

```sh
node -v && npm -v
```

If installed will output something like
```
v17.5.0
8.4.1
```

## Getting Started

### Installation

You can manually pull the source by cloning the repository, and use it directly in to your project

```sh
git clone https://github.com/tiger-chan/jsdyn.git
cd jsdyn
```

To install as a library you can run the following in your project

```sh
npm install @tiger_chan/jsdyn
```

Or with Yarn

```sh
yarn add @tiger_chan/jsdyn
```

## Usage

You can start using the package by importing the library JS files

```js
import jsdyn from "@tiger_chan/esdyn"

...


const v1 = jsdyn.vec2.create(1, 2);
const v2 = jsdyn.vec2.negate(v1);

if (jsdyn.vec2.isZero(jsdyn.vec2.add(v1, v2))) {
	// Do a thing
}

```

## Contributing

Please read [CONTRIBUTING.md](docs/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/tiger-chan/jsdyn/tags).

## Authors

* **Anthony Young** - *Initial work* - [tiger-chan](https://github.com/tiger-chan)

See also the list of [contributors](https://github.com/tiger-chan/jsdyn/contributors) who participated in this project.

## License

[MIT License](LICENSE) © Anthony Young
