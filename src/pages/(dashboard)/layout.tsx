import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";

const Layout = () => {
    const isAuth = true; // tu verificación real

    if (!isAuth) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="flex min-h-screen">
            <SidebarProvider>
                <Sidebar />
                <div className="flex flex-col min-h-[99vh] flex-1">
                    <Header />
                    <section className="p-4">
                        <Outlet />
                    </section>
                </div>
            </SidebarProvider>
        </div>
    );
};

export default Layout;
