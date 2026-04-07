import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Package, Clock, CheckCircle, XCircle, Eye, Download } from "lucide-react"

const index = () => {
    const orders = [
        {
            id: "ORD-001",
            date: "2024-01-15",
            status: "delivered",
            total: 45.5,
            pharmacy: "Farmacia San Juan",
            items: [
                { name: "Paracetamol 500mg", quantity: 2, price: 12.0 },
                { name: "Ibuprofeno 400mg", quantity: 1, price: 21.5 },
            ],
        },
        {
            id: "ORD-002",
            date: "2024-01-12",
            status: "pending",
            total: 78.25,
            pharmacy: "Farmacia Central",
            items: [
                { name: "Amoxicilina 500mg", quantity: 1, price: 35.0 },
                { name: "Vitamina D3", quantity: 2, price: 21.62 },
            ],
        },
        {
            id: "ORD-003",
            date: "2024-01-10",
            status: "processing",
            total: 156.75,
            pharmacy: "Farmacia del Norte",
            items: [
                { name: "Insulina Glargina", quantity: 1, price: 125.0 },
                { name: "Glucómetro", quantity: 1, price: 31.75 },
            ],
        },
        {
            id: "ORD-004",
            date: "2024-01-08",
            status: "cancelled",
            total: 23.4,
            pharmacy: "Farmacia Popular",
            items: [{ name: "Aspirina 100mg", quantity: 3, price: 23.4 }],
        },
    ]

    const statusConfig = {
        pending: { label: "Pendiente", color: "bg-yellow-500", icon: Clock },
        processing: { label: "Procesando", color: "bg-blue-500", icon: Package },
        delivered: { label: "Entregado", color: "bg-green-500", icon: CheckCircle },
        cancelled: { label: "Cancelado", color: "bg-red-500", icon: XCircle },
    }
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.pharmacy.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || order.status === statusFilter
        return matchesSearch && matchesStatus
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h1 className="text-3xl font-bold text-sky-800">Mis Pedidos</h1>
                    <p className="text-sky-600">Gestiona y revisa el historial de tus pedidos</p>
                </div>
            </div>

            {/* Filters */}
            <Card className="bg-linear-to-br from-sky-50 to-sky-100 border-sky-200">
                <CardContent className="p-6">
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-600 w-4 h-4" />
                            <Input
                                placeholder="Buscar por ID de pedido o farmacia..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-white/70 border-sky-200 text-sky-800 placeholder:text-sky-500"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full md:w-48 bg-white/70 border-sky-200 text-sky-800">
                                <SelectValue placeholder="Estado del pedido" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los estados</SelectItem>
                                <SelectItem value="pending">Pendiente</SelectItem>
                                <SelectItem value="processing">Procesando</SelectItem>
                                <SelectItem value="delivered">Entregado</SelectItem>
                                <SelectItem value="cancelled">Cancelado</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Orders List */}
            <div className="space-y-4">
                {filteredOrders.map((order) => {
                    const statusInfo = statusConfig[order.status as keyof typeof statusConfig]
                    const StatusIcon = statusInfo.icon

                    return (
                        <Card
                            key={order.id}
                            className="bg-linear-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-lg transition-all duration-200"
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex items-center space-x-2">
                                            <Package className="w-5 h-5 text-sky-700" />
                                            <CardTitle className="text-lg text-sky-800">{order.id}</CardTitle>
                                        </div>
                                        <Badge className={`${statusInfo.color} text-white`}>
                                            <StatusIcon className="w-3 h-3 mr-1" />
                                            {statusInfo.label}
                                        </Badge>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-sky-600">{order.date}</p>
                                        <p className="text-lg font-semibold text-sky-800">${order.total.toFixed(2)}</p>
                                    </div>
                                </div>
                                <CardDescription className="text-sky-600">{order.pharmacy}</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="space-y-3">
                                    <div className="space-y-2">
                                        {order.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between py-2 border-b border-sky-200/50 last:border-0"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-sky-200 rounded-lg flex items-center justify-center">
                                                        <Package className="w-4 h-4 text-sky-700" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-sky-800">{item.name}</p>
                                                        <p className="text-sm text-sky-600">Cantidad: {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <p className="font-semibold text-sky-800">${item.price.toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between pt-3">
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="border-sky-300 hover:bg-sky-200 bg-white/50 text-sky-700"
                                            >
                                                <Eye className="w-4 h-4 mr-2" />
                                                Ver Detalles
                                            </Button>
                                            {order.status === "delivered" && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-sky-300 hover:bg-sky-200 bg-white/50 text-sky-700"
                                                >
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Descargar Factura
                                                </Button>
                                            )}
                                        </div>
                                        {order.status === "pending" && (
                                            <Button variant="destructive" size="sm">
                                                Cancelar Pedido
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {filteredOrders.length === 0 && (
                <Card className="bg-linear-to-br from-sky-50 to-sky-100 border-sky-200">
                    <CardContent className="p-12 text-center">
                        <Package className="w-16 h-16 text-sky-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-sky-800 mb-2">No se encontraron pedidos</h3>
                        <p className="text-sky-600">
                            {searchTerm || statusFilter !== "all"
                                ? "Intenta ajustar los filtros de búsqueda"
                                : "Aún no has realizado ningún pedido"}
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default index