import { Module, Global } from '@nestjs/common';
import { Web3PrivateNetService } from './web3PrivateNet.service';
import { Web3MainNetService } from './web3MainNet.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [Web3PrivateNetService, Web3MainNetService],
})
export class Web3Module {}
