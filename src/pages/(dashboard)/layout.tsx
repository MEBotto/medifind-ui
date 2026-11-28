import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAppSelector } from "@/app/hooks";
import { Suspense, useState } from "react";


const Layout = () => {
    const isAuth = useAppSelector(state => !!state.auth.session);

    const [cartItemsCount, setCartItemsCount] = useState(0);

    const handleAddToCart = () => {
        setCartItemsCount((prev) => prev + 1);
    };

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex min-h-screen">
            <SidebarProvider>
                <Sidebar />

                <div className="flex flex-col min-h-[99vh] flex-1">
                    <Header cartItemsCount={cartItemsCount} />

                    <section className="p-4">
                        <Suspense fallback={null}>
                        <Outlet
                            context={{
                                handleAddToCart,
                            }}
                        />
                        </Suspense>
                    </section>
                </div>
            </SidebarProvider>
        </div>
    );
};

export default Layout;