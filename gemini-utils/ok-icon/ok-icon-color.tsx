import React, { FC } from 'react';
import {
    OkLColorIcon
} from '@alfalab/icons-classic/OkLColorIcon';
import {
    OkMColorIcon
} from '@alfalab/icons-classic/OkMColorIcon';
import {
    OkSColorIcon
} from '@alfalab/icons-classic/OkSColorIcon';
import {
    OkXlColorIcon,
} from '@alfalab/icons-classic/OkXlColorIcon';

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
