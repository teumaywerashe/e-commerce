import { useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-neutral-50">
      {/* Mobile topbar */}
      <div className="fixed top-0 left-0 right-0 flex md:hidden items-center justify-between px-5 h-14 bg-primary text-white z-30">
        <button onClick={() => setOpen(true)} className="cursor-pointer">
          <RiMenu3Line className="h-5 w-5" />
        </button>
        <span className="text-[10px] font-semibold tracking-widest3 uppercase">Admin</span>
        <div className="w-5" />
      </div>

      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed md:static top-0 left-0 h-full w-60 bg-primary text-white z-50 shrink-0 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="flex items-center justify-between px-5 h-14 border-b border-white/10 md:hidden">
          <span className="text-[10px] font-semibold tracking-widest3 uppercase text-white">Rabbit</span>
          <button onClick={() => setOpen(false)} className="cursor-pointer text-neutral-400 hover:text-white">
            <IoMdClose className="h-4 w-4" />
          </button>
        </div>
        <AdminSidebar />
      </aside>

      {/* Content */}
      <main className="flex-1 min-w-0 pt-14 md:pt-0 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
