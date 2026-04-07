import { Button } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
    BadgeDollarSignIcon,
    BadgePlusIcon,
    BadgeMinusIcon,
    FilterIcon,
} from "lucide-react"

const index = () => {
    return (
        <div className="flex items-center justify-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-9 w-9">
                        <FilterIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-35">
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <BadgeDollarSignIcon />
                            Más Vendidos
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <BadgeMinusIcon />
                            Menor Precio
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <BadgePlusIcon />
                            Mayor Precio
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default index