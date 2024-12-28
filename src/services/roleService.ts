import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import AuthService from './authService'; // Import để xử lý refresh token

const SERVER_URL = 'http://127.0.0.1:8081/role'; // Thay đổi theo URL của API backend

// Tạo một instance của axios
const axiosInstance = axios.create({
    baseURL: SERVER_URL,
});

// Định nghĩa các giao diện cho phản hồi API
interface RoleResponse {
    code: number;
    result: Array<Role>;
}

interface AuthResult {
    success: boolean;
    accessToken?: string;
    message?: string;
}

interface RoleServiceResult {
    success: boolean;
    roles?: Array<Role>;
    message?: string;
}

interface Role {
    name: string;
    description: string;
}

// Tạo interceptor để tự động refresh token nếu token hết hạn
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response, // Nếu response thành công
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

class RoleService {
    static async getRoles(): Promise<RoleServiceResult> {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axiosInstance.get<RoleResponse>('/get', {
                headers: {Authorization: `Bearer ${token}`}
            });

            return {success: true, roles: response.data.result};
        } catch (error) {
            return {success: false, message: 'Failed to fetch roles. Please try again.'};
        }
    }
}

export default RoleService;
