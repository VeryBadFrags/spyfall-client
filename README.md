# 🕵️ Spyfall - Client

[![License: MIT](https://img.shields.io/badge/license-MIT-green)](./LICENSE.txt)
[![Netlify Status](https://api.netlify.com/api/v1/badges/9533fa3b-785d-4ddb-ab13-366089f5d10b/deploy-status)](https://app.netlify.com/sites/heuristic-bartik-850df8/deploys)

A multiplayer social deduction game inspired by [Spyfall](https://hwint.ru/portfolio-item/spyfall/).

[♟️ Play the game](https://spyfall.verybadfrags.com)

<details>
<summary>🖥️ Game screenshot</summary>
<img alt="Game screenshot" src="docs/spyfall-example-01.png"/>
</details>

## Stack

🛠️ Built with [React](https://react.dev),
[Bootstrap](https://getbootstrap.com),
and [socket.io](https://socket.io).

- [💾 View the server code](https://github.com/VeryBadFrags/spyfall-server)

## Setup

### With [mise](https://mise.jdx.dev) (faster)

```sh
mise install
```

### With [nvm](https://github.com/nvm-sh/nvm)

```sh
nvm install
corepack enable
```

### With [Node.js](https://nodejs.org/)

```sh
corepack enable
```

## Local development

You'll need to run the server locally too. See <https://github.com/VeryBadFrags/spyfall-server#run-locally>.

```sh
make dev
```

Run `make` to view all available commands.

## Deploy to production

Create a `.env.production` file to specify the Prod API url:

```.env.production
VITE_API_URL=https://your-api-url.foo
```
