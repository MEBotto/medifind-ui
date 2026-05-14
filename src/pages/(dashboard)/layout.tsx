import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";


const Layout = () => {
    const isAuth = true;

    const [cartItemsCount, setCartItemsCount] = useState(0);

    const handleAddToCart = () => {
        setCartItemsCount((prev) => prev + 1);
    };

    if (!isAuth) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="flex min-h-screen">
            <SidebarProvider>
                <Sidebar />

                <div className="flex flex-col min-h-[99vh] flex-1">
                    <Header cartItemsCount={cartItemsCount} />

                    <section className="p-4">
                        <Outlet
                            context={{
                                handleAddToCart,
                            }}
                        />
                    </section>
                </div>
            </SidebarProvider>
        </div>
    );
};

export default Layout;