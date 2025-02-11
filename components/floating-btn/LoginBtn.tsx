import { FaUser } from "react-icons/fa";

const LoginBtn = () => {
    return (
        <>
            <div className="flex items-center gap-2">
                <FaUser className="w-4 h-4" />
                <h1 className="text-white text-sm">Se connecter</h1>
            </div>
        </>

    )
}

export default LoginBtn;