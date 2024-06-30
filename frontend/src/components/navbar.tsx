import { Link } from "react-router-dom";
import { AvatarDemo } from "./avatar";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <nav className="bg-gray-400 border-gray-200 dark:bg-gray-900 w-full">
                <div className="flex flex-wrap items-center justify-between mx-auto p-4 w-full">
                    <Link to='/'>
                        <div className="flex lg:ml-8 items-center space-x-3 rtl:space-x-reverse hover:text-blue-500 cursor-pointer">
                            <AvatarDemo />
                            <p className="self-center text-2xl font-semibold whitespace-nowrap">Student Dashboard</p>
                        </div>
                    </Link>
                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                        {/* <ModeToggle /> */}
                    </button>
                    <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-400 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-400 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 mr-44">
                            <li>
                                <Link to='/create'><Button variant="outline">CREATE</Button></Link>
                            </li>
                            <li>
                                <Link to='/fetch'><Button variant="outline">FETCH STUDENT</Button></Link>
                            </li>
                            <li>
                                <Link to='/allstudents'><Button variant="outline">ALL STUDENTS</Button></Link>
                            </li>
                        </ul>
                    </div>
                    <ModeToggle />
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
