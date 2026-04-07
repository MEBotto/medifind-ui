import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { User, Mail, Phone, Calendar, Shield, Trash2, Edit, Save, X, IdCardIcon, HeartIcon } from "lucide-react"

interface UserProfile {
    username: string
    email: string
    firstName: string
    lastName: string
    phone: string
    medicalCoverage: string
    coveragePlan: string
    dni: number
    userType: "admin" | "cliente"
    joinDate: string
}

interface ProfileForm {
    firstName: string
    lastName: string
    phone: string
    dni: number
    medicalCoverage: string
    coveragePlan: string
}

const mockUser: UserProfile = {
    username: "juan.perez",
    email: "juan.perez@email.com",
    firstName: "Juan",
    lastName: "Pérez",
    phone: "+54 11 1234-5678",
    medicalCoverage: "Swiss Medical",
    coveragePlan: "Plan 510",
    dni: 12345678,
    userType: "cliente",
    joinDate: "2024-01-15",
}

const index = () => {
    const [user, setUser] = useState(mockUser)
    const [isEditing, setIsEditing] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileForm>({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            dni: user.dni,
            medicalCoverage: user.medicalCoverage,
            coveragePlan: user.coveragePlan,
        },
    })

    const onSubmit = (data: ProfileForm) => {
        setUser((prev) => ({ ...prev, ...data }))
        setIsEditing(false)
        console.log("Profile updated:", data)
    }

    const handleCancel = () => {
        reset({
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            dni: user.dni,
            medicalCoverage: user.medicalCoverage,
            coveragePlan: user.coveragePlan,
        })
        setIsEditing(false)
    }

    const handleDeleteAccount = () => {
        console.log("Account deleted")
        setShowDeleteDialog(false)
        // Redirect to login or home page
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-foreground">Mi Cuenta</h1>
                <p className="text-muted-foreground">Gestiona tu información personal y configuración</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <Card className="bg-linear-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-lg transition-all duration-200 lg:col-span-1">
                    <CardContent className="p-6">
                        {/* Avatar Section */}
                        <div className="text-center mb-6">
                            <div className="relative inline-block">
                                <Avatar className="w-24 h-24 mx-auto ring-4 ring-sky-300/30">
                                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                                    <AvatarFallback className="bg-sky-600 text-white text-2xl">
                                        {user.firstName[0]}
                                        {user.lastName[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-sky-600 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold text-sky-900 mt-4">
                                {user.firstName} {user.lastName}
                            </h2>
                            <p className="text-sky-700">@{user.username}</p>
                            <Badge variant="secondary" className="mt-2 bg-sky-200 text-sky-800 hover:bg-sky-300">
                                {user.userType === "admin" ? "Admin" : "Cliente"}
                            </Badge>
                        </div>

                        {/* Quick Stats */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-sm text-sky-700">
                                <Calendar className="w-4 h-4" />
                                <span>
                                    Miembro desde{" "}
                                    {new Date(user.joinDate).toLocaleDateString("es-ES", {
                                        year: "numeric",
                                        month: "long",
                                    })}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Profile Information */}
                <Card className="bg-linear-to-br from-sky-50 to-sky-100 border-sky-200 hover:shadow-lg transition-all duration-200 lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-xl font-semibold text-sky-900">Información Personal</CardTitle>
                        {!isEditing ? (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsEditing(true)}
                                className="border-sky-300 text-sky-700 hover:bg-sky-200"
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                            </Button>
                        ) : (
                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleCancel}
                                    className="border-sky-300 text-sky-700 hover:bg-sky-200 bg-transparent"
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    Cancelar
                                </Button>
                                <Button size="sm" onClick={handleSubmit(onSubmit)} className="bg-sky-600 hover:bg-sky-700">
                                    <Save className="w-4 h-4 mr-2" />
                                    Guardar
                                </Button>
                            </div>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {!isEditing ? (
                            /* Display Mode */
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-sm font-medium text-sky-700">Nombre de Usuario</Label>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <User className="w-4 h-4 text-sky-600" />
                                            <span className="text-sky-900">{user.username}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-sm font-medium text-sky-700">Correo Electrónico</Label>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <Mail className="w-4 h-4 text-sky-600" />
                                            <span className="text-sky-900">{user.email}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-sm font-medium text-sky-700">Teléfono</Label>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <Phone className="w-4 h-4 text-sky-600" />
                                            <span className="text-sky-900">{user.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-sm font-medium text-sky-700">Nombre Completo</Label>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <User className="w-4 h-4 text-sky-600" />
                                            <span className="text-sky-900">
                                                {user.firstName} {user.lastName}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <Label className="text-sm font-medium text-sky-700">DNI</Label>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <IdCardIcon className="w-4 h-4 text-sky-600" />
                                            <span className="text-sky-900">{user.dni}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium text-sky-700">Cobertura Médica</Label>
                                        <div className="flex flex-col items-start space-x-2 mt-1">
                                            <div className="flex items-center gap-2">
                                                <HeartIcon className="w-4 h-4 text-sky-600" />
                                                <span className="text-sky-900">{user.medicalCoverage}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Shield className="w-4 h-4 text-sky-600" />
                                                <span className="text-sky-900">{user.coveragePlan}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Edit Mode */
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="firstName">Nombre</Label>
                                            <Input
                                                id="firstName"
                                                {...register("firstName", { required: "El nombre es requerido" })}
                                                className="mt-1"
                                            />
                                            {errors.firstName && (
                                                <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="lastName">Apellido</Label>
                                            <Input
                                                id="lastName"
                                                {...register("lastName", { required: "El apellido es requerido" })}
                                                className="mt-1"
                                            />
                                            {errors.lastName && <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="dni">DNI</Label>
                                            <Input
                                                id="dni"
                                                {...register("dni", { required: "El DNI es requerido" })}
                                                className="mt-1"
                                            />
                                            {errors.dni && <p className="text-sm text-destructive mt-1">{errors.dni.message}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="phone">Teléfono</Label>
                                            <Input
                                                id="phone"
                                                {...register("phone", { required: "El teléfono es requerido" })}
                                                className="mt-1"
                                            />
                                            {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
                                        </div>

                                        <div>
                                            <Label htmlFor="medicalCoverage">Cobertura Médica</Label>
                                            <Input
                                                id="medicalCoverage"
                                                {...register("medicalCoverage", { required: "La cobertura médica es requerida" })}
                                                className="mt-1"
                                            />
                                            {errors.medicalCoverage && <p className="text-sm text-destructive mt-1">{errors.medicalCoverage.message}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="coveragePlan">Plan</Label>
                                            <Input
                                                id="coveragePlan"
                                                {...register("coveragePlan", { required: "El plan es requerido" })}
                                                className="mt-1"
                                            />
                                            {errors.coveragePlan && <p className="text-sm text-destructive mt-1">{errors.coveragePlan.message}</p>}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}

                    </CardContent>
                </Card>
            </div>

            {/* Danger Zone */}
            <Card className="bg-linear-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-all duration-200">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-red-800 flex items-center">
                        <Trash2 className="w-5 h-5 mr-2" />
                        Zona de Peligro
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-red-700 mb-4">
                        Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, ten cuidado.
                    </p>

                    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Eliminar Cuenta
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y removerá todos tus
                                    datos de nuestros servidores.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                                    Sí, eliminar cuenta
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>
        </div>
    )
}

export default index