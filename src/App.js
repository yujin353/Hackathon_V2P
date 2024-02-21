import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import {
  Intro,
  Login,
  Policy, SignUp,
  Main,
  MyPage,
  Support, Account, TOS,
} from './pages'
import { PublicRoute, PrivateRoute, PolicyChecked } from "./router"

export default function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<PublicRoute><Intro /></PublicRoute>}/>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}/>
          <Route path="/policy" element={<PublicRoute><Policy /></PublicRoute>}/>
          <Route path="/signup" element={<PublicRoute><PolicyChecked><SignUp /></PolicyChecked></PublicRoute>}/>
          <Route path="termofservice" element={<PublicRoute><TOS /></PublicRoute>} />

          <Route path="/main" element={<PrivateRoute><Outlet /></PrivateRoute>}>
            <Route path="" element={<PrivateRoute><Main /></PrivateRoute>}/>
          </Route>

          <Route path="/mypage" element={<PrivateRoute><Outlet /></PrivateRoute>}>
            <Route path="" element={<PrivateRoute><MyPage /></PrivateRoute>}/>
            <Route path="support" element={<PrivateRoute><Support /></PrivateRoute>}/>
            <Route path="termofservice" element={<PrivateRoute><TOS /></PrivateRoute>} />
            <Route path="account" element={<PrivateRoute><Outlet /></PrivateRoute>}>
              <Route path="" element={<PrivateRoute><Account /></PrivateRoute>} />
              </Route>
          </Route>
        </Routes>
    </div>
  )
}
