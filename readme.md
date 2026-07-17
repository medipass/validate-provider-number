# validate-provider-number

> Validates a provider number

## Install

```
$ yarn add validate-provider-number
```

Or NPM:

```
$ npm install validate-provider-number
```

## Usage

```js
// Using commonjs
const {
  validateMedibankProviderNumber,
  validateProviderNumber,
} = require("validate-provider-number");

validateProviderNumber("2429581T");
// Returns true

validateMedibankProviderNumber("A204983L");
// Returns true

// Using ES modules
import {
  validateMedibankProviderNumber,
  validateProviderNumber,
} from "validate-provider-number";

validateProviderNumber("2429581T");
// Returns true

validateMedibankProviderNumber("A204983L");
// Returns true
```

## API

### validateProviderNumber(input)

Validates a Medicare provider number using the published checksum algorithm.

#### input

Type: `string`

The Medicare provider number to validate.

### validateMedibankProviderNumber(input)

Validates a Medibank provider number containing a profession prefix followed by a provider number that uses the Medicare checksum algorithm.

#### input

Type: `string`

The Medibank provider number to validate.

## Releasing

Run releases from an up-to-date `master` branch with a clean working tree:

```sh
pnpm release:patch
pnpm release:minor
pnpm release:major
```

The release commands verify npm authentication, build the package, create and atomically push the version commit and tag, then publish to npm. If publishing fails after the Git push, fix the npm issue and run `pnpm publish` directly instead of rerunning the release command.

## License

MIT © [Medipass](https://medipass.com.au)
