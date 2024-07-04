import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

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
import { useEffect, useState } from "react"
import { useToast } from "../components/ui/use-toast";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "../components/ui/select";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Student } from "@/types/types";

export function AllStudents() {
    const [allStudents, setAllStudents] = useState<any>([]);
    const [filteredStudents, setFilteredStudents] = useState<any>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { toast } = useToast();
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");

    const fetchAll = async () => {
        toast({
            variant: "default",
            title: "Fetching Students Data.",
        });
        const response = await fetch('https://student-dashboard-xvbg.onrender.com/api/auth/all', {
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
        toast({
            variant: "success",
            title: "Data Fetched.",
        });
    }

    const editStudent = async (id: string) => {
        // validation

        toast({
            variant: "success",
            title: "Editing Student Data.",
        });

        const data = {
            "fullname": fullname,
            "username": username.toLowerCase(),
            "email": email.toLowerCase(),
            "course": course
        };

        const response = await fetch(`https://student-dashboard-xvbg.onrender.com/api/auth/edit/${id}`, {
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
        toast({
            variant: "destructive",
            title: "Deleting Student.",
        });

        try {
            const response = await fetch(`https://student-dashboard-xvbg.onrender.com/api/auth/delete/${id}`, {
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
        >
            <div className="">
                <h1 className="flex flex-col items-center justify-center text-4xl mt-4 font-bold ">ALL STUDENTS</h1>
                <div className="flex justify-center mt-4">
                    <div className="relative w-96">
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
                </div>
                <Table className="max-w-4xl ml-auto mr-auto mt-4 rounded-full border mb-10">
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
                                                        <Input placeholder="Enter Your Full Name" onChange={(e) => setFullname(e.target.value)} />
                                                    </div>
                                                    <div className="flex flex-col space-y-1.5 mb-4">
                                                        <Label htmlFor="name">Username</Label>
                                                        <Input placeholder="Enter Your Username" onChange={(e) => setUsername(e.target.value)} />
                                                    </div>
                                                    <div className="flex flex-col space-y-1.5 mb-4">
                                                        <Label htmlFor="name">Email</Label>
                                                        <Input placeholder="Enter Your New Email" onChange={(e) => setEmail(e.target.value)} />
                                                    </div>
                                                    <div className="flex flex-col space-y-1.5 mb-4">
                                                        <Label htmlFor="name">Course</Label>
                                                        <Select onValueChange={(value) => setCourse(value)}>
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
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete the
                                                    student and remove the data from our database.
                                                </AlertDialogDescription>
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
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={6}>Total Students</TableCell>
                            <TableCell className="text-center">{filteredStudents.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </motion.div>
    );
}
