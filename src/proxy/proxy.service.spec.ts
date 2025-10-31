
import { ProxyService } from './proxy.service';
import { Effect } from 'effect';

describe('ProxyService', () => {
    it('should fetch data', async () => {
        const proxy = new ProxyService();
        const result = await Effect.runPromise(proxy.fetch('https://jsonplaceholder.typicode.com/posts/1'));
        expect(result.data).toHaveProperty('id', 1);
    });
});
