import {HttpService, Injectable} from "@nestjs/common";
import {ConfigService} from "../../../config/config.service";
import {AxiosResponse} from "axios";
import {AccountResponse} from "../httpResponse/account.response";

@Injectable()
export class AccountRequest {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {}

    public getAccountData(address: string): Promise<AxiosResponse<AccountResponse>> {
        return this.httpService.get('/auth/accounts/' + address, {
            baseURL: this.configService.get('LAMBDA_API_URL')
        }).toPromise();
    }
}
