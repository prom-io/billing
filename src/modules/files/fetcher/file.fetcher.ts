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

	public async paginate(pageNumber: number, pageSize: number): Promise<any> {
		let fileCount = await this.dataUpload.fileCount();
		console.log(111);
		let files = {
			'count': fileCount,
			'data': []
		};
		let max = pageSize * pageNumber;
		let counter = (max - pageSize) + 1;
		if(pageNumber == 1) {
			let counter = 1;
		}

		if(fileCount >= 1) {
			
			if(max > fileCount) {
				max = fileCount;
			}

			for (counter; counter <= max; counter++) {
				var file = await this.dataUpload.fileList(counter);
				var uploaded = await this.dataUpload.uploadedData(file.id);
				console.log(uploaded);
				var fileItem = {
					'id': file.id,
					'name': file.name,
					'size': file.size,
					'file_extension': file.file_extension,
					'mime_type': file.mime_type,
					'owner': file.owner,
					'sum': this.web3.utils.fromWei(uploaded.sum, 'ether')
				};
				files['data'].push(fileItem);
			}
		}
		return files;
	}
}