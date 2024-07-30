import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = (pageTitle) => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `Admin - ${pageTitle}`;
        const jwtToken = localStorage.getItem('jwt');
        const role = localStorage.getItem('role');

        if (!jwtToken) {
            navigate('/admin/login');
        } else if (role === 'Student') {
            navigate('/admin/login');
        }
        // Nếu là Admin hoặc Teacher, không chuyển trang
    }, [pageTitle, navigate]);

    return null;
};

export default useAuth;
