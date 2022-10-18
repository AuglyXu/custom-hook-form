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
        '&::after': {
            content: "'*'",
            color: theme.palette.error.main,
            display: 'inline-block',
            fontSize: '14px',
            margin: '0 0 0 10px',
            height: '10px',
        }
    },
    hasError: {
        marginBottom: '2px',
    },
    fieldLabel: {
        color: '#757575',
        fontSize: '13px',
    },
    shrinkStyle: {
        marginBottom: 0
    }
})

export default style