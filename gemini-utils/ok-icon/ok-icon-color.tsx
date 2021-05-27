import React, { FC } from 'react';
import {
    OkLColorIcon, OkMColorIcon, OkSColorIcon, OkXlColorIcon,
} from '@alfalab/icons-classic';

const icons = {
    s: <OkSColorIcon />,
    l: <OkLColorIcon />,
    xl: <OkXlColorIcon />,
    m: <OkMColorIcon />,
};

type Props = {
    size: string;
}

const OkColorIcon: FC<Props> = ({ size }) => icons[size] || <OkMColorIcon />;

export default OkColorIcon;
