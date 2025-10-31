
import { Controller, Get, Query } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { Effect } from 'effect';

@Controller('proxy')
export class ProxyController {
    constructor(private readonly proxy: ProxyService) {}

    @Get()
    async handleProxy(@Query('url') url: string) {
        const result = await Effect.runPromise(this.proxy.fetch(url));
        return result.data;
    }
}
