import * as React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar.jsx"
import BottomNav from "./BottomNav.jsx"
import Footer from "./Footer.jsx"

export default function Layout() {
  return (
    <div className="avn-app-shell">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}
