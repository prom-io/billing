import {Module} from "@nestjs/common";
import {SignController} from "./sign.controller";
import {Web3SignService} from "./services/web3Sign.service";
import Web3 from "web3";

@Module({
    imports: [],
    controllers: [SignController],
    providers: [Web3SignService, Web3],
})
export class SignModule {}
