import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import Dashboard from './pages/Dashboard';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import AuthenticatedLayout from './layout/AuthenticatedLayout';
import JobOrders from './pages/JobOrders';
import Users from './pages/Users';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Taskurist - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | Taskurist - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
      </Route>


      <Route element={<AuthenticatedLayout />}>
        <Route
          index
          element={
            <>
              <PageTitle title="Dashboard | Taskurist - Tailwind CSS Admin Dashboard Template" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/job-orders"
          element={
            <>
              <PageTitle title="Job Order Form | Taskurist - Tailwind CSS Admin Dashboard Template" />
              <JobOrders />
            </>
          }
        />
        <Route
          path="/job-orders/:id"
          element={
            <>
              <PageTitle title="Job Order Form | Taskurist - Tailwind CSS Admin Dashboard Template" />
              <JobOrders />
            </>
          }
        />
        <Route
          path="/job-orders/:id/delete"
          element={
            <>
              <PageTitle title="Job Order Form | Taskurist - Tailwind CSS Admin Dashboard Template" />
              <JobOrders />
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <PageTitle title="Job Order Form | Taskurist - Tailwind CSS Admin Dashboard Template" />
              <Users />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | Taskurist - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | Taskurist - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | Taskurist - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | Taskurist - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | Taskurist - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | Taskurist - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | Taskurist - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | Taskurist - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | Taskurist - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
