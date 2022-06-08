import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Authorization from '../Authorization/Authorization';
import Profile from '../Profile/Profile';
import Registration from '../Registration/Registration';
import style from './AppRouter.module.css';

const AppRouter: FC = () => {
  return (
    <div className={style.flex}>
      <Routes>
        <Route path='/' element={<Authorization />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signUp' element={<Registration />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
