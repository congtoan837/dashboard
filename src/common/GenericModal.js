import React from 'react';
import {
    CButton, CFormInput, CInputGroup, CModal, CModalBody, CModalFooter,
    CModalHeader, CModalTitle
} from '@coreui/react';
import MultiSelectBox from 'components/MultiSelectBox';

const GenericModal = ({ inputs, visible, onClose, onSave, currentData, setCurrentData, options, selectedItems, setSelectedItems, isUpdate }) => {
    const handleSave = () => {
        onSave(currentData);
    };

    return (
        <CModal
            alignment="center"
            visible={visible}
            onClose={onClose}
            aria-labelledby="StaticBackdropExampleLabel"
        >
            <CModalHeader>
                <CModalTitle id="StaticBackdropExampleLabel">{isUpdate ? "Cập nhật" : "Thêm mới"}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <div>
                    {inputs.map((input, index) => (
                        <CInputGroup className="mb-3" key={index}>
                            <CFormInput
                                type="text"
                                placeholder={input.label}
                                value={currentData[input.key] || ""}
                                onChange={(e) => setCurrentData({ ...currentData, [input.key]: e.target.value })}
                            />
                        </CInputGroup>
                    ))}
                    {options && options.length > 0 && (
                        <MultiSelectBox
                            selectedItems={selectedItems}
                            onChange={setSelectedItems}
                            options={options}
                        />
                    )}
                </div>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary" onClick={handleSave}>Lưu</CButton>
            </CModalFooter>
        </CModal>
    );
};

export default GenericModal;
