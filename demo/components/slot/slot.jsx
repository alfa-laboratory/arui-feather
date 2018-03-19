// Inspired by https://github.com/camwest/react-slot-fill

import React from 'react';
import Type from 'prop-types';

export default function Slot({
    name, active, onlyActive, props = {}
}, { slots }) {
    const fills = slots[name];
    if (!fills) {
        throw new Error(`Slot "${name}" not found, available slots: ${Object.keys(slots).join(', ')}`);
    }

    const rendered = fills.map((Fill, index) => {
        // { id: 'pizza', render: ({ foo }) => <div>{foo}</div>, children: 'bar' }
        const { id, render, children } = Fill;
        if (id && render) {
            // Render only specified fill
            if (onlyActive && id !== active) {
                return null;
            }

            const { onClick } = props;
            props = {
                ...props,
                name: id,
                // Set active prop to active fill
                active: active && id === active,
                // Pass fill ID to onClick event handler
                // eslint-disable-next-line react/prop-types
                onClick: onClick && ((...attrs) => onClick(id, ...attrs))
            };

            Fill = render;
        }

        return <Fill key={ index } { ...props }>{ children }</Fill>;
    });

    const filtered = rendered.filter(Boolean);

    if (filtered.length === 0) {
        return null;
    }

    return filtered;
}

Slot.propTypes = {
    name: Type.string.isRequired,
    active: Type.string,
    onlyActive: Type.bool,
    props: Type.object
};

Slot.contextTypes = {
    slots: Type.object.isRequired
};
