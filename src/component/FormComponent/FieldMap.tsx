import TransferList from './TransferList'
import { TextField } from '@mui/material'

/**
 * 格式为
 * [type]: Component
 */
const fieldMap: Record<string, any> = {
    "TransferList": TransferList,
    "TextField": TextField
}

export const getField = (fieldType: string) => fieldMap[fieldType]