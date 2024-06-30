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
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react"
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";


export function AllStudents() {

    const [allStudents, setAllStudents] = useState<any>([]);
    const { toast } = useToast()
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");


    const fetchAll = async () => {
        toast({
            variant: "default",
            title: "Fetching Students Data.",
        })
        const response = await fetch('https://student-dashboard-xvbg.onrender.com/api/auth/all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = response.json()
        data.then((obj) => {
            setAllStudents(obj)
            console.log(obj)
        })
        toast({
            variant: "success",
            title: "Data Fetched.",
        })
    }

    const editStudent = async (id: Key | null | undefined) => {
         toast({
            variant: "default",
            title: "Editing Student Data.",
        })

        const data = {
            "fullname": fullname,
            "username": username,
            "email": email,
            "course": course
        }
        
        const response = await fetch(`https://student-dashboard-xvbg.onrender.com/api/auth/edit/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const a = response.json()
        console.log(a)

        if (response.ok) {
            toast({
                variant: "success",
                title: "Student Edited.",
            })
        }
        else {
            console.log(`error`)
            toast({
                variant: "destructive",
                title: "Error Occured.",
            })
        }
        console.log('Edit student form data \n', fullname, username, email, course)

    }

    const deleteStudent = async (id: Key | null | undefined) => {
        toast({
            variant: "destructive",
            title: "Deleting Student.",
        })

        try {
            const response = await fetch(`https://student-dashboard-xvbg.onrender.com/api/auth/delete/${id}`, {
                method: 'DELETE',
            });
            const a = await response.json();
            console.log(a);
            if (!response.ok) {
                toast({
                    variant: "destructive",
                    title: "Some Error Occured.",
                })
            }
            fetchAll();
            toast({
                variant: "success",
                title: "Student Deleted.",
            })

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAll();
    }, [])

    return (
        <div className="">
            <h1 className="flex flex-col items-center justify-center text-4xl mt-4 "></h1>
            <Table className="max-w-4xl ml-auto mr-auto mt-11 rounded-full border">
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
                    {allStudents.map((item: { _id: Key | null | undefined; fullname: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; username: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; email: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; course: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: number) => (
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
                                            <AlertDialogTitle className="text-2xl mb-4">Edit Student</AlertDialogTitle>
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
                                                    <Input placeholder="Enter Your Course" onChange={(e) => setCourse(e.target.value)} />
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
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6}>Total Students</TableCell>
                        <TableCell className="text-center">{allStudents.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}
