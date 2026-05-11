import { Search } from "lucide-react"
import { Input } from "../ui/input"

const index = () => {
    return (
        <div className="relative w-full ml-3">
            <Input
                placeholder="Buscar medicamentos, cosméticos y más..."
                className="flex pl-10 w-50 bg-primary-foreground border-border min-[760px]:w-80 min-[1024px]:w-140 text-lg!"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        </div>
    )
}

export default index