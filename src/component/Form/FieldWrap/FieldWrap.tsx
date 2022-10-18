import React, { memo } from 'react';
import classnames from 'classnames';
import { FieldWrapProps as InternalWrapProps } from './types'
import { FormHelperText } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import styles from './FieldWrapStyle'

interface FieldWrapProps extends WithStyles<typeof styles, true>, InternalWrapProps { }

const FieldWrap: React.FC<FieldWrapProps> = (props: FieldWrapProps) => {
    const { children, errMsg, label, required, outerStyle = {}, hideLabel, classes, shrink, customErrorText } = props;

    return (
        <div
            className={classnames(classes['fieldWrap'], !!errMsg ? 'has-error' : 'has-success', { [classes.shrinkStyle]: shrink })}
            style={{ ...outerStyle }}
        >
            {
                (!hideLabel && label) ?
                    <div className={classnames(classes['fieldLabel'], { [classes.required]: required, [classes.shrinkStyle]: shrink })}>{label}</div>
                    :
                    <div style={{ height: shrink ? 20 : 29 }} />  // 撑起高度, 20px的字体高度+9px的margin, 在 +1 像素
            }
            <div>{children}</div>
            {!customErrorText && errMsg &&
                <FormHelperText error>{errMsg}</FormHelperText>
            }
        </div>);
}

export default withStyles(styles, { withTheme: true })(memo(FieldWrap));