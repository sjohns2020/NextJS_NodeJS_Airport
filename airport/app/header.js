import Link from "next/link";
import Image from "next/image";

const Header = () => {
    return (
        <header>
            <Image alt="logo" src="/images/logo.jpeg" width="110" height="110" />
            <Link href="/">Home</Link>
            <Link href="/arrivals">Arrivals</Link>
            <Link href="/departures">Departures</Link>
            <Link href="/search">Search</Link>
        </header>


    );
}

export default Header;