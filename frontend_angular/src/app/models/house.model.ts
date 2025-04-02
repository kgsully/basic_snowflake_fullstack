export interface House {
    HOUSENAME: 'string',
    ADDRESS: 'string',
    PHOTO: 'string'
}

export function isHouse(item: any): item is House {
    return (
        typeof item === 'object' &&
        item !== null &&
        item !== undefined &&
        typeof item.HOUSENAME === 'string' &&
        typeof item.ADDRESS === 'string' &&
        typeof item.PHOTO === 'string'
    )
}

export function isHouseArray(item: any): item is House[] {
    return Array.isArray(item) && item.every(isHouse);
}
