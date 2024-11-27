function Login() {
    const handleLogin = async () => {
        try {
            const res = await fetch("http://localhost:3000/auth/google"); //1) req backend for google login url
            const data = await res.json();
            window.location.href = data; //3) goto google login url
        } catch (err) {
            console.log(`error in login: ${err}`)
        }
    }

    return (
        <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-semibold text-center text-gray-300">
                Launch
                <span className="text-blue-500"> AutoMail</span>
            </h1>
            <button className="mt-4 mx-auto h-[2.5rem] w-2/5 cursor-pointer text-white bg-gray-400 bg-opacity-10 rounded-lg"
                onClick={handleLogin}>
                Login
            </button>
        </div>
    )
}

export default Login