import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center bg-green-500 text-white py-5 px-10">
            <Link href="/">
                    <div className="cursor-pointer">
                        <p>
                            FOOD <span className="text-green-500">🍲</span>
                        </p>
                    </div>
            </Link>
            <div className="flex items-center space-x-2">
                <span>🛒</span>
                <p>$0.0</p>
            </div>
        </nav>
    );
}
