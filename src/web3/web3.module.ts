import { Module, Global } from '@nestjs/common';
import { Web3PrivateNetService } from './web3PrivateNet.service';
import { Web3MainNetService } from './web3MainNet.service';
import {PlasmaNetworkService} from "./plasmaNetwork.service";
import {Web3Service} from "./web3.service";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [Web3PrivateNetService, Web3MainNetService, PlasmaNetworkService, Web3Service],
})
export class Web3Module {}
