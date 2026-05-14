import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const index = () => {


    const [products, setProducts] = useState([
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
            quantity: 1,
            price: 4500,
            discount: 0.15,
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
            quantity: 1,
            price: 6000,
            discount: 0.10,
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
            quantity: 1,
            price: 36000.0,
            discount: 0.20,
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
            quantity: 1,
            price: 16000,
            discount: 0.05,
            img: "../../src/images/EmpoleonPlaymatMayorRes.png"
        },
    ])

    const cartItemsCount = products.reduce(
        (acc, product) => acc + product.quantity,
        0
    );

    const totalPrice = products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
    );

    const totalDiscount = products.reduce(
        (acc, product) => acc + (product.price * product.discount) * product.quantity,
        0
    )

    const finalPrice = totalPrice - totalDiscount

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

    const handleRemove = (id: string) => {
        setProducts((prev) =>
            prev.map((p) =>
                p.id === id
                    ? { ...p, quantity: Math.max(0, p.quantity - 1) }
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


    return (
        <div className="flex gap-6 items-start">

            {/* LEFT SIDE - PRODUCTS */}
            <div className="flex-1 grid grid-cols-1 gap-6">
                {products.map((product) => (
                    <Card
                        key={product.id}
                        className="bg-linear-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-lg transition-all duration-200"
                    >

                        <CardHeader className="border-b border-sky-200 mb-0">
                            <div className="flex flex-start items-center">
                                <Link
                                    to={`/dashboard/pharmacies/${product.pharmacy}`}
                                    key={product.id}>
                                    <p className="text-2xl text-sky-500 mt-2 font-semibold">Productos de Farmacia {product.pharmacy} {'>'}</p>
                                </Link>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-3">

                            <div className="flex justify-between items-center gap-6">

                                {/* LEFT SIDE */}
                                <div className="flex items-center gap-4 flex-1">

                                    {/* IMAGE */}
                                    <Link
                                        to={`/dashboard/pharmacies/${product.pharmacy}/products/${product.id}`}
                                    >
                                        <div className="w-40 h-40 bg-sky-200 rounded-lg shrink-0">
                                            <img
                                                src={product.img}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </Link>

                                    {/* MIDDLE CONTENT */}
                                    <div className="flex flex-col justify-between h-full space-y-4 flex-1">

                                        <div>
                                            <p className="text-xl font-semibold text-sky-700">
                                                {product.name} {product.dosage}{product.magnitude}
                                            </p>

                                            <p className="text-md text-sky-600 mt-2">
                                                {product.description}
                                            </p>
                                        </div>

                                        {/* BUTTONS */}
                                        <div className="flex items-center space-x-3 pt-2">
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
                                    </div>
                                </div>

                                {/* RIGHT SIDE - PRICES */}
                                <div className="flex flex-col items-end justify-center min-w-[140px]">

                                    {/* ORIGINAL PRICE */}
                                    <p className="text-lg text-muted-foreground line-through">
                                        $
                                        {(product.price * product.quantity)}
                                    </p>

                                    {/* DISCOUNTED PRICE */}
                                    <p className="text-2xl font-semibold text-green-600">
                                        $
                                        {(
                                            (product.price -
                                                product.price * product.discount) *
                                            product.quantity
                                        )}
                                    </p>

                                    {/* DISCOUNT PERCENT */}
                                    <p className="text-sm text-sky-500 font-semibold mt-1">
                                        {product.discount * 100} % Descuento
                                    </p>
                                </div>

                            </div>

                        </CardContent>
                    </Card>
                ))
                }
            </div >
            {/* RIGHT SIDE - SUMMARY */}
            < div className="w-[350px] sticky top-4" >
                <Card className="bg-linear-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-lg transition-all duration-200">
                    <CardHeader className="border-b border-sky-200 py-3 px-4">
                        <div className="flex justify-left items-center text-2xl font-semibold">Resumen de Compra</div>
                    </CardHeader>
                    <CardContent className="space-y-3">

                        <div className="flex flex-col gap-4 w-full">

                            <div className="flex justify-between items-center w-full">
                                <p className="text-lg font-medium">
                                    Productos ({cartItemsCount})
                                </p>

                                <p className="text-lg text-green-600 font-semibold">
                                    ${totalPrice}
                                </p>
                            </div>

                            <div className="flex justify-between items-center w-full">
                                <p className="text-lg font-medium">
                                    Descuento
                                </p>

                                <p className="text-lg text-sky-500 font-semibold">
                                    -${totalDiscount}
                                </p>
                            </div>

                            <div className="border-t pt-4 flex justify-between items-center w-full">
                                <p className="text-xl font-semibold">
                                    Total
                                </p>

                                <p className="text-2xl text-green-600 font-semibold">
                                    ${finalPrice}
                                </p>
                            </div>

                        </div>

                        <div className="transition-all duration-200 flex flex-col items-center gap-3 pt-3 min-[1700px]:flex-row min-[1700px]:justify-between">
                            <Button className="bg-sky-400 hover:bg-sky-500 text-white w-full" onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                //handleAddToCart()
                            }}>
                                Encargar
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div >
        </div >
    )
}

export default index