import React from 'react';

export const withModal = (WrappedComponent) => {
    return function withModalComponent(props) {
        return (
            <WrappedComponent {...props} />
        )

    }
}