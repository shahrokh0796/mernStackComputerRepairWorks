import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from './components/Public';
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcom from "./features/auth/Welcom";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import AddUserForm from './features/users/AddUserForm';
import EditNote from "./features/notes/EditNote";
import AddNote from "./features/notes/AddNote";
import PreFetch from "./features/auth/PreFetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";


function App() {
useTitle("MisterFaster Repair's");
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* Public routes */}
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route element={<PreFetch />}>
                <Route path="dash" element={<DashLayout />} >
                  <Route index element={<Welcom />} />

                  <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                    <Route path="users">
                      <Route index element={<UsersList />} />
                      <Route path=":id" element={<EditUser />} />
                      <Route path="new" element={<AddUserForm />} />
                    </Route>
                  </Route>

                  <Route path="notes">
                    <Route index element={<NotesList />} />
                    <Route path=":id" element={<EditNote />} />
                    <Route path="new" element={<AddNote />} />
                  </Route>

                </Route>{"End dash"}
              </Route>
            </Route>
          </Route>{/* end protected route*/}
        </Route>
      </Routes>
    </>
  )
}

export default App
