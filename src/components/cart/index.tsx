import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react"
import { useNavigate } from "react-router-dom"

const index = () => {
    const navigate = useNavigate()
    return (
        <div className="hidden min-[375px]:flex items-center">
            <Button variant="outline" className="w-10 h-10 rounded-full ring-0 ring-primary/20" onClick={() => navigate("/dashboard/cart")}>
                <ShoppingCart className="w-8 h-8 ring-0 ring-primary/20" />
            </Button>
        </div>
    )
}

export default index