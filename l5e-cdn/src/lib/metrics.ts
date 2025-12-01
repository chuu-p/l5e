import { register, collectDefaultMetrics } from 'prom-client';

collectDefaultMetrics();

export { register };
