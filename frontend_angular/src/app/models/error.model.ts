export interface ApiError {
    error: 'string'
}

export function isApiError(item: any): item is ApiError {
    return (
        item !== null &&
        item !== undefined &&
        typeof item === 'object' &&
        typeof item.error === 'string'
    )
}
