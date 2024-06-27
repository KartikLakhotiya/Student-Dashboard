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
import { CardTitle } from "./ui/card"
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react"
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

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
