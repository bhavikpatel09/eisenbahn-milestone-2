import { City } from './city';
import { Consumer } from './consumer';
import { Restaurant } from './restaurant';

export class VoucherRequest {
    public consumidor: Consumer;
    public cidade: City;
    public cliente: Restaurant;
}

