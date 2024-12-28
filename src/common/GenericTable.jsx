import React, {useState} from 'react';
import {
    CButton,
    CCol,
    CFormInput,
    CFormSelect,
    CPagination,
    CPaginationItem,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow
} from '@coreui/react';
import {cilPen, cilTrash} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import PropTypes from "prop-types";

const GenericTable = ({
                          columns,
                          data,
                          onSearch,
                          onAdd,
                          onEdit,
                          onDelete,
                          totalElements,
                          onPageChange,
                          onSizeChange
                      }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSize, setCurrentSize] = useState(10);

    // Tính toán số trang dựa trên totalDataCount từ API
    const pageCount = Math.ceil(totalElements / currentSize);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        onPageChange(pageNumber);
    };

    const handleSizeChange = (e) => {
        setCurrentSize(e.target.value);
        onSizeChange(e.target.value);
    };

    return (
        <div>
            <div className="d-flex justify-content-between mb-3">
                <CCol xs="auto">
                    <CFormInput
                        type="text"
                        id="searchInput"
                        placeholder="Tìm kiếm..."
                        onChange={onSearch}
                    />
                </CCol>
                <CCol xs="auto">
                    <CButton color="primary" onClick={onAdd}>
                        Thêm mới
                    </CButton>
                </CCol>
            </div>
            <CTable>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell className="text-center">#</CTableHeaderCell>
                        {columns.map((column, index) => (
                            <CTableHeaderCell key={index} className="text-center">{column.label}</CTableHeaderCell>
                        ))}
                        <CTableHeaderCell scope="col" className="text-center">Hành động</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((item, rowIndex) => (
                            <CTableRow key={item.id}>
                                <CTableDataCell className="text-center">
                                    {(currentPage - 1) * currentSize + rowIndex + 1}
                                </CTableDataCell>

                                {columns.map((column, colIndex) => (
                                    <CTableDataCell key={colIndex} className="text-center">
                                        {item[column.key] || 'N/A'}
                                    </CTableDataCell>
                                ))}
                                <CTableDataCell className="d-flex justify-content-center align-items-center">
                                    <CButton color="warning" variant="outline" size="sm" onClick={() => onEdit(item)}>
                                        <CIcon icon={cilPen}/>
                                    </CButton>
                                    <CButton color="danger" variant="outline" size="sm"
                                             onClick={() => onDelete(item.id)} className="ms-2">
                                        <CIcon icon={cilTrash}/>
                                    </CButton>
                                </CTableDataCell>
                            </CTableRow>
                        ))
                    ) : (
                        <CTableRow>
                            <CTableDataCell colSpan={columns.length + 2} className="text-center">
                                Không có dữ liệu
                            </CTableDataCell>
                        </CTableRow>
                    )}
                </CTableBody>
            </CTable>
            <div className="d-flex justify-content-between mb-3">
                <CCol xs="auto">
                    <CPagination>
                        <CPaginationItem disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                            Trước
                        </CPaginationItem>
                        {Array.from({length: pageCount}, (_, index) => (
                            <CPaginationItem
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </CPaginationItem>
                        ))}
                        <CPaginationItem disabled={currentPage === (pageCount)}
                                         onClick={() => handlePageChange(currentPage + 1)}>
                            Sau
                        </CPaginationItem>
                    </CPagination>
                </CCol>
                <CCol xs="auto">
                    <div className="d-flex">
                        <CCol xs="auto align-self-center pe-3">
                            <span>Hiển thị: </span>
                        </CCol>
                        <CCol xs="auto">
                            <CFormSelect
                                value={currentSize}
                                onChange={handleSizeChange}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                            </CFormSelect>
                        </CCol>
                    </div>
                </CCol>
            </div>
        </div>
    );
};

GenericTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    totalUsers: PropTypes.array.isRequired,
    totalElements: PropTypes.array.isRequired,
    pageCount: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onSizeChange: PropTypes.func.isRequired,
}

export default GenericTable;
