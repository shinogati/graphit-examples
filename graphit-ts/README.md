# Graphit Typescript example

this is step by step setup for integrating graphit with your typescript project.

we are using [Vite](https://vite.dev) to build and test [Graphit](https://github.com/shinogati/graphit) WASM interface.

1. create vanila typescript project with Vite:
```shell
npm create vite@latest
```
2. choose your package name and select **Vanila** then **TypeScript** then **No**
![project name](./docs/img/create-vite.png)
![typescript](./docs/img/typescript.png)
![no](./docs/img/no.png)
3. go to project root directory and install graphit wasm library
```shell
cd "The most clever or awful project name"
```
```shell
npm i @shinogati/graphit
```