import React from 'react'
import { IconType, IconSize } from './Icon.d'
import './icon.scss'
import classNames from 'classnames'
import { createFromIconfontCN } from '@ant-design/icons';

// const IconComp = createFromIconfontCN({ scriptUrl: '//at.alicdn.com/t/font_2815956_23pk0lp8w4q.js'})

const Icon: React.FC<IconType> = function({
    size = IconSize.L,
    disabled = false,
    additionalClasses = "",
    type,
    ...otherProps
}) {
    return <i
            className={classNames(
                {
                    "icon--large": size === "large",
                    "icon--normal": size === "normal",
                    "icon--small": size === "small",
                    "disabled": disabled,
                },
                'no-migraine-icon-' + type,
                "iconfont",
                additionalClasses
            )}
            {...otherProps}
        />;
}

export default Icon;