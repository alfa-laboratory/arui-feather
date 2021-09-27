import React, { FC } from 'react';
import {
    OkLIcon
} from '@alfalab/icons-classic/OkLIcon';
import {
    OkMIcon
} from '@alfalab/icons-classic/OkMIcon';
import {
    OkSIcon
} from '@alfalab/icons-classic/OkSIcon';
import {
    OkXlIcon,
} from '@alfalab/icons-classic/OkXlIcon';

const icons = {
    s: <OkSIcon />,
    l: <OkLIcon />,
    xl: <OkXlIcon />,
    m: <OkMIcon />,
};

type Props = {
    size: string;
}

const OkIcon: FC<Props> = ({ size }) => icons[size] || <OkMIcon />;

export default OkIcon;
