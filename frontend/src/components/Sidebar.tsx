import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogDescription1,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from "../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Label } from "../components/ui/label"



import { Album, Search } from "lucide-react"
import { useEffect, useState } from "react";
import { Student } from "@/types/types";
import Chart from "react-google-charts";
import { useToast } from "./ui/use-toast";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import DefaultSidebar from "./DefaultSidebar";
import { motion } from 'framer-motion';


const Sidebar = () => {
    const [allStudents, setAllStudents] = useState<any>([]);
    const [selectedCourse, setSelectedCourse] = useState<string>("MCA");

    const [filteredStudents, setFilteredStudents] = useState<any>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { toast } = useToast();
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");

    const adminDeviceId = import.meta.env.VITE_SECURE_ADMIN_TOKEN;

    const fetchAll = async () => {
        // toast({
        //     variant: "default",
        //     title: "Fetching Students Data.",
        // });
        const response = await fetch('https://student-dashboard-cfg7.onrender.com/api/auth/all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = response.json();
        data.then((obj) => {
            setAllStudents(obj);
            setFilteredStudents(obj);
        });
        // toast({
        //     variant: "success",
        //     title: "Data Fetched.",
        // });
    }

    const editStudent = async (id: string) => {
        const deviceId = localStorage.getItem("device_id");
        if (deviceId !== adminDeviceId) {
            toast({
                variant: 'destructive',
                title:'Error',
                description: 'Operation Can only be done by Admin.',
            });
            return;
        }

        // fullname validation
        if (fullname.trim() !== "") {
            var number = /[0-9]/.test(fullname)
            if (number) {
                toast({
                    variant: 'destructive',
                    title: 'Fullname cannot contain any numbers.'
                })
                return
            }
            const specialChar1 = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(fullname);
            if (specialChar1) {
                toast({
                    variant: 'destructive',
                    title: 'Full Name cannot contain special characters.'
                });
                return;
            }
        }

        // username validation
        if (username.trim() !== "") {
            const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(username);
            if (specialChar) {
                toast({
                    variant: 'destructive',
                    title: 'Username cannot contain special characters.'
                });
                return;
            }
        }

        // email Validation
        if (email.trim() !== "") {
            var atIdx = email.indexOf("@");
            var dotIdx = email.indexOf(".");
            if (atIdx > 0 && dotIdx > atIdx + 1 && email.length > dotIdx) {
                // Email format is valid
            } else {
                toast({ variant: "destructive", title: "Invalid Email Format." });
                return;
            }
        }

        toast({
            variant: "success",
            title: "Editing Student Data.",
        });

        const data = {
            "fullname": fullname.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            "username": username.toLowerCase(),
            "email": email.toLowerCase(),
            "course": course
        };

        const response = await fetch(`https://student-dashboard-cfg7.onrender.com/api/auth/edit/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            toast({
                variant: "success",
                title: "Student Edited.",
            });
        } else {
            console.log(`error`);
            toast({
                variant: "destructive",
                title: "Error Occurred.",
            });
        }

        fetchAll();
    }

    const deleteStudent = async (id: string) => {
        const deviceId = localStorage.getItem("device_id");
        if (deviceId !== adminDeviceId) {
            toast({
                variant: 'destructive',
                title:'Error',
                description: 'Operation Can only be done by Admin.',
            });
            return;
        }

        toast({
            variant: "destructive",
            title: "Deleting Student.",
        });

        try {
            const response = await fetch(`https://student-dashboard-cfg7.onrender.com/api/auth/delete/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: "Some Error Occurred.",
                });
            }
            fetchAll();
            toast({
                variant: "success",
                title: "Student Deleted.",
            });

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAll();
        localStorage.setItem("device_id", adminDeviceId);
    }, []);

    useEffect(() => {
        const filtered = allStudents.filter((student: any) =>
            student.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.course.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredStudents(filtered);
    }, [searchTerm, allStudents]);

    const MCA_Count = allStudents.filter((item: { course: string; }) => item.course === 'MCA');
    const btech_Count = allStudents.filter((item: { course: string; }) => item.course === 'B.Tech');
    const mbatech_Count = allStudents.filter((item: { course: string; }) => item.course === 'MBA Tech');
    const filter1 = selectedCourse === "All" ? allStudents : allStudents.filter((item: { course: string }) => item.course === selectedCourse);

    const details = [
        {
            title: "MCA Students",
            count: MCA_Count.length,
        },
        {
            title: "B.Tech Students",
            count: btech_Count.length,
        },
        {
            title: "MBA Tech Students",
            count: mbatech_Count.length,
        },
    ]

    // bar chart
    const data = [
        [
            "",
            "",
            { role: "style" },
            {
                sourceColumn: 0,
                role: "annotation",
                type: "string",
                calc: "stringify",
            },
        ],
        ["MCA", MCA_Count.length, "#1d317e", null],
        ["B.Tech", btech_Count.length, "#105a51", null],
        ["MBA Tech", mbatech_Count.length, "#794f16", null],
    ];

    const options = {
        title: "Courses Count in Bar Graph",
        width: 400,
        height: 400,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    // pie chart
    const pie_data = [
        ["Course", "Courses per Student"],
        ["MCA", MCA_Count.length],
        ["B.Tech", btech_Count.length],
        ["MBA Tech", mbatech_Count.length]
    ];

    const pie_options = {
        title: "Analysis Of Courses Taken By Students",
    };

    // column chart
    // const column_data = [
    //     ["Element", "Courses", { role: "style" }],
    //     ["MCA", MCA_Count.length, "#b87333"],
    //     ["B.Tech", btech_Count.length, "silver"],
    //     ["MBA Tech", mbatech_Count.length, "gold"]
    // ];

    useEffect(() => {
        fetchAll();
        window.scrollTo(0, 0)

    }, [])
    return (
        <div>

            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <DefaultSidebar />

            <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2 }}
            >
                <section className="h-[100vh] w-[69rem] ml-72 mr-auto items-center flex flex-col pt-4">
                    <div className="mr-0">
                        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mb-4">
                            <div className="grid grid-cols-3 gap-4 mb-4 cursor-default">
                                {
                                    details.map((item, index) => (
                                        <div className="flex items-center space-x-4 rounded-md border p-4 hover:bg-muted/50" key={index}>
                                            <Album />
                                            <div className="flex-1 space-y-1">
                                                <p className="text-xl font-medium leading-none">
                                                    {item.title}
                                                </p>
                                                <p className="text-gray-400 text-sm">Total MCA Students</p>
                                            </div>
                                            <div className="bg-white text-black h-7 flex justify-center items-center w-7 rounded-full">
                                                <p>{item.count}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            {/* <div className="flex flex-col items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-900">
                        <h1>Sort Students By Courses</h1>
                        <div id="selectbox" className="w-[200px]">
                            <Label htmlFor="course-select" className="mr-2 w-64">Select Course:</Label>
                            <Select defaultValue="MCA" onValueChange={(value) => setSelectedCourse(value)}>
                                <SelectTrigger id="framework">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper" >
                                    <SelectItem value="MCA">MCA</SelectItem>
                                    <SelectItem value="B.Tech">B.Tech</SelectItem>
                                    <SelectItem value="MBA Tech">MBA Tech</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div id="table">
                        <Table className="w-[30rem]">
                        <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-20">Sr No.</TableHead>
                                        <TableHead className="w-max">Full Name</TableHead>
                                        <TableHead className="w-max">Course</TableHead>
                                    </TableRow>
                                </TableHeader>
                        </Table>
                        </div>

                    </div> */}

                            <div className="grid grid-cols-2 gap-4 mb-4 w-full">
                                {/* Sort Students section */}

                                <div className="flex flex-col rounded bg-gray-50 h-[30rem] dark:bg-gray-900 p-4">
                                    <h1 className="text-2xl font-bold">Sort Students by Course</h1>
                                    <div className="flex flex-col mt-4">
                                        <Label htmlFor="course-select" className="mr-2 text-md">Select Course:</Label>
                                        <Select defaultValue="MCA" onValueChange={(value) => setSelectedCourse(value)}>
                                            <SelectTrigger id="framework">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="MCA">MCA</SelectItem>
                                                <SelectItem value="B.Tech">B.Tech</SelectItem>
                                                <SelectItem value="MBA Tech">MBA Tech</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <div className="border rounded-xl w-full mt-4 h-80 overflow-y-auto">
                                            <Table className="w-full">
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="w-20">Sr No.</TableHead>
                                                        <TableHead className="w-max">Full Name</TableHead>
                                                        <TableHead className="w-max">Course</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {filter1.map((item: Student, index: number) => (
                                                        <TableRow key={index}>
                                                            <TableCell className="font-medium w-max">{index + 1}</TableCell>
                                                            <TableCell className="font-medium w-max">{item.fullname}</TableCell>
                                                            <TableCell className="font-medium w-max">{item.course}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>

                                {/* Student Credentials Section */}

                                <div className="flex flex-col rounded bg-gray-50 h-[30rem] dark:bg-gray-900 p-4">
                                    <h1 className="text-2xl font-bold">Student Credentials</h1>
                                    <div className="border rounded-xl w-full mt-4 h-full overflow-y-auto">
                                        <Table className="w-full">
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-20">Sr No.</TableHead>
                                                    <TableHead className="w-max">Username</TableHead>
                                                    <TableHead className="w-max">Email</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {allStudents.map((item: Student, index: number) => (
                                                    <TableRow key={index}>
                                                        <TableCell className="font-medium w-max">{index + 1}</TableCell>
                                                        <TableCell className="font-medium w-max">{item.username}</TableCell>
                                                        <TableCell className="font-medium w-max">{item.email}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center rounded bg-gray-50 h-auto dark:bg-gray-900 p-4">
                                    <div className="">
                                        <Chart
                                            chartType="BarChart"
                                            width="100%"
                                            height="100%"
                                            data={data}
                                            options={options}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-center rounded bg-gray-50 h-auto dark:bg-gray-900">
                                    <div className="ml-auto mr-auto">
                                        <Chart
                                            chartType="PieChart"
                                            data={pie_data}
                                            options={pie_options}
                                            width={"100%"}
                                            height={"400px"}
                                        />
                                    </div>
                                </div>
                            </div>




                            {/* <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-center items-center rounded bg-gray-50 h-auto dark:bg-gray-900 pb-4">
                            // {/* <AddStudent/>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-auto dark:bg-gray-900">
                            <FetchStudentAdmin/>
                        </div>
                    </div> */}


                            {/* All Students */}

                            <div className="flex flex-col h-[40rem] mb-4 rounded bg-gray-50 dark:bg-gray-900 p-4 mt-4">
                                <h1 className="flex justify-center items-center font-bold text-2xl">ALL STUDENTS</h1>
                                <div className="relative w-96 flex justify-center items-center mr-auto ml-auto mt-4 mb-4">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Search className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <Input
                                        type="text"
                                        placeholder="Search Students..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <div className="overflow-y-auto">
                                    <Table>
                                        <TableCaption>List of all the Students.</TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-max">Sr No.</TableHead>
                                                <TableHead className="w-max">Full Name</TableHead>
                                                <TableHead>Username</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead className="">Course</TableHead>
                                                <TableHead className="text-center">Edit</TableHead>
                                                <TableHead className="text-center">Delete</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredStudents.map((item: Student, index: number) => (
                                                <TableRow key={item._id}>
                                                    <TableCell className="font-medium w-max">{index + 1}</TableCell>
                                                    <TableCell className="font-medium w-max">{item.fullname}</TableCell>
                                                    <TableCell>{item.username}</TableCell>
                                                    <TableCell>{item.email}</TableCell>
                                                    <TableCell className="">{item.course}</TableCell>
                                                    <TableCell className="text-center">
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button variant="link" className="text-green-400">Edit</Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle className="text-2xl mb-4">Edit Student
                                                                        <AlertDialogDescription1>
                                                                            <p>Student ID : {item._id}</p>
                                                                        </AlertDialogDescription1>
                                                                    </AlertDialogTitle>
                                                                    <AlertDialogDescription className="sm:text-left">
                                                                        <div className="flex flex-col space-y-1.5 mb-4">
                                                                            <Label htmlFor="name">Full Name</Label>
                                                                            <Input placeholder="Enter Your Full Name" value={item.fullname} onChange={(e) => setFullname(e.target.value)} />
                                                                        </div>
                                                                        <div className="flex flex-col space-y-1.5 mb-4">
                                                                            <Label htmlFor="name">Username</Label>
                                                                            <Input placeholder="Enter Your Username" value={item.username} onChange={(e) => setUsername(e.target.value)} />
                                                                        </div>
                                                                        <div className="flex flex-col space-y-1.5 mb-4">
                                                                            <Label htmlFor="name">Email</Label>
                                                                            <Input placeholder="Enter Your New Email" value={item.email} onChange={(e) => setEmail(e.target.value)} />
                                                                        </div>
                                                                        <div className="flex flex-col space-y-1.5 mb-4">
                                                                            <Label htmlFor="name">Course</Label>
                                                                            <Select onValueChange={(value) => setCourse(value)} value={item.course}>
                                                                                <SelectTrigger id="framework">
                                                                                    <SelectValue placeholder="Select" />
                                                                                </SelectTrigger>
                                                                                <SelectContent position="popper">
                                                                                    <SelectItem value="MCA">MCA</SelectItem>
                                                                                    <SelectItem value="B.Tech">B.Tech</SelectItem>
                                                                                    <SelectItem value="MBA Tech">MBA Tech</SelectItem>
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </div>
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => editStudent(item._id)}>Edit</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button variant="link" className="text-red-500">Delete</Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                                    <AlertDialogDescription1>
                                                                        This action cannot be undone. This will permanently delete the
                                                                        student and remove the data from our database.
                                                                    </AlertDialogDescription1>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction className="text-white bg-red-600 hover:bg-red-900" onClick={() => deleteStudent(item._id)}>Continue</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </motion.div>

        </div>
    )
}

export default Sidebar