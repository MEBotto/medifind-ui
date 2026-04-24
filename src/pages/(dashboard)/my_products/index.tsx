import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const index = () => {

    const [products, setProducts] = useState([
        {
            id: "PROD-001",
            name: "Paracetamol 500mg",
            laboratory: "Sanofi",
            quantity: 10,
            price: 12.0,
            img: "../../src/images/EmpoleonPlaymatMayorRes.png"
        },
        {
            id: "PROD-002",
            name: "Ibuprofeno 400mg",
            laboratory: "Bayer",
            quantity: 5,
            price: 21.5,
            img: "../../src/images/EmpoleonPlaymatMayorRes.png"
        },
        {
            id: "PROD-003",
            name: "Amoxicilina 500mg",
            laboratory: "Abbott",
            quantity: 15,
            price: 35.0,
            img: "../../src/images/EmpoleonPlaymatMayorRes.png"
        },
        {
            id: "PROD-004",
            name: "Vitamina D3",
            laboratory: "Pfizer",
            quantity: 20,
            price: 21.62,
            img: "../../src/images/EmpoleonPlaymatMayorRes.png"
        },
    ])

    const [searchTerm, setSearchTerm] = useState("")

    const filteredProducts = products.filter((p) => {
        return (
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.laboratory.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })

    const handleChange = (id: string, value: number) => {
        if (isNaN(value) || value < 0) return

        setProducts((prev) =>
            prev.map((p) =>
                p.id === id
                    ? { ...p, quantity: value }
                    : p
            )
        )
    }

    const handleAdd = (id: string) => {
        setProducts((prev) =>
            prev.map((p) =>
                p.id === id
                    ? { ...p, quantity: p.quantity + 1 }
                    : p
            )
        )
    }

    const handleRemove = (id: string) => {
        setProducts((prev) =>
            prev.map((p) =>
                p.id === id
                    ? { ...p, quantity: Math.max(0, p.quantity - 1) }
                    : p
            )
        )
    }

    const handleUpdate = (id: string) => {
        console.log("Modificando: ", id)
    }

    const handleDelete = (id: string) => {
        console.log("Eliminando: ", id)
    }

    return (
        <div className="space-y-8">

            <div className="bg-primary/80 rounded-xl p-6 text-white">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-200 w-5 h-5" />
                    <Input
                        placeholder="Buscar productos..."
                        className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-sky-200 focus:bg-white/30 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 min-[760px]:grid-cols-2 lg:grid-cols-3 min-[1400px]:grid-cols-4! gap-6">
                {filteredProducts.map((product) => (

                    <Card
                        key={product.id}
                        className="bg-linear-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-lg transition-all duration-200"
                    >

                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <Package className="w-6 h-6 text-sky-700" />
                                    <CardTitle className="text-lg text-sky-800">
                                        {product.name}
                                    </CardTitle>
                                </div>
                                <p className="text-md text-sky-600 font-semibold">
                                    {product.id}
                                </p>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-3">

                            <div className="flex justify-between">
                                <div className="flex items-center justify-center space-x-3">
                                    <div className="w-20 h-20 md:w-30 md:h-30 lg:w-40 lg:h-40 bg-sky-200 rounded-lg">
                                        <img src={product.img} className="w-full h-full" />
                                    </div>

                                    <div className="flex flex-col justify-center space-y-1">
                                        <p className="text-md font-semibold text-sky-800">{product.name}</p>
                                        <p className="text-md text-sky-400">Laboratorio: {product.laboratory}</p>
                                        <p className="text-md text-sky-600">Cantidad: {product.quantity}</p>
                                        <p className="font-semibold text-md text-sky-500">Precio: ${product.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="transition-all duration-200 flex flex-col items-center gap-3 pt-3 min-[1700px]:flex-row min-[1700px]:justify-between">

                                <div className="flex items-center justify-center space-x-3">

                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleRemove(product.id)}
                                    >
                                        -
                                    </Button>

                                    <Input
                                        type="number"
                                        min={0}
                                        value={product.quantity}
                                        onChange={(e) =>
                                            handleChange(product.id, Number(e.target.value))
                                        }
                                        className="w-16 text-center"
                                    />

                                    <Button
                                        variant="default"
                                        size="icon"
                                        onClick={() => handleAdd(product.id)}
                                    >
                                        +
                                    </Button>

                                </div>
                                <div className="flex justify-center w-full sm:w-auto">
                                    <Button className="bg-destructive/85"
                                        onClick={() => handleDelete(product.id)}>
                                        Eliminar
                                    </Button>
                                    <Button className="ml-3 bg-chart-4/90"
                                        onClick={() => handleUpdate(product.id)}>
                                        Modificar
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                ))}
            </div>
        </div>
    )
}

export default index