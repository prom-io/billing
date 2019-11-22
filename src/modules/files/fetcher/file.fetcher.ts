import { Injectable, BadRequestException } from '@nestjs/common';
import { DataUploadService } from '../../../contracts/child_chain/dataUpload.service';

@Injectable()
export class FileFetcher {
	public constructor(private readonly dataUpload: DataUploadService) {}

	public async paginate(pageNumber: number, pageSize: number): Promise<any> {
		let fileCount = await this.dataUpload.fileCount();
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
				console.log(file);
				var fileItem = {
					'id': file.id,
					'name': file.name,
					'size': file.size,
					'file_extension': file.file_extension,
					'mime_type': file.mime_type,
					'owner': file.owner
				};
				files['data'].push(fileItem);
			}
		}
		return files;
	}
}