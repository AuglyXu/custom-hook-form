import React, { useMemo, memo } from 'react';
import classnames from 'classnames';
import { FieldWrapProps as InternalWrapProps } from './types'
import { FormHelperText } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import styles from './FieldStyle'

interface FieldWrapProps extends WithStyles<typeof styles, true>, InternalWrapProps {}

const FieldWrap: React.FC<FieldWrapProps> = (props: FieldWrapProps) => {
    const { children, errMsg, label, required, outerStyle = {}, hideLabel, classes } = props;

    const className = useMemo(() => {
        return classnames(classes['fieldWrap'], !!errMsg ? 'has-error' : 'has-success', { [classes.required]: required && !!label });
    }, [errMsg, required, label, classes]);

    return (
        <div
            className={className}
            style={{ ...outerStyle }}
        >
            {!hideLabel && label &&
                <div className={classnames(classes['fieldLabel'])}>{label}</div>
            }
            <div>{children}</div>
            {errMsg &&
                <FormHelperText error>{errMsg}</FormHelperText>
            }
        </div>);
}

export default withStyles(styles, { withTheme: true })(memo(FieldWrap));