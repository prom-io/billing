import {Controller, Get, Res} from "@nestjs/common";
import {BuyStorageHandler} from "./useCase/buyStorage/buyStorage.handler";
import {Response} from "express";

@Controller('/api/v1/lambda')
export class StorageController {
    constructor(
       private readonly buyStorageHandler: BuyStorageHandler
    ) {}

    @Get('/buy-storage')
    public async buyStorage(@Res() res: Response) {
        await this.buyStorageHandler.handle();
        return res.status(200).send({message: 'success'});
    }
}
