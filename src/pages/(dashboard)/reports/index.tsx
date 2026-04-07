import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, TrendingDown, Package, ShoppingCart, Heart, FileText, Download, Calendar } from "lucide-react"


const index = () => {

    const monthlySales = [
        { mes: "Ene", ventas: 125.5, pedidos: 10 },
        { mes: "Feb", ventas: 89.25, pedidos: 8 },
        { mes: "Mar", ventas: 156.75, pedidos: 12 },
        { mes: "Abr", ventas: 203.4, pedidos: 15 },
        { mes: "May", ventas: 178.9, pedidos: 13 },
        { mes: "Jun", ventas: 234.6, pedidos: 18 },
    ]

    const categorySales = [
        { name: "Medicamentos", value: 450.25, color: "#10b981" },
        { name: "Vitaminas", value: 156.8, color: "#3b82f6" },
        { name: "Cuidado Personal", value: 89.45, color: "#f59e0b" },
        { name: "Primeros Auxilios", value: 67.3, color: "#ef4444" },
    ]

    const recentActivity = [
        { date: "2024-01-15", action: "Pedido completado", details: "ORD-001 - Farmacia San Juan", amount: 45.5 },
        { date: "2024-01-12", action: "Pedido pendiente", details: "ORD-002 - Farmacia Central", amount: 78.25 },
        { date: "2024-01-10", action: "Farmacia favorita", details: "Agregaste Farmacia del Norte", amount: null },
        { date: "2024-01-08", action: "Pedido cancelado", details: "ORD-004 - Farmacia Popular", amount: 23.4 },
    ]
    const [timeRange, setTimeRange] = useState("6")

    const totalGained = monthlySales.reduce((sum, month) => sum + month.ventas, 0)
    const avgMonthlySales = totalGained / monthlySales.length
    const totalOrdered = monthlySales.reduce((sum, month) => sum + month.pedidos, 0)
    const avgMonthlyOrders = totalOrdered / monthlySales.length
    const lastMonthSales = monthlySales[monthlySales.length - 1].ventas
    const previousMonthSales = monthlySales[monthlySales.length - 2].ventas
    const spendingTrend = lastMonthSales > previousMonthSales ? "up" : "down"
    const trendPercentage = Math.abs(((lastMonthSales - previousMonthSales) / previousMonthSales) * 100)

    const renderCustomBarLabel = ({ x, y, width, value }: any) => {
        return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`$${value}`}</text>;
    };


    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Informes</h1>
                    <p className="text-muted-foreground">Analiza tus ventas</p>
                </div>
                <div className="flex items-center space-x-3">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-48 bg-background border-border">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="3">Últimos 3 meses</SelectItem>
                            <SelectItem value="6">Últimos 6 meses</SelectItem>
                            <SelectItem value="12">Último año</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar PDF
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-linear-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-lg transition-all duration-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-sky-700">Ganancia Total</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-sky-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-sky-900">${totalGained.toFixed(2)}</div>
                        <p className="text-xs text-sky-600">Últimos {timeRange} meses</p>
                    </CardContent>
                </Card>

                <Card className="bg-linear-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-lg transition-all duration-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-sky-700">Promedio Mensual</CardTitle>
                        <Calendar className="h-4 w-4 text-sky-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-sky-900">${avgMonthlySales.toFixed(2)}</div>
                        <div className="flex items-center text-xs">
                            {spendingTrend === "up" ? (
                                <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
                            ) : (
                                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                            )}
                            <span className={spendingTrend === "up" ? "text-emerald-600" : "text-red-600"}>
                                {trendPercentage.toFixed(1)}% vs mes anterior
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-linear-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-lg transition-all duration-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-sky-700">Total Pedidos</CardTitle>
                        <Package className="h-4 w-4 text-sky-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-sky-900">{totalOrdered}</div>
                        <p className="text-xs text-sky-600">Últimos {timeRange} meses</p>
                    </CardContent>
                </Card>

                <Card className="bg-linear-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-lg transition-all duration-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-sky-700">Promedio pedidos</CardTitle>
                        <Heart className="h-4 w-4 text-sky-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-sky-900">{avgMonthlyOrders.toFixed(2)}</div>
                        <p className="text-xs text-sky-600">Promedio de pedidos por mes</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-linear-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                        <CardTitle className="text-sky-900">Ventas Mensuales</CardTitle>
                        <CardDescription className="text-sky-700">Evolución de tus ganancias</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlySales}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
                                <XAxis dataKey="mes" stroke="#0369a1" />
                                <YAxis dataKey="ventas" stroke="#0369a1" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#f0f9ff",
                                        border: "1px solid #bae6fd",
                                        borderRadius: "8px",
                                        color: "#0c4a6e",
                                    }}
                                />
                                <Bar dataKey="ventas" fill="#0ea5e9" label={renderCustomBarLabel} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="bg-linear-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                        <CardTitle className="text-sky-900">Ventas por Categoría</CardTitle>
                        <CardDescription className="text-sky-700">Distribución de tus ventas por tipo de producto</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categorySales}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categorySales.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#f0f9ff",
                                        border: "1px solid #bae6fd",
                                        borderRadius: "8px",
                                        color: "#0c4a6e",
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            {categorySales.map((category, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                                    <span className="text-sm text-sky-700">{category.name}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-linear-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                        <CardTitle className="text-sky-900">Pedidos Mensuales</CardTitle>
                        <CardDescription className="text-sky-700">Evolución de los pedidos</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlySales}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
                                <XAxis dataKey="mes" stroke="#0369a1" />
                                <YAxis dataKey="pedidos" stroke="#0369a1" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#f0f9ff",
                                        border: "1px solid #bae6fd",
                                        borderRadius: "8px",
                                        color: "#0c4a6e",
                                    }}
                                />
                                <Bar dataKey="pedidos" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="bg-linear-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                        <CardTitle className="text-sky-900">Ventas por Categoría</CardTitle>
                        <CardDescription className="text-sky-700">Distribución de tus ventas por tipo de producto</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categorySales}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categorySales.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#f0f9ff",
                                        border: "1px solid #bae6fd",
                                        borderRadius: "8px",
                                        color: "#0c4a6e",
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            {categorySales.map((category, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                                    <span className="text-sm text-sky-700">{category.name}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default index