import React, { useMemo, memo } from 'react';
import classnames from 'classnames';
import styles from './Field.module.less';

function FieldWrap(props) {
    const { children, errMsg, label, required, strongLabel, isInTable, outerStyle } = props;

    const className = useMemo(() => {
        return classnames(styles['field-wrap'], !!errMsg ? 'has-error' : 'has-success', { [styles.required]: required && !!label, [styles['in-table']]: isInTable });
    }, [errMsg, required, label, isInTable]);

    return (
        <div className={className}
            style={{ ...outerStyle }}
        >
            {label &&
                <div className={classnames(styles['field-label'], { [styles.strong]: strongLabel })}>{label}</div>
            }
            <div className={styles['item-children']}>{children}</div>
            {errMsg &&
                <div className={styles['err-msg']}>{errMsg}</div>
            }
        </div>);
}

export default memo(FieldWrap);