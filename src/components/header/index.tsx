import MediFindLogo from "../ui/MediFindLogo"
import ThemeToggle from "../ui/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import SearchBar from "../searchbar"
import Filter from "../filter"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import { SidebarTrigger, useSidebar } from "../ui/sidebar"


const index = () => {
    const navigate = useNavigate()

    const { open } = useSidebar()

    return (
        <header className="flex items-center bg-card/80 backdrop-blur-sm border-b border-border h-20">
            <div className="flex items-center justify-between w-full px-4">
                <div className="flex items-center space-x-3">
                    {!open && (
                        <MediFindLogo className="h-12 ml-4 hidden min-[630px]:block" />
                    )}
                    <SidebarTrigger className="text-[#2b9ad5] [&_svg]:w-7! [&_svg]:h-7! hover:bg-gray-200" />
                </div>
                <div className="flex items-center space-x-4">

                    <SearchBar />

                    <div className="flex items-center space-x-3">
                        <Filter />
                        <ThemeToggle />

                        <div className="hidden min-[375px]:flex items-center">
                            <Button variant="outline" className="w-8 h-8 rounded-full ring-0 ring-primary/20" onClick={() => navigate("/dashboard/account")}>
                                <Avatar className="w-8 h-8 ring-2 ring-primary/20">
                                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        U
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </div>

                    </div>

                </div>
            </div>
        </header>
    )
}

export default index