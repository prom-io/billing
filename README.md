# Billing service

## Table of contents

- [Description](#description)
- [How it works](#how-it-works)
- [How to run](#how-to-run)
    - [Prerequisites](#prerequisites)
    - [Build and run process](#build-and-run-process)
        - [Running inside Docker](#running-inside-docker)
        - [Running outside Docker](#running-outside-docker)
- [License](#license)

## Description

The service is responsible for all the business logic, concerning flow of tokens in Stoa: 
Data Exchange Platform within Prometeus ecosystem. 
When any business transaction is executed, billing service distributes the tokens from the payer to recipients. 

## How it works

When data is beeing uploaded to the Storage, the service transfers tokens from the Data Validator to the Service Node (it passes tokens to the Storage via tokenswap). 

When data is beeing purchased, the service distributes tokens recieved from the Data Mart between Data Validator and Data Owner. 

Each transaction is stored in a Plasma - tree-like structure of numerous chains (able to handle more transactions per second) based on the Ethereum blockchain. The essence of Plasma is that its use allows you to save all transactions and display data about it for the user immediately after the transaction, without waiting for confirmation of the Ethereum network. If the transaction is not confirmed, then the plasma repeats it until success is achieved.

For the relevance of plasma data, transactions will be synchronized with the main network of Ethereum every hour. 
All the transactions received after synchronization will be collected in one transaction, thereby saving gas.

You can see all the transactions via Prometeus Blockchain Explorer: http://178.62.211.224

All the interactions with billing happen through Service node, which is responsible for connecting all the nodes with each other.

Billing deployment is integrated in the standard process of running a Service Node.

## How to run

### Prerequisites

In order to run a service node, you need to install:
- Docker. You can find installation instructions on 
[official website](https://docs.docker.com/install/).
- Docker-compose, which can be found 
[here](https://docs.docker.com/compose/install/).
- If you want to run service-node outside of docker container, 
you will need NodeJS installed. 
You can find installations instructions [here](https://nodejs.org/en/download/).

### Build and run process

Firstly, you need to clone service-node from repository:

````
git clone https://github.com/Prometeus-Network/service-node_net.git
````

After repository is cloned, perform next commands:

````
git submodule init 
git submodule update
````

This will download go-ethereum submodule.

#### Running inside Docker

To run Service node inside Docker, execute the following command:

````
docker-compose up --build
````

#### Running outside Docker

If you want to run service node outside docker container, you will need to perform next steps:
- Execute `build.sh` script. It will build go-ethereum;
- Run `npm install`. 
This will install dependencies required for Service node;
- Run `npm run c`. This command will compile typescript;
- Run `npm run start` to start the application.
 
## License

Prometeus Network is licensed under the Apache software license (see LICENSE [file](https://github.com/Prometeus-Network/prometeus/blob/master/LICENSE)). Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either \express or implied.

Prometeus Network makes no representation or guarantee that this software (including any third-party libraries) will perform as intended or will be free of errors, bugs or faulty code. The software may fail which could completely or partially limit functionality or compromise computer systems. If you use or implement it, you do so at your own risk. In no event will Prometeus Network be liable to any party for any damages whatsoever, even if it had been advised of the possibility of damage.

As such this codebase should be treated as experimental and does not contain all currently developed features. Prometeus Network will be delivering regular updates.
