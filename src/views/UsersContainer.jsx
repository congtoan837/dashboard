import React, { useState, useEffect } from 'react';
import GenericTable from '../common/GenericTable';
import GenericModal from '../common/GenericModal';
import GenericToast from '../common/GenericToast';
import UserService from 'services/userService';
import RoleService from 'services/roleService';
import { useTranslation } from "react-i18next";

const initialUserState = {
    id: undefined,
    username: '',
    password: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    roles: []
};

const UsersContainer = () => {
    const { t } = useTranslation();

    const [state, setState] = useState({
        currentUser: initialUserState,
        selectedItems: [],
        users: [],
        totalUsers: 0,
        roles: [],
        toastList: [],
        keyword: '',
        page: 1,
        size: 10,
        visible: false,
        isUpdate: false
    });

    const resetForm = () => setState(prev => ({ ...prev, currentUser: initialUserState, selectedItems: [] }));

    const fetchUsersData = async () => {
        const response = await UserService.getUsers(state.keyword, state.page, state.size);
        if (response.success) {
            setState(prev => ({ ...prev, users: response.users, totalUsers: response.totalUser }));
        } else {
            addToast('danger', response.message || 'Lỗi khi lấy dữ liệu người dùng.');
        }
    };

    const fetchRolesData = async () => {
        const response = await RoleService.getRoles();
        if (response.success) {
            const formattedOptions = response.roles.map(option => ({
                value: option.name,
                label: option.name
            }));
            setState(prev => ({ ...prev, roles: formattedOptions }));
        } else {
            addToast('danger', 'Lỗi máy chủ');
        }
    };

    useEffect(() => { fetchUsersData(); }, [state.keyword, state.page, state.size]);
    useEffect(() => { fetchRolesData(); }, []);

    const handleCreateUser = async () => {
        const { currentUser, selectedItems, isUpdate } = state;
        if (!currentUser.username || !currentUser.name || !currentUser.email) {
            addToast('warning', 'Vui lòng nhập đầy đủ thông tin.');
            return;
        }
        currentUser.roles = selectedItems.map(item => item.value);
        const response = isUpdate ? await UserService.updateUser(currentUser) : await UserService.createUser(currentUser);
        if (response.success) {
            fetchUsersData();
            setState(prev => ({ ...prev, visible: false }));
            addToast('success', isUpdate ? 'Cập nhật thành công' : 'Tạo mới thành công');
        } else {
            addToast('danger', response.message || 'Lỗi khi tạo/cập nhật người dùng.');
        }
    };

    const handleDeleteUser = async (userId) => {
        const result = await UserService.deleteUser(userId);
        if (result.success) {
            fetchUsersData();
            addToast("success", "Xóa thành công");
        } else {
            addToast('danger', result.message || 'Lỗi không thể xóa người dùng.');
        }
    };

    const addToast = (type, message) => {
        const newToast = { type, message, visible: true };
        setState(prev => ({ ...prev, toastList: [...prev.toastList, newToast] }));
    };

    const handleUpdate = (user) => {
        setState(prev => ({
            ...prev,
            isUpdate: true,
            currentUser: user,
            selectedItems: user.roles.map(role => ({ value: role.name, label: role.name })),
            visible: true
        }));
    };

    const handleAdd = () => {
        setState(prev => ({ ...prev, isUpdate: false, visible: true }));
        resetForm();
    };

    const handleSearch = (event) => setState(prev => ({ ...prev, keyword: event.target.value }));

    const columns = [
        { label: 'Tên người dùng', key: 'username' },
        { label: 'Họ tên', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Số điện thoại', key: 'phone' },
        { label: 'Địa chỉ', key: 'address' }
    ];

    const inputs = [
        { label: 'Tên người dùng', key: 'username', type: 'text', isUpdate: false },
        { label: 'Mật khẩu', key: 'password', type: 'text', isUpdate: true },
        { label: 'Họ tên', key: 'name', type: 'text', isUpdate: true },
        { label: 'Email', key: 'email', type: 'email', isUpdate: true },
        { label: 'Số điện thoại', key: 'phone', type: 'text', isUpdate: true },
        { label: 'Địa chỉ', key: 'address', type: 'text', isUpdate: true },
    ];

    const { users, totalUsers, roles, toastList, visible, currentUser, selectedItems, isUpdate } = state;

    return (
        <>
            <GenericTable
                columns={columns}
                data={users}
                onSearch={handleSearch}
                onEdit={handleUpdate}
                onDelete={handleDeleteUser}
                onAdd={handleAdd}
                totalElements={totalUsers}
                onPageChange={(page) => setState(prev => ({ ...prev, page }))}
                onSizeChange={(size) => setState(prev => ({ ...prev, size }))}
            />
            <GenericModal
                inputs={inputs}
                visible={visible}
                onClose={() => setState(prev => ({ ...prev, visible: false }))}
                onSave={handleCreateUser}
                currentData={currentUser}
                setCurrentData={(data) => setState(prev => ({ ...prev, currentUser: data }))}
                options={roles}
                selectedItems={selectedItems}
                setSelectedItems={(items) => setState(prev => ({ ...prev, selectedItems: items }))}
                isUpdate={isUpdate}
            />
            <GenericToast toasts={toastList} />
        </>
    );
};

export default UsersContainer;
