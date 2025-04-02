export interface HouseEvent {
    ID?: number,
    HOUSENAME: string,
    EVENTNAME: string,
    DATE?: string,
    FAMILY: string,
}

export function isHouseEvent(item: any): item is HouseEvent {
    return (
        item !== null &&
        item !== undefined &&
        typeof item === 'object' &&
        typeof item.ID === 'number' &&
        typeof item.HOUSENAME === 'string' &&
        typeof item.EVENTNAME === 'string' &&
        (!item.DATE || typeof item.DATE === 'string') &&
        typeof item.FAMILY === 'string'
    )
}

export function isHouseEventArray(item: any): item is HouseEvent[] {
    return Array.isArray(item) && item.every(isHouseEvent);
}
