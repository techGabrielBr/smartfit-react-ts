import logo from "../../assets/images/logo.svg"

function Header() {
    return (
        <div className="w-full bg-black flex justify-center">
            <img src={logo} className="w-32 h-32"></img>
        </div>
    )
}

export default Header
