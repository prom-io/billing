import {Body, Controller, Post, Res} from "@nestjs/common";
import {Web3SignService} from "./services/web3Sign.service";
import {Response} from "express";

@Controller('/api/v1/sign')
export class SignController {
    constructor(private readonly web3SignService: Web3SignService) {}

    @Post('/')
    public signJson(
        @Body('data') data: object,
        @Body('privateKey') privateKey: string,
        @Res() res: Response
    ) {
        return res.status(200).send(this.web3SignService.signData(data, privateKey));
    }
}
