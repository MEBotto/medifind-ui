
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Search, MapPin, Clock, Phone, Star } from "lucide-react"


const index = () => {
    interface Pharmacy {
        id: number
        name: string
        address: string
        phone: string
        hours: string
        status: "abierto" | "cerrado"
        rating: number
        distance: string
        isFavorite: boolean
    }

    const mockPharmacies: Pharmacy[] = [
        {
            id: 1,
            name: "Farmacia San Juan",
            address: "Av. Corrientes 1234, CABA",
            phone: "+54 11 4567-8901",
            hours: "Lun-Dom 8:00-22:00",
            status: "abierto",
            rating: 4.8,
            distance: "0.5 km",
            isFavorite: true,
        },
        {
            id: 2,
            name: "Farmacia Central",
            address: "Av. Santa Fe 2567, CABA",
            phone: "+54 11 4567-8902",
            hours: "Lun-Sab 9:00-21:00",
            status: "cerrado",
            rating: 4.5,
            distance: "1.2 km",
            isFavorite: false,
        },
        {
            id: 3,
            name: "Farmacia del Pueblo",
            address: "Av. Rivadavia 3456, CABA",
            phone: "+54 11 4567-8903",
            hours: "Lun-Dom 24hs",
            status: "abierto",
            rating: 4.7,
            distance: "0.8 km",
            isFavorite: true,
        },
        {
            id: 4,
            name: "Farmacia Norte",
            address: "Av. Cabildo 1890, CABA",
            phone: "+54 11 4567-8904",
            hours: "Lun-Vie 8:00-20:00",
            status: "abierto",
            rating: 4.3,
            distance: "2.1 km",
            isFavorite: false,
        },
        {
            id: 5,
            name: "Farmacia Sur",
            address: "Av. San Juan 1567, CABA",
            phone: "+54 11 4567-8905",
            hours: "Lun-Dom 7:00-23:00",
            status: "cerrado",
            rating: 4.6,
            distance: "1.5 km",
            isFavorite: false,
        },
        {
            id: 6,
            name: "Farmacia Express",
            address: "Av. Callao 987, CABA",
            phone: "+54 11 4567-8906",
            hours: "Lun-Dom 24hs",
            status: "abierto",
            rating: 4.9,
            distance: "0.3 km",
            isFavorite: true,
        },
    ]

    const [searchTerm, setSearchTerm] = useState("")
    const [pharmacies, setPharmacies] = useState(mockPharmacies)

    const toggleFavorite = (id: number) => {
        setPharmacies((prev) =>
            prev.map((pharmacy) => (pharmacy.id === id ? { ...pharmacy, isFavorite: !pharmacy.isFavorite } : pharmacy)),
        )
    }

    const filteredPharmacies = pharmacies.filter(
        (pharmacy) =>
            pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Farmacias</h1>
                    <p className="text-muted-foreground">Encuentra farmacias cerca de tu ubicación</p>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-120">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        placeholder="Buscar farmacias..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-card border-sky-200 focus:border-sky-400 text-lg!"
                    />
                </div>
            </div>

            {/* Pharmacy Grid */}
            <div className="grid grid-cols-1 min-[940px]:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPharmacies.map((pharmacy) => (
                    <Card
                        key={pharmacy.id}
                        className="bg-linear-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 hover:from-sky-100 hover:to-sky-200 dark:hover:from-sky-800/30 dark:hover:to-sky-700/30 transition-all duration-200 hover:shadow-lg border-sky-200 dark:border-sky-700"
                    >
                        <CardContent className="p-6">
                            {/* Header with Heart Icon and Status */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-sky-200 dark:bg-sky-800 rounded-full flex items-center justify-center">
                                        <Heart
                                            className={`w-6 h-6 cursor-pointer transition-colors ${pharmacy.isFavorite
                                                ? "text-sky-600 fill-sky-600 dark:text-sky-400 dark:fill-sky-400"
                                                : "text-sky-400 hover:text-sky-600 dark:text-sky-500 dark:hover:text-sky-400"
                                                }`}
                                            onClick={() => toggleFavorite(pharmacy.id)}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sky-900 dark:text-sky-100 text-lg">{pharmacy.name}</h3>
                                        <div className="flex items-center space-x-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`w-3 h-3 ${star <= Math.floor(pharmacy.rating)
                                                        ? "fill-amber-400 text-amber-400"
                                                        : "text-sky-300 dark:text-sky-600"
                                                        }`}
                                                />
                                            ))}
                                            <span className="text-sm text-sky-600 dark:text-sky-400 ml-1">({pharmacy.rating})</span>
                                        </div>
                                    </div>
                                </div>
                                <Badge
                                    variant="secondary"
                                    className={
                                        pharmacy.status === "abierto"
                                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300"
                                            : "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300"
                                    }
                                >
                                    {pharmacy.status === "abierto" ? "Abierto" : "Cerrado"}
                                </Badge>
                            </div>

                            {/* Pharmacy Details */}
                            <div className="space-y-3">
                                <div className="flex items-start space-x-2">
                                    <MapPin className="w-4 h-4 text-sky-500 dark:text-sky-400 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-sm text-sky-800 dark:text-sky-200">{pharmacy.address}</p>
                                        <p className="text-xs text-sky-600 dark:text-sky-400">{pharmacy.distance} de distancia</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0" />
                                    <p className="text-sm text-sky-800 dark:text-sky-200">{pharmacy.hours}</p>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Phone className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0" />
                                    <p className="text-sm text-sky-800 dark:text-sky-200">{pharmacy.phone}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* No Results */}
            {filteredPharmacies.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-sky-500 dark:text-sky-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-sky-900 dark:text-sky-100 mb-2">No se encontraron farmacias</h3>
                    <p className="text-sky-600 dark:text-sky-400">Intenta con otros términos de búsqueda</p>
                </div>
            )}
        </div>
    )
}


export default index