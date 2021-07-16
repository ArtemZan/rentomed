import React from "react"

import Content from "./Content"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Header from "./Header"

export default function MainPage()
{
    return(
        <>
            <Navbar />
            <Header />
            <Content />
            <Footer />
        </>
    )
}