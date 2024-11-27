function Dashboard() {
    const handleLogout = async () => {
        try {
            const res = await fetch("http://localhost:3000/auth/google/logout");
            const data = await res.json();
            window.location.href = data;
        } catch (err) {
            console.log(`error in login: ${err}`)
        }
    }

    return (
        <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-semibold text-center text-gray-300">
                MailMan is
                <span className="text-blue-500"> Live</span>
            </h1>
            <button className="mt-4 mx-auto h-[2.5rem] w-2/5 cursor-pointer text-white bg-gray-400 bg-opacity-10 rounded-lg"
                onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default Dashboard
