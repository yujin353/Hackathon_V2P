import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import {
  Intro,
  Login, FindID, FindPW, Reset,
  Certification, Policy, SignUp,
  MyHistory,
  Main,
  MyPage,
  Notice, View_2, FAQ, View_3, Support, Account, TOS, ChangePW, NewPW,
  NotFound, 
} from './pages'
import { PublicRoute, PrivateRoute, Certificated, PolicyChecked } from "./router"

import RouteChangeTracker from './RouteChangeTracker';

export default function App() {
  RouteChangeTracker();
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<PublicRoute><Intro /></PublicRoute>}/>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}/>
          <Route path="/certification" element={<PublicRoute><Certification /></PublicRoute>}/>
          <Route path="/policy" element={<PublicRoute><Certificated><Policy /></Certificated></PublicRoute>}/>
          <Route path="/signup" element={<PublicRoute><Certificated><PolicyChecked><SignUp /></PolicyChecked></Certificated></PublicRoute>}/>
          <Route path="/findid" element={<PublicRoute><FindID /></PublicRoute>}/>
          <Route path="/findpw" element={<PublicRoute><Outlet /></PublicRoute>}>
            <Route path="" element={<PublicRoute><FindPW /></PublicRoute>}/>
            <Route path="reset" element={<PublicRoute><Reset /></PublicRoute>}/>
          </Route>
          <Route path="termofservice" element={<PublicRoute><TOS /></PublicRoute>} />

          <Route path="/MyHistory" element={<PrivateRoute><Outlet /></PrivateRoute>}>
            <Route path="" element={<PrivateRoute><MyHistory /></PrivateRoute>} />
          </Route>

          <Route path="/main" element={<PrivateRoute><Outlet /></PrivateRoute>}>
            <Route path="" element={<PrivateRoute><Main /></PrivateRoute>}/>
          </Route>

          <Route path="/mypage" element={<PrivateRoute><Outlet /></PrivateRoute>}>
            <Route path="" element={<PrivateRoute><MyPage /></PrivateRoute>}/>
            <Route path="notice" element={<PrivateRoute><Outlet /></PrivateRoute>}>
              <Route path="" element={<PrivateRoute><Notice /></PrivateRoute>} />
              <Route path="view" element={<PrivateRoute><View_2 /></PrivateRoute>} />
            </Route>
            <Route path="faq" element={<PrivateRoute><Outlet /></PrivateRoute>}>
              <Route path="" element={<PrivateRoute><FAQ /></PrivateRoute>} />
              <Route path="view" element={<PrivateRoute><View_3 /></PrivateRoute>} />
            </Route>
            <Route path="support" element={<PrivateRoute><Support /></PrivateRoute>}/>
            <Route path="termofservice" element={<PrivateRoute><TOS /></PrivateRoute>} />
            <Route path="account" element={<PrivateRoute><Outlet /></PrivateRoute>}>
              <Route path="" element={<PrivateRoute><Account /></PrivateRoute>} />
              <Route path="changepw" element={<PrivateRoute><ChangePW /></PrivateRoute>} />
              <Route path="newpw" element={<PrivateRoute><Certificated><NewPW /></Certificated></PrivateRoute>} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound/>}/>
        </Routes>
    </div>
  )
}
