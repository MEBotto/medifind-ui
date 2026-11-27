

import { useAppDispatch } from "@/app/hooks"
import { setSession } from "@/features/auth/authSlice"
import { useLoginMutation, authError } from "@/features/auth/authApi"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Button } from '../ui/button'

interface LoginForm {
    email: string
    password: string
}

export default function LoginPage() {
    const router = useNavigate()
    const dispatch = useAppDispatch()
    const [login, { isLoading, reset }] = useLoginMutation()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>()

    const onSubmit = async (data: LoginForm) => {
        try {
            const session = await login(data).unwrap()
            dispatch(setSession(session))
            router("/dashboard", { replace: true })
        } catch (error) { toast.error(authError(error)) }
        finally { reset() }
    }

    const handleCreateAccount = () => {
        router("/register")
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-card/95 backdrop-blur-md shadow-xl border border-border rounded-3xl min-w-[300px] w-[400px] flex items-center justify-center p-4 mb-20" noValidate>
            <div className="w-full space-y-1">
                <div className="text-center">
                    <p className="text-2xl font-bold">Iniciar Sesión</p>
                </div>
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">Ingresá tus credenciales para continuar</p>
                </div>
                <FieldGroup className="mt-3">
                    <Field data-invalid={!!errors.email} className="gap-1">
                        <FieldLabel htmlFor="fieldgroup-name" className="text-lg!">Email</FieldLabel>
                        <Input
                            id="fieldgroup-name"
                            type="email"
                            autoComplete="email"
                            placeholder="Email"
                            {...register("email", { required: "El email es requerido", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" } })}
                            aria-invalid={!!errors.email}
                        />
                        <FieldError errors={[errors.email]} />
                    </Field>
                    <Field data-invalid={!!errors.password} className="gap-1">
                        <FieldLabel htmlFor="fieldgroup-password" className="text-lg!">Contraseña</FieldLabel>
                        <Input
                            id="fieldgroup-password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="Contraseña"
                            {...register("password", { required: "La contraseña es requerida" })}
                            aria-invalid={!!errors.password}
                        />
                        <FieldError errors={[errors.password]} />
                    </Field>
                    <Field orientation="vertical">
                        <Button className="hover:bg-chart-5 text-md!" type="submit" disabled={isLoading}>Iniciar sesión</Button>
                        <Button type="button" variant="outline" className="bg-card/95 border-0 hover:bg-chart-4 text-md!" onClick={handleCreateAccount}>
                            ¿No tienes cuenta? Crear Cuenta
                        </Button>
                    </Field>
                </FieldGroup>
            </div>
        </form>
    )
}