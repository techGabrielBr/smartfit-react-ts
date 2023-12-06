import logo from "../../assets/images/logo.svg"

function Footer() {
    return (
        <div className="w-full bg-dark-grey flex flex-col items-center pb-12">
            <img src={logo} className="w-24 h-24"></img>
            <p className="font-gotham text-white">Todos os direitos reservados - 2020</p>
        </div>
    )
}

export default Footer
