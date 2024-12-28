import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import AuthService from './authService'; // Import để xử lý refresh token

const SERVER_URL = 'http://127.0.0.1:8081/product';

// Tạo một instance của axios
const axiosInstance = axios.create({
    baseURL: SERVER_URL,
});

// Định nghĩa các interface cho phản hồi API và các đối tượng liên quan
interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    image: string;
    username: string;
}

interface PaginatedUserResponse {
    data: User[];
    totalElements: number;
}

interface ApiResponse<T> {
    code: number;
    result: T;
    message?: string;
}

interface AuthResult {
    success: boolean;
    accessToken?: string;
    message?: string;
}

interface UserServiceResult {
    success: boolean;
    users?: User[];
    totalUser?: number;
    message?: string;
}

// Tạo interceptor để tự động refresh token nếu token hết hạn
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError): Promise<AxiosResponse | Promise<never>> => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Gọi hàm refreshToken để lấy token mới
            const refreshResponse: AuthResult = await AuthService.refreshToken();
            if (refreshResponse.success && refreshResponse.accessToken) {
                // Cập nhật token mới
                localStorage.setItem('accessToken', refreshResponse.accessToken);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${refreshResponse.accessToken}`;

                // Thực hiện lại yêu cầu ban đầu với token mới
                originalRequest.headers = {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${refreshResponse.accessToken}`,
                };
                return axiosInstance(originalRequest);
            } else {
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

class UserService {
    static async getUsers(keyword: string, page: number, size: number): Promise<UserServiceResult> {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axiosInstance.get<ApiResponse<PaginatedUserResponse>>('/get', {
                headers: {Authorization: `Bearer ${token}`},
                params: {keyword, page, size},
            });

            return {
                success: true,
                users: response.data.result.data,
                totalUser: response.data.result.totalElements,
            };
        } catch (error) {
            const err = error as AxiosError<ApiResponse<null>>;
            return {success: false, message: err.response?.data.message};
        }
    }

    static async createUser(user: User): Promise<UserServiceResult> {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axiosInstance.post<ApiResponse<User>>('/create', user, {
                headers: {Authorization: `Bearer ${token}`},
            });

            return {success: true, users: [response.data.result]};
        } catch (error) {
            const err = error as AxiosError<ApiResponse<null>>;
            return {success: false, message: err.response?.data.message};
        }
    }

    static async updateUser(user: User): Promise<UserServiceResult> {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axiosInstance.put<ApiResponse<User>>('/update', user, {
                headers: {Authorization: `Bearer ${token}`},
            });
            return {success: true, users: [response.data.result]};
        } catch (error) {
            const err = error as AxiosError<ApiResponse<null>>;
            return {success: false, message: err.response?.data.message};
        }
    }

    static async deleteUser(userId: string): Promise<{ success: boolean; message?: string }> {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axiosInstance.delete<ApiResponse<null>>(`/delete/${userId}`, {
                headers: {Authorization: `Bearer ${token}`},
            });

            return {success: true, message: undefined};
        } catch (error) {
            const err = error as AxiosError<ApiResponse<null>>;
            return {success: false, message: err.response?.data.message};
        }
    }
}

export default UserService;
