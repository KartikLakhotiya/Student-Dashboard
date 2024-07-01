import { BellIcon, CheckIcon } from "@radix-ui/react-icons"
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
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CiUser } from "react-icons/ci";
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";


type CardProps = React.ComponentProps<typeof Card>

export function Dashboard({ className, ...props }: CardProps) {

    const [allStudents, setAllStudents] = useState<any>([]);
    const fetchAll = async () => {
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
    }




    const MCA_Count = allStudents.filter((item: { course: string; }) => item.course === 'MCA');
    console.log(MCA_Count)

    const btech_Count = allStudents.filter((item: { course: string; }) => item.course === 'B.Tech');
    console.log(btech_Count)

    const mbatech_Count = allStudents.filter((item: { course: string; }) => item.course === 'MBA Tech');
    console.log(mbatech_Count)

    useEffect(() => {
        fetchAll();
    }, [])


    return (
        <Card className={cn("w-[380px] ml-8 mt-8", className)} {...props}>
            <CardHeader>
                <CardTitle className="text-center">Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <CiUser />
                    <div className="flex-1 space-y-1">
                        <p className="text-xl font-medium leading-none">
                            Total Students
                        </p>
                    </div>
                    {/* <Switch onClick={notify} /> */}
                    <div className="bg-white text-black h-7 flex justify-center items-center w-7 rounded-full">
                        <p>{allStudents.length}</p>
                    </div>
                </div>

                <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <CiUser />
                    <div className="flex-1 space-y-1">
                        <p className="text-xl font-medium leading-none">
                            MCA Students
                        </p>
                    </div>
                    {/* <Switch onClick={notify} /> */}
                    <div className="bg-white text-black h-7 flex justify-center items-center w-7 rounded-full">
                        <p>{MCA_Count.length}</p>
                    </div>
                </div>
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <CiUser />
                    <div className="flex-1 space-y-1">
                        <p className="text-xl font-medium leading-none">
                            B.Tech Students
                        </p>
                    </div>
                    {/* <Switch onClick={notify} /> */}
                    <div className="bg-white text-black h-7 flex justify-center items-center w-7 rounded-full">
                        <p>{btech_Count.length}</p>
                    </div>
                </div>
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <CiUser />
                    <div className="flex-1 space-y-1">
                        <p className="text-xl font-medium leading-none">
                            MBA Tech Students
                        </p>
                    </div>
                    {/* <Switch onClick={notify} /> */}
                    <div className="bg-white text-black h-7 flex justify-center items-center w-7 rounded-full">
                        <p>{mbatech_Count.length}</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
            <AlertDialog>
                    <AlertDialogTrigger asChild>
                    <Button className="w-full">
                    <CheckIcon className="mr-2 h-4 w-4" /> Show List of All Students
                </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-2xl mb-4">All Students List</AlertDialogTitle>
                            <AlertDialogDescription className="sm:text-left">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                        <TableHead className="w-20">Sr No.</TableHead>
                                        <TableHead className="w-max">Full Name</TableHead>
                                        <TableHead className="w-max">Course</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            allStudents.map((item: { fullname: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; course: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; },index: number) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell className="font-medium w-max">{index + 1}</TableCell>
                                                        <TableCell className="font-medium w-max">{item.fullname}</TableCell>
                                                        <TableCell className="font-medium w-max">{item.course}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Close</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    )
}
