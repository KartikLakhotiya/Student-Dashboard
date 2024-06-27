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
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react"
import { useToast } from "./ui/use-toast";


export function AllStudents() {
    
    const [allStudents, setAllStudents] = useState<any>([]);
    const { toast } = useToast()


    const fetchAll = async() => {
        const response = await fetch('http://localhost:5000/api/auth/all', {
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
          variant:"success",
          title: "Data Fetched.",
        })
    }
    useEffect(() => {
      fetchAll();
    }, [])
    
    return (
        <div className="">
            <h1 className="flex flex-col items-center justify-center text-4xl mt-4 ">All Students List</h1>
            <Table className="max-w-2xl ml-auto mr-auto mt-4">
                <TableCaption>List of all the Students.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-max">Full Name</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Course</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allStudents.map((item: { _id: Key | null | undefined; fullname: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; username: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; email: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; course: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
                        <TableRow key={item._id}>
                            <TableCell className="font-medium w-max">{item.fullname}</TableCell>
                            <TableCell>{item.username}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell className="text-right">{item.course}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total Students</TableCell>
                        <TableCell className="text-right">{allStudents.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}
