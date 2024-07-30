import axios from "axios";

const axiosClient = axios.create({
    baseURL: `https://localhost:7164/api`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
});
axiosClient.interceptors.response.use(
    res => res,
    error => {
        if (error.response.status === 401) {
            const currentPath = window.location.pathname;

            // Kiểm tra nếu đang ở trang admin
            if (currentPath.startsWith('/admin')) {
                window.location.href = `http://localhost:3000/admin/login`;
            } else {
                // Chuyển hướng đến trang đăng nhập chính
                window.location.href = `http://localhost:3000/login`;
            }
        }

        console.error(`Error! Status Code: ` + error.response.status);
        return Promise.reject(error);
    }
);

export default axiosClient;