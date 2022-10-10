import TransferList from './TransferList'

/**
 * 格式为
 * [type]: Component
 */
const fieldMap: Record<string, any> = {
    "TransferList": TransferList
}

export const getField = (fieldType: string) => fieldMap[fieldType]