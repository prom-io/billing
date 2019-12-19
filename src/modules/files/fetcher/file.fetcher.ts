import { Injectable, BadRequestException } from '@nestjs/common';
import { DataUploadService } from '../../../contracts/child_chain/dataUpload.service';
import { Web3PrivateNetService } from '../../../web3/web3PrivateNet.service';
import Web3 from 'web3';

@Injectable()
export class FileFetcher {
	private web3: Web3;
	public constructor(private readonly dataUpload: DataUploadService, web3Service: Web3PrivateNetService) {
		this.web3 = web3Service.websocketInstance();
	}

	public async paginateByAddress(address: string, pageNumber: number, pageSize: number): Promise<any> {
		let fileCount = await this.dataUpload.fileUploadedCount(address);
		let files = {
			'count': fileCount,
			'data': []
		};
		let counter = fileCount - (pageSize * pageNumber);
		let max = counter - pageSize;
		if(max < 0) {
			max = 0	
		}

		for (counter; counter > max; counter--) {

			let file = await this.dataUpload.fileUploaded(address, counter);
			let uploaded = await this.dataUpload.uploadedData(file.id);
			let fileItem = {
				'id': file.id,
				'name': file.name,
				'size': file.size,
				'file_extension': file.file_extension,
				'mime_type': file.mime_type,
				'meta_data': file.meta_data,
				'owner': file.owner,
				'buy_sum': this.web3.utils.fromWei(uploaded.buySum + "", 'ether'),
				'data_owner': uploaded.dataOwner,
				'sum': this.web3.utils.fromWei(uploaded.sum, 'ether')
			};
			files['data'].push(fileItem);
		}
		return files;
	}

	public async paginate(pageNumber: number, pageSize: number): Promise<any> {
		let fileCount = await this.dataUpload.fileCount();
		let files = {
			'count': fileCount,
			'data': []
		};
		let counter = fileCount - (pageSize * pageNumber);
		let max = counter - pageSize;
		if(max < 0) {
			max = 0	
		}
		// for (counter; counter > max; counter--) {
		for (max; max <= counter; max++) {
			let file = await this.dataUpload.fileList(max);
			let uploaded = await this.dataUpload.uploadedData(file.id);
			let fileItem = {
				'id': file.id,
				'name': file.name,
				'size': file.size,
				'file_extension': file.file_extension,
				'mime_type': file.mime_type,
				'meta_data': file.meta_data,
				'owner': file.owner,
				'buy_sum': this.web3.utils.fromWei(uploaded.buySum + "", 'ether'),
				'data_owner': uploaded.dataOwner,
				'sum': this.web3.utils.fromWei(uploaded.sum, 'ether')
			};
			files['data'].push(fileItem);
		}
		return files;
	}
}