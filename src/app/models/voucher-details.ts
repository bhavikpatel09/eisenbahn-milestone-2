import { Consumer } from './consumer';
import { Restaurant } from './restaurant';

export interface VoucherDetails {
    id?: number;
    codigo?: string;
    data_cadastro?: Date;
    data_ativacao?: Date;
    data_utilizacao?: Date;
    status?: string;
    cliente?: Restaurant;
    consumidor?:Consumer;
}

export class VOUCHERSTATUS {
    public static utilized = 'VoucherStatusEnum.UTILIZADO';
    public static reserved = 'VoucherStatusEnum.RESERVADO';
}