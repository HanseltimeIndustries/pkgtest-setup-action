# Development

This document helps to detail tooling that you would want to be aware of if developing this github action.

## Developing Locally

Install your dependencies:

```shell
npm install
```

Lint your project (we use [biome)](https://biomejs.dev/guides/getting-started/)):

```shell
npm run lint -- --fix
```

Format your project files (we use [biome](https://biomejs.dev/guides/getting-started/)):

```shell
npm run format -- --fix
```

Build your typescript files to .js:

```shell
npm run build
```

## Committing your changes

We make use of [semantic-release](https://github.com/semantic-release/semantic-release) to do versioning and publishing of our package.
Semantic-release is configured to require specific commit syntax (in the default case, it's the angular commit syntax). Because of this, we
use [husky](https://typicode.github.io/husky/) to verify that your commits follow appropriate syntax and will reject them if not.

As a general rule of thumb:

1. use `feat:` for minor version changes
2. use `fix:` for patch version changes
