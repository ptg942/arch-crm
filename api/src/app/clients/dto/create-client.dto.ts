import {ClientStatusEnum, ClientTypeEnum} from "@arch-crm/general";

export class CreateClientDto {
    name!: string;
    type!: ClientTypeEnum;
    status?: ClientStatusEnum;
    phone!: string;
    email!: string;
    address!: string;
    inn?: string;
    responsibleUserId!: string;
    contacts!: ContactDto;
}

export class ContactDto {
    fullName!: string;
    position!: string;
    phone!: string;
    email!: string;
}
