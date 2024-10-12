import React, { useEffect, useState } from 'react';
import GenericTable from 'common/GenericTable';
import GenericModal from 'common/GenericModal';
import GenericToast from 'common/GenericToast';
import useUserForm from 'hooks/useUserForm';

const UsersContainer = () => {
    const {
        currentUser,
        setCurrentUser,
        selectedItems,
        setSelectedItems,
        resetForm,
        users,
        totalUsers,
        roles,
        toastList,
        fetchUsers,
        fetchCount,
        fetchRoles,
        handleCreateUser,
        handleDeleteUser,
        setKeyword,
        setSize,
        setPage
    } = useUserForm();

    const [visible, setVisible] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        fetchRoles().then(r => r);
    }, []);

    const handleUpdate = (user) => {
        setIsUpdate(true);
        setCurrentUser(user);
        setSelectedItems(user.roles.map(role => ({ value: role.name, label: role.name })));
        setVisible(true);
    };

    const handleAdd = () => {
        setIsUpdate(false);
        resetForm();
        setVisible(true);
    };

    const handleSearch = (e) => {
        setKeyword(e.target.value);
        fetchUsers();
        fetchCount()
    };


    const columns = [
        { label: 'Tên người dùng', key: 'username' },
        { label: 'Họ tên', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Số điện thoại', key: 'phone' },
        { label: 'Địa chỉ', key: 'address' }
    ];

    const inputs = [
        { label: 'Tên người dùng', key: 'username' },
        { label: 'Mật khẩu', key: 'password' },
        { label: 'Họ tên', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Số điện thoại', key: 'phone' },
        { label: 'Địa chỉ', key: 'address' }
    ];

    return (
        <>
            <GenericTable
                columns={columns}
                data={users.map((user, index) => ({ ...user, index: index + 1 }))}
                onSearch={handleSearch}
                onEdit={handleUpdate}
                onDelete={handleDeleteUser}
                onAdd={handleAdd}
                totalDataCount={totalUsers}
                onPageChange={setPage}
                onSizeChange={setSize}
            />
            <GenericModal
                inputs={inputs}
                visible={visible}
                onClose={() => setVisible(false)}
                onSave={() => handleCreateUser(isUpdate)}
                currentData={currentUser}
                setCurrentData={setCurrentUser}
                options={roles}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                isUpdate={isUpdate}
            />
            <GenericToast toasts={toastList} />
        </>
    );
};

export default UsersContainer;
