import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGithub, FaInfo, FaSignOutAlt, FaMedal, FaPalette, FaUsers } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import imagesidebar from '../../Images/Competition/1.jpg'
const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Xóa các thông tin đăng nhập khỏi localStorage
        localStorage.removeItem("jwt");
        localStorage.removeItem("userName");
        localStorage.removeItem("id");
        // Chuyển hướng đến trang login
        navigate('/admin/login');
        // Refresh trang
        window.location.reload();
    };
    return (
        <>
            <ProSidebar
                image={imagesidebar}
                collapsed={!collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <Link to='/' className='navbar-brand'>BTH ART</Link>

                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTachometerAlt />}
                        >
                            Quản lý chung
                            <Link to="/admin" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaMedal />}
                            title="Quản lý Cuộc thi"
                        >
                            <MenuItem> Tạo cuộc thi
                                <Link to="/admin/competition/add" />
                            </MenuItem>
                            <MenuItem> Danh sách cuộc thi
                                <Link to="/admin/competition/list" />
                            </MenuItem>
                            <MenuItem> Danh sách bài thi
                                <Link to="/admin/submission/list" />
                            </MenuItem>
                            <MenuItem> Danh sách giải thưởng
                                <Link to="/admin/competition/award" />
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaPalette />}
                            title="Quản lý triễn lãm"
                        >
                            <MenuItem> Tạo triễn lãm
                                <Link to="/admin/exhibition/add" />
                            </MenuItem>
                            <MenuItem> Gửi tranh vào triễn lãm
                                <Link to="/admin/exhibition/painting-add" />
                            </MenuItem>
                            <MenuItem> Danh sách triễn lãm
                                <Link to="/admin/exhibition/list" />
                            </MenuItem>
                            <MenuItem> Tranh trong triễn lãm
                                <Link to="/admin/exhibition/painting" />
                            </MenuItem>

                        </SubMenu>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaUsers />}
                            title="Quản lý người dùng"
                        >
                            {/* <MenuItem> Danh sách admin
                                <Link to="/admin/admin/list" />
                            </MenuItem> */}
                            <MenuItem> Danh sách giáo viên
                                <Link to="/admin/teacher/list" />
                            </MenuItem>
                            <MenuItem> Danh sách sinh viên
                                <Link to="/admin/student/list" />
                            </MenuItem>
                            {/* <MenuItem> Thêm amin
                                <Link to="/admin/admin/add" />
                            </MenuItem> */}
                            <MenuItem> Thêm giáo viên
                                <Link to="/admin/teacher/add" />
                            </MenuItem>
                            <MenuItem> Thêm sinh viên
                                <Link to="/admin/student/add" />
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaInfo />}
                        >
                            Tài khoản
                            <Link to="/admin/profile" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaSignOutAlt />}
                            onClick={handleLogout}
                        >
                            Đăng xuất
                        </MenuItem>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="/"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>

                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>


    )
}

export default SideBar;