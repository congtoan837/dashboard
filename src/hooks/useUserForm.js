import { useState, useEffect } from 'react';
import UserService from 'services/userService';
import RoleService from 'services/roleService';

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

const useUserForm = () => {
    const [currentUser, setCurrentUser] = useState(initialUserState);
    const [selectedItems, setSelectedItems] = useState([]);
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [roles, setRoles] = useState([]);
    const [toastList, setToastList] = useState([]);

    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const resetForm = () => {
        setCurrentUser(initialUserState);
        setSelectedItems([]);
    };

    // Hàm này được gọi khi keyword, page, hoặc size thay đổi
    useEffect(() => {
        fetchUsers().then(r => r);
    }, [keyword, page, size]);

    const fetchRoles = async () => {
        try {
            const rolesResult = await RoleService.getRoles();
            if (rolesResult.success) {
                const formattedOptions = rolesResult.roles.map(option => ({
                    value: option.name,
                    label: option.name
                }));
                setRoles(formattedOptions);
            } else {
                throw new Error('Failed to fetch');
            }
        } catch (error) {
            console.error('Error fetching:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const usersResult = await UserService.getUsers(keyword, page, size);
            const totalUsersResult = await UserService.countUsers(keyword)
            if (usersResult.success) {
                setUsers(usersResult.users)
                setTotalUsers(totalUsersResult.totalUsers)
            } else {
                throw new Error('Failed to fetch');
            }
        } catch (error) {
            console.error('Error fetching:', error);
        }
    };

    const fetchCount = async () => {
        try {
            const countResult = await UserService.countUsers(keyword);
            if (countResult.success) {
                return setTotalUsers(countResult.totalUsers);
            } else {
                throw new Error('Failed to fetch');
            }
        } catch (error) {
            console.error('Error fetching:', error);
        }
    };

    const handleCreateUser = async (isUpdate) => {
        currentUser.roles = selectedItems.map(item => item.value);
        const result = isUpdate ? await UserService.updateUser(currentUser) : await UserService.createUser(currentUser);

        if (result.success) {
            resetForm();
            // Lấy người dùng mới sau khi tạo hoặc cập nhật
            await fetchUsers();
            addToast("success", isUpdate ? "Cập nhật thành công" : "Tạo thành công");
        } else {
            addToast('danger', result.message);
        }
    };

    const handleDeleteUser = async (userId) => {
        const result = await UserService.deleteUser(userId);
        if (result.success) {
            // Lấy người dùng mới sau khi xóa
            await fetchUsers();
            addToast("success", "Xóa thành công");
        } else {
            addToast('danger', result.message);
        }
    };

    const addToast = (type, message) => {
        const newToast = { type, message, visible: true };
        setToastList([...toastList, newToast]);
    };

    return {
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
        setPage,
        setSize,
        page,
        size,
    };
};

export default useUserForm;
