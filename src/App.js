import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import {
  Intro,
  Login, FindID, FindPW, Reset,
  Certification, Policy, SignUp,
  Test,
  Question,
  MyKiin,
  Neighbor,
  Main,
  Ranking, Product, Review,
  Search,
  View_0,
  MyPage,
  Notification,
  Event, View_1, MyReview, Friend, Interest, Point, Change, Refund,
  Notice, View_2, FAQ, View_3, Support, Account, TOS, ChangePW, NewPW,
  NotFound, DetailResult, ChangeNickname, Guide,
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

          <Route path="/test" element={<PrivateRoute><Outlet /></PrivateRoute>}>
            <Route path="" element={<PrivateRoute><Test /></PrivateRoute>} />
            <Route path="question" element={<PrivateRoute><Question /></PrivateRoute>} />
          </Route>

          <Route path="/mykiin" element={<PrivateRoute><Outlet /></PrivateRoute>}>
            <Route path="" element={<PrivateRoute><MyKiin /></PrivateRoute>} />
            <Route path="neighbor" element={<PrivateRoute><Neighbor /></PrivateRoute>} />
            <Route path="detailresult" element={<PrivateRoute><DetailResult /></PrivateRoute>} />
          </Route>

          <Route path="/main" element={<PrivateRoute><Outlet /></PrivateRoute>}>
            <Route path="" element={<PrivateRoute><Main /></PrivateRoute>}/>
            <Route path="ranking" element={<PrivateRoute><Ranking /></PrivateRoute>}/>
            <Route path="products" element={<PrivateRoute><Outlet /></PrivateRoute>}>
              <Route path="" element={<PrivateRoute><NotFound /></PrivateRoute>}/>
              <Route path=":id" element={<PrivateRoute><Outlet /></PrivateRoute>}>
                <Route path="" element={<PrivateRoute><Product /></PrivateRoute>} />
                <Route path="review" element={<PrivateRoute><Review /></PrivateRoute>} />
              </Route>
            </Route>
          </Route>

          <Route path="/search" element={<PrivateRoute><Outlet /></PrivateRoute>}>
            <Route path="" element={<PrivateRoute><Search /></PrivateRoute>} />
            <Route path="view" element={<PrivateRoute><View_0 /></PrivateRoute>} />
          </Route>

          <Route path="/mypage" element={<PrivateRoute><Outlet /></PrivateRoute>}>
            <Route path="" element={<PrivateRoute><MyPage /></PrivateRoute>}/>
            <Route path="event" element={<PrivateRoute><Outlet /></PrivateRoute>}>
              <Route path="" element={<PrivateRoute><Event /></PrivateRoute>} />
              <Route path="view" element={<PrivateRoute><View_1 /></PrivateRoute>} />
              <Route path="guide" element={<PrivateRoute><Guide /></PrivateRoute>} />
            </Route>
            <Route path="point" element={<PrivateRoute><Outlet /></PrivateRoute>}>
              <Route path="" element={<PrivateRoute><Point /></PrivateRoute>}/>
              <Route path="change" element={<PrivateRoute><Change /></PrivateRoute>}/>
              <Route path="refund" element={<PrivateRoute><Refund /></PrivateRoute>}/>
            </Route>
            <Route path="myreview" element={<PrivateRoute><MyReview /></PrivateRoute>}/>
            <Route path="friend" element={<PrivateRoute><Friend /></PrivateRoute>}/>
            <Route path="interest" element={<PrivateRoute><Interest /></PrivateRoute>}/>
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
              <Route path="changeNickname" element={<PrivateRoute><ChangeNickname /></PrivateRoute>} />
            </Route>
            <Route path="notification" element={<PrivateRoute><Notification /></PrivateRoute>}/>
          </Route>

          <Route path="*" element={<NotFound/>}/>
        </Routes>
    </div>
  )
}
