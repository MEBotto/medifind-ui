import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Search, Package } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Link, useOutletContext } from "react-router-dom"

type OutletContextType = {
    handleAddToCart: () => void;
};



const DashboardIndex = () => {

    const { handleAddToCart } = useOutletContext<OutletContextType>();

    const [products] = useState([
        {
            id: "PROD-001",
            name: "Paracetamol",
            description: "Tableta de Paracetamol Sanofi 500mg x 8 comprimidos recubiertos",
            dosage: 500,
            magnitude: "mg",
            format: "Comprimidos",
            laboratory: "Sanofi",
            pharmacy: "Central",
            category: "Medicamento",
            quantity: 10,
            price: 4500,
            img: "../../src/images/EmpoleonPlaymatMayorRes.png"
        },
        {
            id: "PROD-002",
            name: "Ibuprofeno",
            description: "Tableta de Ibuprofeno Bayer 400mg x 10 comprimidos recubiertos",
            dosage: 400,
            magnitude: "mg",
            format: "Comprimidos",
            laboratory: "Bayer",
            pharmacy: "Fenix",
            category: "Medicamento",
            quantity: 5,
            price: 6000,
            img: "../../src/images/EmpoleonPlaymatMayorRes.png"
        },
        {
            id: "PROD-003",
            name: "Crema Hidratante",
            description: "Crema hidratante Natura x 250 ml",
            dosage: 250,
            magnitude: "ml",
            format: "Crema",
            laboratory: "Natura",
            pharmacy: "Savio",
            category: "Cosmético",
            quantity: 15,
            price: 36000.0,
            img: "../../src/images/EmpoleonPlaymatMayorRes.png"
        },
        {
            id: "PROD-004",
            name: "Vitamina D3",
            description: "Vitamina D3 Pfizer ampolla de vidrio bebible x 1000ml",
            dosage: 1000,
            magnitude: "ml",
            format: "Ampolla",
            laboratory: "Pfizer",
            pharmacy: "Santa Teresita",
            category: "Medicamento",
            quantity: 20,
            price: 16000,
            img: "../../src/images/EmpoleonPlaymatMayorRes.png"
        },
    ])
    const [searchTerm, setSearchTerm] = useState("")

    const filteredProducts = products.filter((p) => {
        return (
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.laboratory.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.format.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.pharmacy.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })


    return (
        <div className="space-y-8">
            <div className="bg-gradient-to-r from-sky-400 to-sky-500/80 rounded-xl p-8 text-white">
                <h1 className="text-3xl font-bold mb-2">Bienvenido a MediFind</h1>
                <p className="text-sky-100 text-lg">Encuentra medicamentos y farmacias cerca de ti</p>

                <div className="mt-6 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-200 w-5 h-5" />
                        <Input
                            placeholder="Buscar medicamentos, cosméticos y más..."
                            className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-sky-200 focus:bg-white/30"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 min-[760px]:grid-cols-2 lg:grid-cols-3 min-[1400px]:grid-cols-4! gap-6">
                {filteredProducts.map((product) => (
                    <Link
                        to={`/dashboard/pharmacies/${product.pharmacy}/products/${product.id}`}
                        key={product.id}
                        className="block">
                        <Card
                            key={product.id}
                            className="bg-linear-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-lg transition-all duration-200"
                        >

                            <CardHeader>
                                <div className="flex justify-center items-center">
                                    <div className="w-50 h-50 md:w-55 md:h-55 bg-sky-200 rounded-lg">
                                        <img src={product.img} className="w-full h-full" />
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-3">

                                <div className="flex justify-between">
                                    <div className="flex items-center justify-center space-x-3">

                                        <div className="flex flex-col justify-center space-y-1">
                                            <p className="text-2xl font-semibold text-sky-800">{product.name} {product.laboratory} {product.dosage}{product.magnitude} </p>
                                            <p className="text-md text-sky-600 mt-2">{product.description}</p>
                                            <p className="text-xl text-chart-4/80 mt-2">Farmacia {product.pharmacy}</p>
                                            <p className="font-semibold text-2xl text-green-600 mt-2">${product.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="transition-all duration-200 flex flex-col items-center gap-3 pt-3 min-[1700px]:flex-row min-[1700px]:justify-between">
                                    <Button className="bg-sky-400 hover:bg-sky-500 text-white w-full" onClick={(e) => {
                                        e.stopPropagation()
                                        e.preventDefault()
                                        handleAddToCart()
                                    }}>
                                        Agregar al carrito
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                ))}
            </div>
        </div>
    );
};

export default DashboardIndex;