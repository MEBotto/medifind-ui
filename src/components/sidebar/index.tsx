import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "../ui/sidebar"
import MediFindLogo from "../ui/MediFindLogo"

import { Collapsible, CollapsibleContent } from "../ui/collapsible"

import { Home, User, Heart, ShoppingBag, FileText, LogOut, ShoppingCart, Box } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

const index = () => {

    const navigate = useNavigate()

    const sidebarItems = [
        { icon: Home, label: "Inicio", href: "/dashboard" },
        { icon: User, label: "Cuenta", href: "/dashboard/account" },
        { icon: Heart, label: "Farmacias", href: "/dashboard/pharmacies" },
        { icon: ShoppingBag, label: "Mis Pedidos", href: "/dashboard/orders" },
        { icon: ShoppingCart, label: "Carrito", href: "/dashboard/cart" },
        { icon: Box, label: "Mis Productos", href: "/dashboard/my_products" },
        { icon: FileText, label: "Informe", href: "/dashboard/reports" },
    ]

    const handleLogout = () => {
        navigate("/login")
    }

    return (
        <Sidebar>

            <SidebarContent>

                <Collapsible defaultOpen className="group/collapsible">

                    <SidebarGroup className="p-0">

                        <CollapsibleContent>

                            <SidebarGroupContent>

                                <SidebarMenu>
                                    <MediFindLogo className="h-19 ml-8 p-0" />
                                    <hr></hr>
                                    {sidebarItems.map((item, index) => (

                                        <SidebarMenuItem key={index}>
                                            <SidebarMenuButton className="h-15 hover:bg-gray-200 hover:text-black" asChild>
                                                <Link to={item.href} className="flex items-center gap-2">
                                                    <item.icon className="w-7! h-7! mr-6 ml-5 text-[#2b9ad5]" />
                                                    <div className="text-lg">
                                                        {item.label}
                                                    </div>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>

                                    ))}

                                </SidebarMenu>

                            </SidebarGroupContent>

                        </CollapsibleContent>

                    </SidebarGroup>

                </Collapsible>

            </SidebarContent>
            <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center gap-2 h-15 text-lg hover:bg-accent/50 hover:text-black" onClick={handleLogout}>
                    <LogOut className="ml-5 mr-10 w-7! h-7! text-destructive" />
                    Cerrar Sesión
                </SidebarMenuButton>

            </SidebarMenuItem>
        </Sidebar>
    )
}

export default index