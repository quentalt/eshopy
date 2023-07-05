import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
import {ReactNode} from "react";


export const Layout = ({children}: {children: ReactNode}) => {
    return (
        <div>
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}

export default Layout;