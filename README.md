# Billing service

## Table of contents

- [Description](#description)
- [How it works](#how-it-works)
- [How to run](#how-to-run)
- [How to test](#how-to-test)

## Description

The service is responsible for payment in the Prometheus project. When downloading data, the service distributes the funds between the service node and the data validator. When purchasing data, the service pays to data validator.

Billing is a service which provides payment for transactions related to downloading and purchasing data. Each transaction is stored in a plasma-decentralized data storage based on the Ethereum blockchain.

The essence of plasma is that its use allows you to save all transactions and display data about it for the user immediately after the transaction, without waiting for confirmation of the ethereum network.
If the transaction is not confirmed, then the plasma repeats it until success is achieved.

For the relevance of plasma data, transactions will be synchronized with the main network of Ethereum every hour. All transactions received after synchronization will be collected in one transaction, thereby saving gas
 

## How it works
- Deployment of smart contracts in a private network
- Deployments of the smart contract in the main network
- Deployments the backend part for interacting with a smart contract

## How to run
- Start two private ganache networks
- Deploy Contracts
- Deploy a server on node js
- Deploy frontend part (optional)

## How to test

Test stand: http://178.62.211.224

The billing service has a frontend part.

There are three sections to the frontend of the part:
- Data loading
- Buying data
- Transactions

### Data loading section:
The section is responsible for simulating payment when downloading data on a private network.
There are 5 fields on the page:
1. Current user address
2. Service node address
3. Data owner address
4. Cost of data
5. Amount to be paid
When you click on the send button, a transaction to load data is launched, with a passage of 10-15 seconds
A modal window with transaction data will open.

### Purchase data section:
The section is responsible for simulating when purchasing data on a private network.
There are 3 fields on the page:
1. Current user address
2. Data validator address
3. Amount to be paid
When you click on the send button, a transaction to purchase data will start, with a passage of 10-15 seconds
A modal window with transaction data will open.

### Transaction Section:
The section displays transactions made in the previous two sections.

