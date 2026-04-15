import MediFindLogo from "../ui/MediFindLogo"
import ThemeToggle from "../ui/theme-toggle"
import SearchBar from "../searchbar"
import Filter from "../filter"
import Cart from "../cart"
import { SidebarTrigger, useSidebar } from "../ui/sidebar"


const index = () => {

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
                        <Cart />
                    </div>

                </div>
            </div>
        </header>
    )
}

export default index