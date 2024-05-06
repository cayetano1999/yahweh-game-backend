export class IntegrationDto { 
    name: string = '';
    description: string = '';
    url: string = '';
    facts: FactDto[] = [];
}

export class FactDto {
    name: string = '';
    type: string = '';
    active: boolean = true;
}