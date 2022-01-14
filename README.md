# livepeer-web-api-proxy

Proxy for limited access to the Livepeer API for the web.

Notice that by default it allows anyone to create a new stream. 
Implement your own authentication method if security and billing are of concern.

The point of this proxy is for anyone to run a simple proxy to the Livepeer API, 
to allow creating streams directly from the browser without exposing access to
your whole account via your API key.

## Getting Started

You must have 3 main tools installed on your machine:
 - `node` / `yarn` for tooling and development: https://nodejs.org/en/download/
 - `flyctl` for deployment: https://fly.io/docs/getting-started/installing-flyctl/
 - `docker` which is required by `flyctl` for building your image: https://docs.docker.com/engine/install/

Having those tools installed, you can:
 - Create your [fly.io](https://fly.io) account
> Notice that you might be required to add a credit card or some pre-paid balance to 
> your [fly.io](https://fly.io) account. You won't have to actually pay anything or 
> spend any of that balance though as long as you stick to this guide and only keep 
> 1 single-region instance of your application running.
 - Clone this repository
 - Create your Livepeer API Key on your dashboard: https://livepeer.com/dashboard/developers/api-keys
 - Run `yarn fly` to create a new deployment on `flyctl`.
   - Choose whatever region works best for you. Either the closest one to you or to your users.
   - You will also be prompted for your API key created above.
 - Done! You can now call `POST https://<your app name>.fly.dev/api/stream/init` from your 
webapp to get or create a stream for each user.
   - The user will get a cookie that lasts 7 days so they can keep accessing the same stream.
 - From your web app, you can also use [webrtmp-sdk](https://www.npmjs.com/package/@livepeer/webrtmp-sdk) to stream
directly from the browser, after you have obtained a `streamKey` from the API call above.

## Maintaining

After the first deployment, you can also iterate on the live deployment leveraging fly.io features: 
 - To update the API key that the proxy uses: `yarn fly:api-key` 
 - To update the code that the proxy runs, you can change it at will and run: `yarn fly:deploy`
 - Notice that for building locally and get all development tools you might need to setup local dev environment with `yarn install`

## Contribution

Feel free to fork, send pull requests, or modify this project at your own benefit! 

It's meant just as a sample application to get started, but more complex uses might
certainly require changing how it works.

For example you might want to increment the API proxy logic to have some kind of 
token-gating for who could get a stream key or not. You can adapt the logic from
this other token-gating logic to only create streams for users with allowed Ethereum
addresses: https://github.com/livepeer/livepeer-nft-gate-example
