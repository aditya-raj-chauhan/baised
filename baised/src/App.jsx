import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import MyFiles from "./pages/MyFiles";
import Subscriptions from "./pages/Subscriptions";
import Transactions from "./pages/Transcations";
import Upload from "./pages/Upload";

import {
  SignedIn,
  SignedOut,
  RedirectToSignIn
} from "@clerk/clerk-react";

import { UserCreditsProvider } from "./context/UserCreditsContext";
import { Toaster } from "react-hot-toast";

function App() {

  return (

    <UserCreditsProvider>

      <BrowserRouter>

        <Toaster/>

        <Routes>

          <Route path="/" element={<Landing />} />

          <Route
            path="/dashboard"
            element={
              <>
                <SignedIn>
                  <Dashboard />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />

          <Route
            path="/my-files"
            element={
              <>
                <SignedIn>
                  <MyFiles />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />

          <Route
            path="/subscription"
            element={
              <>
                <SignedIn>
                  <Subscriptions />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />

          <Route
            path="/transactions"
            element={
              <>
                <SignedIn>
                  <Transactions />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />

          <Route
            path="/upload"
            element={
              <>
                <SignedIn>
                  <Upload />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />

          <Route path="/*" element={<RedirectToSignIn />} />

        </Routes>

      </BrowserRouter>

    </UserCreditsProvider>

  );

}

export default App;