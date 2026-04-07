import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, TrendingDown, Package, ShoppingCart, Download, Calendar } from "lucide-react"


const index = () => {

    const pedidos = [
        { id: 1, category: "Medicamentos", month: "Ene", value: 150, color: "#10b981" },
        { id: 2, category: "Vitaminas", month: "Feb", value: 100, color: "#3b82f6" },
        { id: 3, category: "Cuidado Personal", month: "Mar", value: 50, color: "#f59e0b" },
        { id: 4, category: "Primeros Auxilios", month: "Ene", value: 25, color: "#ef4444" },
        { id: 5, category: "Medicamentos", month: "Feb", value: 500, color: "#10b981" },
        { id: 6, category: "Medicamentos", month: "Abr", value: 186, color: "#3b82f6" },
        { id: 7, category: "Cuidado Personal", month: "May", value: 40, color: "#f59e0b" },
        { id: 8, category: "Primeros Auxilios", month: "Jun", value: 89, color: "#ef4444" },
    ]

    const monthlySales = [
        { month: "Ene", sales: 0, orders: 0 },
        { month: "Feb", sales: 0, orders: 0 },
        { month: "Mar", sales: 0, orders: 0 },
        { month: "Abr", sales: 0, orders: 0 },
        { month: "May", sales: 0, orders: 0 },
        { month: "Jun", sales: 0, orders: 0 },
    ]

    const categorySales = [
        { id: 1, category: "Medicamentos", sales: 0, orders: 0, color: "#10b981" },
        { id: 2, category: "Vitaminas", sales: 0, orders: 0, color: "#3b82f6" },
        { id: 3, category: "Cuidado Personal", sales: 0, orders: 0, color: "#f59e0b" },
        { id: 4, category: "Primeros Auxilios", sales: 0, orders: 0, color: "#ef4444" },
    ]

    monthlySales.forEach((month) => {
        let mSales = 0
        let mOrders = 0
        pedidos.forEach(element => {
            if (element.month === month.month) {
                mSales += element.value
                mOrders++
            }
        });
        month.sales = mSales
        month.orders = mOrders
    })

    categorySales.forEach(category => {
        let cSales = 0
        let cOrders = 0
        pedidos.forEach(element => {
            if (element.category === category.category) {
                cSales += element.value
                cOrders++
            }
        });
        category.sales = cSales
        category.orders = cOrders
    })


    const [timeRange, setTimeRange] = useState("6")

    const totalSales = pedidos.reduce((sum, value) => sum + value.value, 0)
    const totalOrders = pedidos.length
    const avgMonthlySales = totalSales / monthlySales.length
    const avgMonthlyOrders = totalOrders / monthlySales.length
    const lastMonthSales = monthlySales[monthlySales.length - 1].sales
    const previousMonthSales = monthlySales[monthlySales.length - 2].sales
    const spendingTrend = lastMonthSales > previousMonthSales ? "up" : "down"
    const trendPercentage = Math.abs(((lastMonthSales - previousMonthSales) / previousMonthSales) * 100)

    const renderCustomBarLabelSales = ({ x, y, width, value }: any) => {
        return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`$${value}`}</text>;
    };

    const renderCustomBarLabelOrders = ({ x, y, width, value }: any) => {
        return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`${value}`}</text>;
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
                        <div className="text-2xl font-bold text-sky-900">${totalSales.toFixed(2)}</div>
                        <p className="text-xs text-sky-600">Últimos {timeRange} meses</p>
                    </CardContent>
                </Card>

                <Card className="bg-linear-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-lg transition-all duration-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-sky-700">Promedio Ventas</CardTitle>
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
                        <div className="text-2xl font-bold text-sky-900">{totalOrders}</div>
                        <p className="text-xs text-sky-600">Últimos {timeRange} meses</p>
                    </CardContent>
                </Card>

                <Card className="bg-linear-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-lg transition-all duration-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-sky-700">Promedio Pedidos</CardTitle>
                        <Calendar className="h-4 w-4 text-sky-600" />
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
                                <XAxis dataKey="month" stroke="#0369a1" />
                                <YAxis dataKey="sales" stroke="#0369a1" domain={[0, (dataMax: number) => dataMax * 1.1]} tickCount={6} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#f0f9ff",
                                        border: "1px solid #bae6fd",
                                        borderRadius: "8px",
                                        color: "#0c4a6e",
                                    }}
                                />
                                <Bar name="Ventas" dataKey="sales" fill="#0ea5e9" label={renderCustomBarLabelSales} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="bg-linear-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                        <CardTitle className="text-sky-900">Ventas por Categoría</CardTitle>
                        <CardDescription className="text-sky-700">Distribución de tus ventas por categoría</CardDescription>
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
                                    dataKey="sales"
                                    nameKey="category"
                                >
                                    {categorySales.map((entry) => (
                                        <Cell key={`cell-${entry.category}`} fill={entry.color} />
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
                            {categorySales.map((category) => (
                                <div key={category.category} className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                                    <span className="text-sm text-sky-700">{category.category}</span>
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
                                <XAxis dataKey="month" stroke="#0369a1" />
                                <YAxis dataKey="orders" allowDecimals={false} stroke="#0369a1" domain={[0, (dataMax: number) => dataMax * 1.5]} tickCount={6} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#f0f9ff",
                                        border: "1px solid #bae6fd",
                                        borderRadius: "8px",
                                        color: "#0c4a6e",
                                    }}
                                />
                                <Bar dataKey="orders" name="Pedidos" fill="#0ea5e9" label={renderCustomBarLabelOrders} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="bg-linear-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                        <CardTitle className="text-sky-900">Productos por Categoría</CardTitle>
                        <CardDescription className="text-sky-700">Distribución de tus productos por categoría</CardDescription>
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
                                    dataKey="orders"
                                    nameKey="category"
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
                                    <span className="text-sm text-sky-700">{category.category}</span>
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