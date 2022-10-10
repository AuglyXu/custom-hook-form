import React, { memo } from 'react';
import classnames from 'classnames';
import { FieldWrapProps as InternalWrapProps } from './types'
import { FormHelperText } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import styles from './FieldWrapStyle'

interface FieldWrapProps extends WithStyles<typeof styles, true>, InternalWrapProps { }

const FieldWrap: React.FC<FieldWrapProps> = (props: FieldWrapProps) => {
    const { children, errMsg, label, required, outerStyle = {}, hideLabel, classes } = props;

    return (
        <div
            className={classnames(classes['fieldWrap'], !!errMsg ? 'has-error' : 'has-success')}
            style={{ ...outerStyle }}
        >
            {!hideLabel && label &&
                <div className={classnames(classes['fieldLabel'], { [classes.required]: required })}>{label}</div>
            }
            <div>{children}</div>
            {errMsg &&
                <FormHelperText error>{errMsg}</FormHelperText>
            }
        </div>);
}

export default withStyles(styles, { withTheme: true })(memo(FieldWrap));