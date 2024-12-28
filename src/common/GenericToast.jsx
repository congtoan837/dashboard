import React from 'react';
import {CToast, CToastBody, CToastClose, CToaster} from '@coreui/react';

const GenericToast = ({toasts}) => {
    return (
        <CToaster placement="top-end" className="p-3">
            {toasts.map((toast, index) => (
                <CToast
                    key={index}
                    animation={true}
                    autohide={true}
                    delay={1500}
                    color={toast.type}
                    visible={toast.visible}
                >
                    <div className="d-flex">
                        <CToastBody>{toast.message}</CToastBody>
                        <CToastClose className="me-2 m-auto"/>
                    </div>
                </CToast>
            ))}
        </CToaster>
    );
};

export default GenericToast;
