import { Route, Routes } from 'react-router-dom';
import App from './App';
import HomePage from './Component/Home/HomePage';
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';
import NotFound from './Component/Home/NotFound';
import Admin from './Component/Admin/Admin';
import Dashboard from './Component/Admin/Content/DashBoard';
import Contact from './Component/Header/Contact';
import Footer from './Component/Home/Footer';
import CompetitionList from './Component/Admin/Content/Competition/CompetitionList';
import CompetitionAdd from './Component/Admin/Content/Competition/CompetitionAdd';
import CompetitionEdit from './Component/Admin/Content/Competition/CompetitionEdit';
import SubmissionList from './Component/Admin/Content/Submission/SubmissionList';
import SubmissionDetail from './Component/Admin/Content/Submission/SubmissionDetail';
import ExhibitionAdd from './Component/Admin/Content/Exihibition/ExhibitionAdd';
import ExhibitionList from './Component/Admin/Content/Exihibition/ExhibitionList';
import ExhibitionEdit from './Component/Admin/Content/Exihibition/ExihibitionEdit';
import AwardList from './Component/Admin/Content/Award/AwardList';
import PaintingList from './Component/Admin/Content/Painting/PaintingList';
import PaintingEdit from './Component/Admin/Content/Painting/PaintingEdit';
import PaintingAdd from './Component/Admin/Content/Painting/PaintingAdd';
import Competition from './Component/Header/Competition';
import Exhibition from './Component/Header/Exhibition';

import AdminList from './Component/Admin/Content/User/AdminList';
import AdminAdd from './Component/Admin/Content/User/AdminAdd';
import TeacherList from './Component/Admin/Content/User/TeacherList';
import TeacherAdd from './Component/Admin/Content/User/TeacherAdd';
import StudentList from './Component/Admin/Content/User/StudentList';
import StudentAdd from './Component/Admin/Content/User/StudentAdd';
import UserInDetail from './Component/Admin/Content/User/UserInDetail';
import Profile from './Component/Admin/Content/Profile';
import LoginAdmin from './Component/Admin/Content/LoginAdmin';

import News from './Component/Header/News';
import PayMent from './Component/User/PayMent';
import DetailEx from './Component/Header/DetailEx';
import DetailCt from './Component/User/DetailCt';
import ProfileUser from './Component/User/ProfilleUser';
import DetailLt from './Component/User/DetailTl';
import DetailBt from './Component/User/DetailBt';
import Account from './Component/User/Account';


const Layout = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route index element={<Footer />} />

                    <Route path='/contact' element={<Contact />} />
                    <Route path='cuoc-thi' element={<Competition />} />
                    <Route path='cuoc-thi/:id' element={<DetailCt />} />
                    <Route path='bai-thi/:id' element={<DetailBt />} />

                    <Route path='trien-lam' element={<Exhibition />} />
                    <Route path='tin-tuc' element={<News />} />
                    <Route path='payment' element={<PayMent />} />
                    <Route path='detailex' element={<DetailEx />} />
                    <Route path='trien-lam/:id' element={<DetailLt />} />
                    <Route path='profile' element={<ProfileUser />} />
                    <Route path='/:userName' element={<Account />} />


                </Route>

                <Route path='/admin' element={<Admin />} >
                    <Route index element={<Dashboard title="Trang Chủ" />} />

                    <Route path='competition/list' element={<CompetitionList />} />
                    <Route path='competition/add' element={<CompetitionAdd />} />
                    <Route path='competition/edit/:id' element={<CompetitionEdit />} />
                    <Route path='competition/award' element={<AwardList />} />

                    <Route path='submission/list' element={<SubmissionList />} />
                    <Route path='submission/edit/:id' element={<SubmissionDetail />} />

                    <Route path='exhibition/add' element={<ExhibitionAdd />} />
                    <Route path='exhibition/list' element={<ExhibitionList />} />
                    <Route path='exhibition/edit/:id' element={<ExhibitionEdit />} />

                    <Route path='exhibition/painting' element={<PaintingList />} />
                    <Route path='exhibition/painting/edit/:id' element={<PaintingEdit />} />
                    <Route path='exhibition/painting-add' element={<PaintingAdd />} />

                    <Route path='admin/list' element={<AdminList />} />
                    <Route path='admin/add' element={<AdminAdd />} />
                    <Route path='teacher/list' element={<TeacherList />} />
                    <Route path='teacher/add' element={<TeacherAdd />} />
                    <Route path='student/list' element={<StudentList />} />
                    <Route path='student/add' element={<StudentAdd />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='user/:userName' element={<UserInDetail />} /> {/*Chi tiết tài khoản bất kì*/}


                </Route>
                <Route path='admin/login' element={<LoginAdmin />} />

                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    );
}

export default Layout;