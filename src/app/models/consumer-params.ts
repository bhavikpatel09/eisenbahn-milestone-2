import { City } from './city';
import { Consumer } from './consumer';
import { Restaurant } from './restaurant';

export interface ConsumerParams {
    consumer?: Consumer;
    city?: City;
    restaurant?: Restaurant;
    consumerVoucherDetails?: any;
}
