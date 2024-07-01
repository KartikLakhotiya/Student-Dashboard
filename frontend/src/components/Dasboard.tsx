import { CheckIcon } from "@radix-ui/react-icons"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { LucideCircleUser } from "lucide-react"
import { motion } from "framer-motion";
import { Chart } from "react-google-charts";



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
            // console.log(obj)
        })
    }




    const MCA_Count = allStudents.filter((item: { course: string; }) => item.course === 'MCA');

    const btech_Count = allStudents.filter((item: { course: string; }) => item.course === 'B.Tech');

    const mbatech_Count = allStudents.filter((item: { course: string; }) => item.course === 'MBA Tech');

    // bar chart
    const data = [
        [
            "Courses",
            "Count",
            { role: "style" },
            {
                sourceColumn: 0,
                role: "annotation",
                type: "string",
                calc: "stringify",
            },
        ],
        ["MCA", MCA_Count.length, "#b87333", null],
        ["B.Tech", btech_Count.length, "silver", null],
        ["MBA Tech", mbatech_Count.length, "gold", null],
    ];

    const options = {
        title: "Courses Offered",
        width: 500,
        height: 400,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    useEffect(() => {
        fetchAll();
    }, [])


    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <div className="flex">
                <Card className={cn("w-[380px] ml-8 mt-8 h-[470px]", className)} {...props}>
                    <CardHeader>
                        <CardTitle className="text-center">Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className=" flex items-center space-x-4 rounded-md border p-4 hover:bg-muted/50">
                            <LucideCircleUser />
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

                        <div className=" flex items-center space-x-4 rounded-md border p-4 hover:bg-muted/50">
                            <LucideCircleUser />
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
                        <div className=" flex items-center space-x-4 rounded-md border p-4 hover:bg-muted/50">
                            <LucideCircleUser />
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
                        <div className=" flex items-center space-x-4 rounded-md border p-4 hover:bg-muted/50">
                            <LucideCircleUser />
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
                                                    allStudents.map((item: { fullname: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; course: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: number) => {
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

                <Card className="w-[500px] ml-8 mt-8">
                    <CardHeader>
                        <CardTitle className="text-center">Student Credentials</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 h-[400px] overflow-y-auto"> {/* Set a fixed height and enable vertical scrolling */}
                        <div className="flex items-center space-x-4 rounded-md border p-4">
                            <Table className="w-full">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-20">Sr No.</TableHead>
                                        <TableHead className="w-max">Username</TableHead>
                                        <TableHead className="w-max">Email</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {allStudents.map((item: { username: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; email: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined }, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium w-max">{index + 1}</TableCell>
                                            <TableCell className="font-medium w-max">{item.username}</TableCell>
                                            <TableCell className="font-medium w-max">{item.email}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>


                <Card className="w-auto h-[440px] ml-8 mt-8 p-4">
                    <Chart
                        chartType="BarChart"
                        width="50%"
                        height="100px"
                        data={data}
                        options={options}
                    />
                </Card>

            </div>
        </motion.div>
    )
}
