import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountDto } from '../../contracts/child_chain/dto/account.dto';
import { DataValidatorRegisterHandler } from './handlers/register/dataValidator/dataValidatorRegister.handler';
import { AccountService } from '../../contracts/child_chain/account.service';
import { Web3PrivateNetService } from '../../web3/web3PrivateNet.service';
import { Web3MainNetService } from '../../web3/web3MainNet.service';
import { AccountFetcher } from './fetcher/account.fetcher';
import { DataMartRegister } from './handlers/register/dataMart/dataMartRegister';
import { DataOwnerRegister } from './handlers/register/dataOwner/dataOwnerRegister.handler';
import { ServiceNodeRegister } from './handlers/register/serviceNode/serviceNodeRegister';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [
  	DataValidatorRegisterHandler, 
  	AccountDto, 
  	AccountService, 
    Web3PrivateNetService,
  	Web3MainNetService,
  	DataMartRegister,
  	DataOwnerRegister,
  	ServiceNodeRegister,
    AccountFetcher
  ],
})
export class AccountModule {}
