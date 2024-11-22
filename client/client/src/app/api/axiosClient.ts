import axios from 'axios';

// Tạo instance axios
const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8080', // Thay bằng URL máy chủ của bạn
    timeout: 5000, // Thời gian chờ (ms)
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Thêm interceptor để thêm token vào mỗi request (nếu cần)
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken'); // Hoặc lấy từ Redux, Context
        (token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Thêm interceptor để xử lý lỗi response
axiosClient.interceptors.response.use(
    (response) => {
        return response; // Trả về dữ liệu từ response
    },
    (error) => {
        // Xử lý lỗi
        return error.response
    }
);

export default axiosClient;
