import React, { FC } from 'react';
import {
    OkLIcon, OkMIcon, OkSIcon, OkXlIcon,
} from '@alfalab/icons-classic';

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
