import { Link } from "react-router-dom";
import { AvatarDemo } from "./avatar";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [admin, setAdmin] = useState(false);

    const adminDeviceId = import.meta.env.VITE_SECURE_ADMIN_TOKEN;

    const fn = () => {
        const deviceId = localStorage.getItem("device_id");
        if (deviceId === adminDeviceId) {
            setAdmin(true)
        }
    }

    useEffect(() => {
        localStorage.setItem("device_id", adminDeviceId);
        fn();
    }, [adminDeviceId])


    return (
        <div>
            <nav className="bg-gray-200 border-gray-200 dark:bg-gray-900 w-full">
                <div className="flex flex-wrap items-center justify-between mx-auto p-4 w-full">
                    <Link to='/'>
                        <div className="flex lg:ml-8 items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                            <AvatarDemo />
                            <p className="self-center text-2xl font-semibold whitespace-nowrap main-heading">STUDENT DASHBOARD</p>
                        </div>
                    </Link>
                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`${isOpen ? 'block' : 'hidden'} w-full lg:block lg:w-auto`} id="navbar-default">
                        <div className="flex flex-col lg:flex-row lg:items-center">
                            <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 rounded-lg  lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0  lg:dark:bg-gray-900 dark:border-gray-700 mr-[21rem] lg:w-max">
                                <li>
                                    <Link to='/'><Button variant="outline" onClick={() => setIsOpen(false)}>HOME</Button></Link>
                                </li>
                                <li>
                                    <Link to='/create'><Button variant="outline" onClick={() => setIsOpen(false)}>CREATE</Button></Link>
                                </li>
                                <li>
                                    <Link to='/fetch'><Button variant="outline" onClick={() => setIsOpen(false)}>FETCH STUDENT</Button></Link>
                                </li>
                                <li>
                                    <Link to='/allstudents'><Button variant="outline" onClick={() => setIsOpen(false)}>ALL STUDENTS</Button></Link>
                                </li>
                                {admin ? <li>
                                    <Link to='/admin'><Button variant="outline" onClick={() => setIsOpen(false)}>ADMIN</Button></Link>
                                </li> : ""}
                            </ul>
                            <div className="ml-auto md:ml-0">
                                <ModeToggle />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

    )
}

export default Navbar;
