import { Module } from '@nestjs/common';
import { FileController } from './file.controller'
import { FileFetcher } from './fetcher/file.fetcher';
import { DataUploadService } from '../../contracts/child_chain/dataUpload.service';
import { AccountService } from '../../contracts/child_chain/account.service';
import { Web3PrivateNetService } from '../../web3/web3PrivateNet.service';
import { Web3MainNetService } from '../../web3/web3MainNet.service';
@Module({
  imports: [],
  controllers: [FileController],
  providers: [FileFetcher, DataUploadService, AccountService, Web3PrivateNetService, Web3MainNetService],
})
export class FileModule {}
