# Billing service

## Table of contents

- [Description](#description)
- [License](#license)

## Description

The service is responsible for all the business logic, concerning flow of tokens in the Prometeus project. When any business transaction is executed, billing service distributes the tokens from the payer to recipients. Fir instance, when data is uploading to the Storage, the service transfer the tokens from the Data Validator to the Service Node (it passes tokens to the Storage via tokenswap). When purchasing data, the service distributes tokens recieved from the Data Mart between Data Validator and Data Owner. Each transaction is stored in a Plasma - tree-like structure of numerous chains (able to handle more transactions per second) based on the Ethereum blockchain. The essence of Plasma is that its use allows you to save all transactions and display data about it for the user immediately after the transaction, without waiting for confirmation of the Ethereum network. If the transaction is not confirmed, then the plasma repeats it until success is achieved.

For the relevance of plasma data, transactions will be synchronized with the main network of Ethereum every hour. 
All the transactions received after synchronization will be collected in one transaction, thereby saving gas.

Prometeus Blockchain Explorer: http://178.62.211.224
 
## License

Prometeus Network is licensed under the Apache software license (see LICENSE [file](https://github.com/Prometeus-Network/prometeus/blob/master/LICENSE)). Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either \express or implied.

Prometeus Network makes no representation or guarantee that this software (including any third-party libraries) will perform as intended or will be free of errors, bugs or faulty code. The software may fail which could completely or partially limit functionality or compromise computer systems. If you use or implement it, you do so at your own risk. In no event will Prometeus Network be liable to any party for any damages whatsoever, even if it had been advised of the possibility of damage.

As such this codebase should be treated as experimental and does not contain all currently developed features. Prometeus Network will be delivering regular updates.
