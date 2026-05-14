import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react"
import { useNavigate } from "react-router-dom"

type CartProps = {
    cartItemsCount: number;
};

const index = ({ cartItemsCount }: CartProps) => {

    const navigate = useNavigate()

    return (
        <div className="hidden min-[375px]:flex items-center">
            <div className="relative">
                <Button
                    variant="outline"
                    className="w-10 h-10 rounded-full ring-0 ring-primary/20"
                    onClick={() => navigate("/dashboard/cart")}
                >
                    <ShoppingCart className="w-8 h-8 ring-0 ring-primary/20" />
                </Button>

                {cartItemsCount > 0 && (
                    <div className="absolute -bottom-1 -left-1 bg-sky-500 text-white text-[11px] font-bold leading-none min-w-5 h-5 px-1 rounded-full flex items-center justify-center">{cartItemsCount}
                    </div>
                )}
            </div>
        </div>
    )
}

export default index