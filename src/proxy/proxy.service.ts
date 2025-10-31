
import { Effect } from 'effect';
import axios from 'axios';

export class ProxyService {
    fetch = (url: string) =>
        Effect.tryPromise({
            try: () => axios.get(url),
            catch: (error) => new Error(`Failed to fetch: ${error instanceof Error ? error.message : String(error)}`),
        });
}
