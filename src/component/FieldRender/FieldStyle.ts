import { Theme } from "@mui/material"
import { createStyles } from "@mui/styles"

const style = (theme: Theme) => createStyles({
    hookForm: {
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex - start',
        padding: '12px',
        overflow: 'auto',
        position: 'relative',
    },

    fieldWrap: {
        position: 'relative',
        margin: '0 0 16px',
        padding: '0 12px',
        width: '100%',
    },
    required: {
        '&::before': {
            content: "'*'",
            color: theme.palette.error.main,
            display: 'inline-block',
            fontSize: '14px',
            position: 'absolute',
            top: 0,
            left: '5px',
            bottom: 0,
            margin: 0,
            height: '10px',
        }
    },
    hasError: {
        marginBottom: '2px',
    },
    fieldLabel: {
        color: '#757575',
        fontSize: '13px',
    }
})

export default style