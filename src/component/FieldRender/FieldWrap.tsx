import { useMemo, memo } from 'react';
import classnames from 'classnames';
import styles from './Field.module.less'
import { FieldWrapProps } from './types'
import { FormHelperText } from '@mui/material';

function FieldWrap(props: FieldWrapProps) {
    const { children, errMsg, label, required, outerStyle = {}, hideLabel } = props;

    const className = useMemo(() => {
        return classnames(styles['field-wrap'], !!errMsg ? 'has-error' : 'has-success', { [styles.required]: required && !!label });
    }, [errMsg, required, label]);

    return (
        <div
            className={className}
            style={{ ...outerStyle }}
        >
            {!hideLabel && label &&
                <div className={classnames(styles['field-label'])}>{label}</div>
            }
            <div className={styles['item-children']}>{children}</div>
            {errMsg &&
                <FormHelperText error>{errMsg}</FormHelperText>
            }
        </div>);
}

export default memo(FieldWrap);