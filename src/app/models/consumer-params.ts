import { City } from './city';
import { Consumer } from './consumer';
import { Restaurant } from './restaurant';

export interface ConsumerParams {
    isAgeGatePassed?: boolean;
    consumer?: Consumer;
    city?: City;
    restaurant?: Restaurant;
    consumerVoucherDetails?: any;
}
