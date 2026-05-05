import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Controller, useForm } from "react-hook-form"
import { useEffect } from "react"

interface ModifyProductForm {
    name: string
    description: string
    category: string
    laboratory: string
    dosage: number
    magnitude: string
    format: string
    pharmacy: string
    quantity: number
    price: number
}

interface AddProductForm {
    id: string
    name: string
    description: string
    category: string
    laboratory: string
    dosage: number
    magnitude: string
    format: string
    pharmacy: string
    quantity: number
    price: number
    img: string
}


const index = () => {

    const [products, setProducts] = useState([
        {
            id: "PROD-001",
            name: "Paracetamol",
            description: "Tableta de 6 comprimidos recubiertos",
            dosage: 500,
            magnitude: "mg",
            format: "Comprimidos",
            laboratory: "Sanofi",
            pharmacy: "Central",
            category: "Medicamento",
            quantity: 10,
            price: 12.0,
            img: "../../src/images/EmpoleonPlaymatMayorRes.png"
        },
        {
            id: "PROD-002",
            name: "Ibuprofeno",
            description: "Tableta de 10 comprimidos recubiertos",
            dosage: 400,
            magnitude: "mg",
            format: "Comprimidos",
            laboratory: "Bayer",
            pharmacy: "Fenix",
            category: "Medicamento",
            quantity: 5,
            price: 22,
            img: "../../src/images/EmpoleonPlaymatMayorRes.png"
        },
        {
            id: "PROD-003",
            name: "Crema Hidratante Natura",
            description: "Recipiente plástico",
            dosage: 250,
            magnitude: "ml",
            format: "Crema",
            laboratory: "Natura",
            pharmacy: "Savio",
            category: "Cosmético",
            quantity: 15,
            price: 35.0,
            img: "../../src/images/EmpoleonPlaymatMayorRes.png"
        },
        {
            id: "PROD-004",
            name: "Vitamina D3",
            description: "Ampolla de vidrio bebible",
            dosage: 1000,
            magnitude: "ml",
            format: "Ampolla",
            laboratory: "Pfizer",
            pharmacy: "Santa Teresita",
            category: "Medicamento",
            quantity: 20,
            price: 21.62,
            img: "../../src/images/EmpoleonPlaymatMayorRes.png"
        },
    ])

    const {
        register: registerModify,
        control: controlModify,
        handleSubmit: handleSubmitModify,
        formState: { errors: errorsModify },
        reset: resetModify,
    } = useForm<ModifyProductForm>()

    const {
        register: registerAdd,
        control: controlAdd,
        handleSubmit: handleSubmitAdd,
        formState: { errors: errorsAdd },
        reset: resetAdd,
    } = useForm<AddProductForm>()


    const [searchTerm, setSearchTerm] = useState("")

    const [openDeleteDialogId, setOpenDeleteDialogId] = useState<string | null>(null)

    const [openModifyDialogId, setOpenModifyDialogId] = useState<string | null>(null)

    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false)

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

    const handleDelete = (product: { name: string, id: string }) => {
        setProducts((prev) => prev.filter((p) => p.id !== product.id))
        setOpenDeleteDialogId(null)
        toast.success(
            <span className="text-lg font-semibold">
                El producto {product.name} fue eliminado exitosamente
            </span>)
    }

    const handleModify = (data: ModifyProductForm) => {
        setProducts((prev) =>
            prev.map((p) =>
                p.id === openModifyDialogId
                    ? {
                        ...p,
                        name: data.name,
                        description: data.description,
                        category: data.category,
                        laboratory: data.laboratory,
                        dosage: data.dosage,
                        magnitude: data.magnitude,
                        format: data.format,
                        pharmacy: data.pharmacy,
                        quantity: data.quantity,
                        price: data.price,
                    }
                    : p
            )
        )
        setOpenModifyDialogId(null)
        toast.success(
            <span className="text-lg font-semibold">
                El producto {data.name} fue modificado exitosamente
            </span>
        )
        resetModify()
    }

    useEffect(() => {
        if (!openModifyDialogId) return

        const product = products.find(p => p.id === openModifyDialogId)
        if (!product) return

        resetModify({
            name: product.name,
            description: product.description,
            category: product.category,
            laboratory: product.laboratory,
            dosage: product.dosage,
            magnitude: product.magnitude,
            format: product.format,
            pharmacy: product.pharmacy,
            quantity: product.quantity,
            price: product.price,
        })
    }, [openModifyDialogId])

    const handleAddProduct = (data: AddProductForm) => {
        setProducts([...products, data])
        setOpenAddDialog(false)
        resetAdd()
        toast.success(
            <span className="text-lg font-semibold">
                El producto {data.name} fue agregado exitosamente
            </span>
        )
    }

    return (
        <div className="space-y-8">

            <div className="bg-primary/80 rounded-xl p-6 flex flex-row  text-white">
                <div className="w-full relative mr-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-200 w-5 h-5" />
                    <Input
                        placeholder="Buscar productos..."
                        className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-sky-200 focus:bg-white/30 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Dialog
                    open={openAddDialog}
                    onOpenChange={(open) =>
                        setOpenAddDialog(open)
                    }>
                    <DialogTrigger asChild>
                        <Button className="w-auto bg-green-500">Agregar producto</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <form name="AddProductForm" onSubmit={handleSubmitAdd(handleAddProduct)}>
                            <DialogHeader>
                                <DialogTitle className="text-center text-chart-4/90 text-2xl">Agregar Producto</DialogTitle>
                                <DialogDescription className="text-center text-chart-4/80 text-md">
                                    Usted esta por agregar un producto al stock.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex gap-6 items-start max-h-[50vh] overflow-y-auto">
                                <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                    <Field data-invalid={!!errorsAdd.id} className="gap-1">
                                        <FieldLabel htmlFor="register-id">ID</FieldLabel>
                                        <Input
                                            id="register-id"
                                            {...registerAdd("id", { required: "El ID es requerido" })}
                                            aria-invalid={!!errorsAdd.id}
                                        />
                                        <FieldError errors={[errorsAdd.id]} />
                                    </Field>
                                    <Field data-invalid={!!errorsAdd.name} className="gap-1">
                                        <FieldLabel htmlFor="register-username">Nombre</FieldLabel>
                                        <Input
                                            id="register-username"
                                            {...registerAdd("name", { required: "El nombre es requerido" })}
                                            aria-invalid={!!errorsAdd.name}
                                        />
                                        <FieldError errors={[errorsAdd.name]} />
                                    </Field>
                                    <Field data-invalid={!!errorsAdd.description} className="gap-1">
                                        <FieldLabel htmlFor="register-description">Descripción</FieldLabel>
                                        <Input
                                            id="register-description"
                                            {...registerAdd("description", { required: "La descripción es requerida" })}
                                            aria-invalid={!!errorsAdd.description}

                                        />
                                        <FieldError errors={[errorsAdd.description]} />
                                    </Field>
                                    <Field data-invalid={!!errorsAdd.category} className="gap-1">
                                        <FieldLabel htmlFor="category">Categoria</FieldLabel>
                                        <Controller
                                            name="category"
                                            control={controlAdd}
                                            rules={{ required: "Selecciona la categoría" }}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="h-12">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Medicamento">Medicamento</SelectItem>
                                                        <SelectItem value="Suplemento">Suplemento</SelectItem>
                                                        <SelectItem value="Cosmetico">Cosmetico</SelectItem>
                                                        <SelectItem value="Ortopedico">Ortopedico</SelectItem>
                                                        <SelectItem value="Cuidado Personal">Cuidado Personal</SelectItem>
                                                        <SelectItem value="Bebida">Bebida</SelectItem>
                                                        <SelectItem value="Alimento">Alimento</SelectItem>
                                                        <SelectItem value="Otro">Otro</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        <FieldError errors={[errorsAdd.category]} />
                                    </Field>
                                    <Field data-invalid={!!errorsAdd.laboratory} className="gap-1">
                                        <FieldLabel htmlFor="laboratory">Laboratorio</FieldLabel>
                                        <Controller
                                            name="laboratory"
                                            control={controlAdd}
                                            rules={{ required: "Selecciona el laboratorio" }}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="h-12">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Sanofi">Sanofi</SelectItem>
                                                        <SelectItem value="Bayer">Bayer</SelectItem>
                                                        <SelectItem value="Novartis">Novartis</SelectItem>
                                                        <SelectItem value="Pfizer">Pfizer</SelectItem>
                                                        <SelectItem value="Roche">Roche</SelectItem>
                                                        <SelectItem value="Abbott">Abbott</SelectItem>
                                                        <SelectItem value="Elea">Elea</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        <FieldError errors={[errorsAdd.laboratory]} />
                                    </Field>
                                    <Field data-invalid={!!errorsAdd.dosage} className="gap-1">
                                        <FieldLabel htmlFor="register-dosage">Dosis</FieldLabel>
                                        <Input
                                            id="register-dosage"
                                            type="number"
                                            {...registerAdd("dosage", { required: "La dosis es requerida", valueAsNumber: true })}
                                            aria-invalid={!!errorsAdd.dosage}

                                        />
                                        <FieldError errors={[errorsAdd.dosage]} />
                                    </Field>
                                    <Field data-invalid={!!errorsAdd.magnitude} className="gap-1">
                                        <FieldLabel htmlFor="register-magnitude">Magnitud</FieldLabel>
                                        <Input
                                            id="register-magnitude"
                                            type="text"
                                            {...registerAdd("magnitude", { required: "La magnitud es requerida" })}
                                            aria-invalid={!!errorsAdd.magnitude}

                                        />
                                        <FieldError errors={[errorsAdd.magnitude]} />
                                    </Field>
                                    <Field data-invalid={!!errorsAdd.format} className="gap-1">
                                        <FieldLabel htmlFor="register-format">Formato</FieldLabel>
                                        <Controller
                                            name="format"
                                            control={controlAdd}
                                            rules={{ required: "Selecciona el formato" }}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="h-12">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Comprimidos">Comprimidos</SelectItem>
                                                        <SelectItem value="Gotas">Gotas</SelectItem>
                                                        <SelectItem value="Crema">Crema</SelectItem>
                                                        <SelectItem value="Jarabe">Jarabe</SelectItem>
                                                        <SelectItem value="Inyectable">Inyectable</SelectItem>
                                                        <SelectItem value="Supositorio">Supositorio</SelectItem>
                                                        <SelectItem value="Spray">Spray</SelectItem>
                                                        <SelectItem value="Parche">Parche</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        <FieldError errors={[errorsAdd.format]} />
                                    </Field>
                                    <Field data-invalid={!!errorsAdd.quantity} className="gap-1">
                                        <FieldLabel htmlFor="register-quantity">Cantidad</FieldLabel>
                                        <Input
                                            id="register-quantity"
                                            type="number"
                                            {...registerAdd("quantity", { required: "La cantidad es requerida", valueAsNumber: true })}
                                            aria-invalid={!!errorsAdd.quantity}

                                        />
                                        <FieldError errors={[errorsAdd.quantity]} />
                                    </Field>
                                    <Field data-invalid={!!errorsAdd.price} className="gap-1">
                                        <FieldLabel htmlFor="register-price">Precio</FieldLabel>
                                        <Input
                                            id="register-price"
                                            type="number"
                                            {...registerAdd("price", { required: "El precio es requerido", valueAsNumber: true })}
                                            aria-invalid={!!errorsAdd.price}
                                        />
                                        <FieldError errors={[errorsAdd.price]} />
                                    </Field>
                                    <Field data-invalid={!!errorsAdd.img} className="gap-1">
                                        <FieldLabel htmlFor="register-img">Imagen</FieldLabel>
                                        <Input
                                            id="register-img"
                                            type="file"
                                            accept="image/*"
                                            {...registerAdd("img", { required: "La imagen es requerida" })}
                                            aria-invalid={!!errorsAdd.img}
                                        />
                                        <FieldError errors={[errorsAdd.img]} />
                                    </Field>
                                </FieldGroup>
                            </div>
                            <div className="w-full flex justify-center mt-3">
                                <DialogFooter className="w-full">
                                    <Button type="submit" className="bg-green-500 min-[640px]:w-fit w-full">Agregar</Button>
                                    <DialogClose asChild>
                                        <Button variant="outline" className="min-[640px]:w-fit w-full">Cancelar</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
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
                                    <div className="w-25 h-25 md:w-30 md:h-30 lg:w-40 lg:h-40 bg-sky-200 rounded-lg">
                                        <img src={product.img} className="w-full h-full" />
                                    </div>

                                    <div className="flex flex-col justify-center space-y-1">
                                        <p className="text-md font-semibold text-sky-800">{product.name} {product.dosage}{product.magnitude}</p>
                                        <p className="text-md text-sky-600">Formato: {product.format}</p>
                                        <p className="text-md text-sky-400">Laboratorio: {product.laboratory}</p>
                                        <p className="text-md text-sky-400">Cantidad: {product.quantity}</p>
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
                                    <Dialog
                                        open={openDeleteDialogId === product.id}
                                        onOpenChange={(open) =>
                                            setOpenDeleteDialogId(open ? product.id : null)
                                        }>
                                        <DialogTrigger asChild>
                                            <Button
                                                className="bg-destructive/85"
                                                onClick={() => setOpenDeleteDialogId(product.id)}
                                            >
                                                Eliminar
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="text-center text-destructive text-2xl">¡Advertencia!</DialogTitle>
                                                <DialogDescription className="text-center text-red-500 text-md">
                                                    Usted esta por eliminar un producto del stock.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <p className="text-md font-semibold text-center">
                                                Esta seguro que desea eliminar el Producto:
                                            </p>
                                            <div className="flex gap-6 items-start max-h-[50vh] overflow-y-auto">
                                                <div className="flex flex-col space-y-2  text-md flex-1">
                                                    <p>ID: <span className="font-bold">{product.id}</span></p>
                                                    <p>Nombre: <span className="font-bold">{product.name}</span></p>
                                                    <p>Descripción: <span className="font-bold">{product.description}</span></p>
                                                    <p>Categoria: <span className="font-bold">{product.category}</span></p>
                                                    <p>Laboratorio: <span className="font-bold">{product.laboratory}</span></p>
                                                    <p>Dosaje: <span className="font-bold">{product.dosage}</span></p>
                                                    <p>Magnitud: <span className="font-bold">{product.magnitude}</span></p>
                                                    <p>Forma Farmacéutica: <span className="font-bold">{product.format}</span></p>
                                                    <p>Stock: <span className="font-bold">{product.quantity}</span></p>
                                                    <p>Precio: <span className="font-bold">${product.price.toFixed(2)}</span></p>

                                                </div>
                                                <div className="flex justify-center items-start">
                                                    <img
                                                        src={product.img}
                                                        className="w-32 h-32 object-cover rounded-lg"
                                                    />
                                                </div>

                                            </div>
                                            <DialogFooter>
                                                <Button className="bg-destructive/85"
                                                    onClick={() => handleDelete(product)}>
                                                    Eliminar
                                                </Button>
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancelar</Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog
                                        open={openModifyDialogId === product.id}
                                        onOpenChange={(open) =>
                                            setOpenModifyDialogId(open ? product.id : null)
                                        }>
                                        <DialogTrigger asChild>
                                            <Button className="ml-3 bg-chart-4/90">
                                                Modificar
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <form name="ModifyProductForm" onSubmit={handleSubmitModify(handleModify)} >
                                                <DialogHeader>
                                                    <DialogTitle className="text-center text-chart-4/90 text-2xl">Modificar Producto</DialogTitle>
                                                    <DialogDescription className="text-center text-chart-4/80 text-md">
                                                        Usted esta por modificar un producto del stock.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="flex gap-6 items-start max-h-[50vh] overflow-y-auto">
                                                    <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                                        <Field data-invalid={!!errorsModify.name} className="gap-1">
                                                            <FieldLabel htmlFor="register-username">Nombre</FieldLabel>
                                                            <Input
                                                                id="register-username"
                                                                {...registerModify("name", { required: "El nombre es requerido" })}
                                                                aria-invalid={!!errorsModify.name}
                                                            />
                                                            <FieldError errors={[errorsModify.name]} />
                                                        </Field>
                                                        <Field data-invalid={!!errorsModify.description} className="gap-1">
                                                            <FieldLabel htmlFor="register-description">Descripción</FieldLabel>
                                                            <Input
                                                                id="register-description"
                                                                {...registerModify("description", { required: "La descripción es requerida" })}
                                                                aria-invalid={!!errorsModify.description}

                                                            />
                                                            <FieldError errors={[errorsModify.description]} />
                                                        </Field>
                                                        <Field data-invalid={!!errorsModify.category} className="gap-1">
                                                            <FieldLabel htmlFor="category">Categoria</FieldLabel>
                                                            <Controller
                                                                name="category"
                                                                control={controlModify}
                                                                rules={{ required: "Selecciona la categoría" }}
                                                                render={({ field }) => (
                                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                                        <SelectTrigger className="h-12">
                                                                            <SelectValue />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="Medicamento">Medicamento</SelectItem>
                                                                            <SelectItem value="Suplemento">Suplemento</SelectItem>
                                                                            <SelectItem value="Cosmetico">Cosmetico</SelectItem>
                                                                            <SelectItem value="Ortopedico">Ortopedico</SelectItem>
                                                                            <SelectItem value="Cuidado Personal">Cuidado Personal</SelectItem>
                                                                            <SelectItem value="Bebida">Bebida</SelectItem>
                                                                            <SelectItem value="Alimento">Alimento</SelectItem>
                                                                            <SelectItem value="Otro">Otro</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                )}
                                                            />
                                                            <FieldError errors={[errorsModify.category]} />
                                                        </Field>
                                                        <Field data-invalid={!!errorsModify.laboratory} className="gap-1">
                                                            <FieldLabel htmlFor="laboratory">Laboratorio</FieldLabel>
                                                            <Controller
                                                                name="laboratory"
                                                                control={controlModify}
                                                                rules={{ required: "Selecciona el laboratorio" }}
                                                                render={({ field }) => (
                                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                                        <SelectTrigger className="h-12">
                                                                            <SelectValue />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="Sanofi">Sanofi</SelectItem>
                                                                            <SelectItem value="Bayer">Bayer</SelectItem>
                                                                            <SelectItem value="Novartis">Novartis</SelectItem>
                                                                            <SelectItem value="Pfizer">Pfizer</SelectItem>
                                                                            <SelectItem value="Roche">Roche</SelectItem>
                                                                            <SelectItem value="Abbott">Abbott</SelectItem>
                                                                            <SelectItem value="Elea">Elea</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                )}
                                                            />
                                                            <FieldError errors={[errorsModify.laboratory]} />
                                                        </Field>
                                                        <Field data-invalid={!!errorsModify.dosage} className="gap-1">
                                                            <FieldLabel htmlFor="register-dosage">Dosis</FieldLabel>
                                                            <Input
                                                                id="register-dosage"
                                                                type="number"
                                                                {...registerModify("dosage", { required: "La dosis es requerida", valueAsNumber: true })}
                                                                aria-invalid={!!errorsModify.dosage}

                                                            />
                                                            <FieldError errors={[errorsModify.dosage]} />
                                                        </Field>
                                                        <Field data-invalid={!!errorsModify.magnitude} className="gap-1">
                                                            <FieldLabel htmlFor="register-magnitude">Magnitud</FieldLabel>
                                                            <Input
                                                                id="register-magnitude"
                                                                type="text"
                                                                {...registerModify("magnitude", { required: "La magnitud es requerida" })}
                                                                aria-invalid={!!errorsModify.magnitude}

                                                            />
                                                            <FieldError errors={[errorsModify.magnitude]} />
                                                        </Field>
                                                        <Field data-invalid={!!errorsModify.format} className="gap-1">
                                                            <FieldLabel htmlFor="register-format">Formato</FieldLabel>
                                                            <Controller
                                                                name="format"
                                                                control={controlModify}
                                                                rules={{ required: "Selecciona el formato" }}
                                                                render={({ field }) => (
                                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                                        <SelectTrigger className="h-12">
                                                                            <SelectValue />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="Comprimidos">Comprimidos</SelectItem>
                                                                            <SelectItem value="Gotas">Gotas</SelectItem>
                                                                            <SelectItem value="Crema">Crema</SelectItem>
                                                                            <SelectItem value="Jarabe">Jarabe</SelectItem>
                                                                            <SelectItem value="Inyectable">Inyectable</SelectItem>
                                                                            <SelectItem value="Supositorio">Supositorio</SelectItem>
                                                                            <SelectItem value="Spray">Spray</SelectItem>
                                                                            <SelectItem value="Parche">Parche</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                )}
                                                            />
                                                            <FieldError errors={[errorsModify.format]} />
                                                        </Field>
                                                        <Field data-invalid={!!errorsModify.quantity} className="gap-1">
                                                            <FieldLabel htmlFor="register-quantity">Cantidad</FieldLabel>
                                                            <Input
                                                                id="register-quantity"
                                                                type="number"
                                                                {...registerModify("quantity", { required: "La cantidad es requerida", valueAsNumber: true })}
                                                                aria-invalid={!!errorsModify.quantity}

                                                            />
                                                            <FieldError errors={[errorsModify.quantity]} />
                                                        </Field>
                                                        <Field data-invalid={!!errorsModify.price} className="gap-1">
                                                            <FieldLabel htmlFor="register-price">Precio</FieldLabel>
                                                            <Input id="register-price" type="number" {...registerModify("price", { required: "El precio es requerido", valueAsNumber: true })} aria-invalid={!!errorsModify.price} />
                                                            <FieldError errors={[errorsModify.price]} />
                                                        </Field>
                                                    </FieldGroup>
                                                    <div className="flex justify-center items-center">
                                                        <img
                                                            src={product.img}
                                                            className="w-32 h-32 object-cover rounded-lg"
                                                        />

                                                    </div>
                                                </div>
                                                <div className="w-full flex justify-center mt-3">
                                                    <DialogFooter className="w-full">
                                                        <Button type="submit" className="bg-chart-4/90 min-[640px]:w-fit w-full">Modificar</Button>
                                                        <DialogClose asChild>
                                                            <Button variant="outline" className="min-[640px]:w-fit w-full" onClick={() => {
                                                                resetModify()
                                                                setOpenModifyDialogId(null)
                                                            }}>Cancelar</Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </div>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
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