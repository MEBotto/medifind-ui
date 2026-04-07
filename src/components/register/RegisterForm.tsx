
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


interface RegisterForm {
    username: string
    email: string
    password: string
    name: string
    surname: string
    identificationType: string
    identificationNumber: string
    insuranceCompany: string
    insurancePlan: string
}

export default function RegisterForm() {
    const router = useNavigate()
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>()

    const onSubmit = (data: RegisterForm) => {
        console.log("[v0] Register attempt:", data)
        // Simulate register success and redirect to dashboard or login
        router("/dashboard")
    }

    const handleLoginRedirect = () => {
        router("/login")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md md:max-w-2xl bg-card/95 backdrop-blur-md shadow-xl border border-border rounded-3xl p-4 mb-20" noValidate>
            <div className="w-full space-y-1">
                <div className="text-center">
                    <p className="text-2xl font-bold">Crear Cuenta</p>
                </div>
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">Ingresá tus datos para registrarte</p>
                </div>
                <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <Field data-invalid={!!errors.username} className="gap-1">
                        <FieldLabel htmlFor="register-username">Usuario</FieldLabel>
                        <Input
                            id="register-username"
                            placeholder="Usuario"
                            {...register("username", { required: "El usuario es requerido" })}
                            aria-invalid={!!errors.username}
                        />
                        <FieldError errors={[errors.username]} />
                    </Field>
                    <Field data-invalid={!!errors.email} className="gap-1">
                        <FieldLabel htmlFor="register-email">Email</FieldLabel>
                        <Input
                            id="register-email"
                            type="email"
                            placeholder="Email"
                            {...register("email", {
                                required: "El email es requerido",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Email inválido"
                                }
                            })}
                            aria-invalid={!!errors.email}
                        />
                        <FieldError errors={[errors.email]} />
                    </Field>
                    <Field data-invalid={!!errors.password} className="gap-1">
                        <FieldLabel htmlFor="register-password">Contraseña</FieldLabel>
                        <Input
                            id="register-password"
                            type="password"
                            placeholder="Contraseña"
                            {...register("password", { required: "La contraseña es requerida" })}
                            aria-invalid={!!errors.password}
                        />
                        <FieldError errors={[errors.password]} />
                    </Field>
                    <Field data-invalid={!!errors.password} className="gap-1">
                        <FieldLabel htmlFor="register-password-confirmation">Confirmar Contraseña</FieldLabel>
                        <Input
                            id="register-password-confirmation"
                            type="password"
                            placeholder="Confirmar Contraseña"
                            {...register("password", { required: "La contraseña es requerida" })}
                            aria-invalid={!!errors.password}
                        />
                        <FieldError errors={[errors.password]} />
                    </Field>
                    <Field data-invalid={!!errors.name} className="gap-1">
                        <FieldLabel htmlFor="register-name">Nombre</FieldLabel>
                        <Input
                            id="register-name"
                            type="text"
                            placeholder="Nombre"
                            {...register("name", { required: "El nombre es requerido" })}
                            aria-invalid={!!errors.name}
                        />
                        <FieldError errors={[errors.name]} />
                    </Field>
                    <Field data-invalid={!!errors.surname} className="gap-1">
                        <FieldLabel htmlFor="register-surname">Apellido</FieldLabel>
                        <Input
                            id="register-surname"
                            type="text"
                            placeholder="Apellido"
                            {...register("surname", { required: "El apellido es requerido" })}
                            aria-invalid={!!errors.surname}
                        />
                        <FieldError errors={[errors.surname]} />
                    </Field>
                    <Field data-invalid={!!errors.identificationType} className="gap-1">
                        <FieldLabel htmlFor="register-identificationType">Tipo de Documento</FieldLabel>
                        <Controller
                            name="identificationType"
                            control={control}
                            rules={{ required: "Selecciona el tipo de documento" }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value} defaultValue="ID">
                                    <SelectTrigger className="h-12">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ID">DNI</SelectItem>
                                        <SelectItem value="Passport">Pasaporte</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <FieldError errors={[errors.identificationType]} />
                    </Field>
                    <Field data-invalid={!!errors.identificationNumber} className="gap-1">
                        <FieldLabel htmlFor="register-identificationNumber">Número de Documento</FieldLabel>
                        <Input
                            id="register-identificationNumber"
                            type="text"
                            placeholder="Número de Documento"
                            {...register("identificationNumber", { required: "El número de documento es requerido" })}
                            aria-invalid={!!errors.identificationNumber}
                        />
                        <FieldError errors={[errors.identificationNumber]} />
                    </Field>
                    <Field data-invalid={!!errors.insuranceCompany} className="gap-1">
                        <FieldLabel htmlFor="register-insuranceCompany">Covertura Médica</FieldLabel>
                        <Controller
                            name="insuranceCompany"
                            control={control}
                            rules={{ required: "Seleccione la cobertura médica" }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="h-12">
                                        <SelectValue placeholder="Seleccione la cobertura médica" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="OSDE">OSDE</SelectItem>
                                        <SelectItem value="Swiss Medical">Swiss Medical</SelectItem>
                                        <SelectItem value="Galeno">Galeno</SelectItem>
                                        <SelectItem value="Omint">Omint</SelectItem>
                                        <SelectItem value="IOMA">IOMA</SelectItem>
                                        <SelectItem value="PAMI">PAMI</SelectItem>
                                        <SelectItem value="Prepaga">Prepaga</SelectItem>
                                        <SelectItem value="Grupo Oroño">Grupo Oroño</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <FieldError errors={[errors.insuranceCompany]} />
                    </Field>
                    <Field data-invalid={!!errors.insurancePlan} className="gap-1">
                        <FieldLabel htmlFor="register-insurancePlan">Plan de Cobertura</FieldLabel>
                        <Controller
                            name="insurancePlan"
                            control={control}
                            rules={{ required: "Seleccione el plan de cobertura" }}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="h-12">
                                        <SelectValue placeholder="Seleccione el plan de cobertura" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="P210">Plan 210</SelectItem>
                                        <SelectItem value="P510">Plan 510</SelectItem>
                                        <SelectItem value="PB">Plan Básico</SelectItem>
                                        <SelectItem value="PI">Plan Integral</SelectItem>
                                        <SelectItem value="PM">Plan Premium</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <FieldError errors={[errors.insurancePlan]} />
                    </Field>
                    <Field orientation="vertical" className="md:col-span-2">
                        <Button className="hover:bg-chart-5 mt-5" type="submit">Registrarse</Button>
                        <Button type="button" variant="outline" className="bg-card/95 border-0 hover:bg-chart-4" onClick={handleLoginRedirect}>
                            ¿Ya tienes cuenta? Iniciar Sesión
                        </Button>
                    </Field>

                </FieldGroup>
            </div >
        </form >
    )
}
