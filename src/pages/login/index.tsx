import LoginForm from "../../components/login/LoginForm";
import Logo from "@/components/ui/MediFindLogo";

const Login = () => {
    return (
        <div className="bg-linear-to-br from-emerald-100 via-indigo-300 to-emerald-100 ">
            <div className="min-h-screen flex items-center flex-col justify-center space-y-8 w-full px-3 sm:px-4 overflow-x-hidden">
                <div className="flex flex-col items-center text-center mt-10 mb-0 ml-16">
                    <Logo className="h-20 w-auto" />
                </div>
                <div className="text-center mb-10 mt-0">
                    <p className="text-xl text-gray-700">Tu plataforma médica de confianza</p>
                </div>
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;