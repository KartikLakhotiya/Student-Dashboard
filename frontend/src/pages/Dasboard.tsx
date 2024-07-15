import {
    AlertDialog,
    AlertDialogAction,
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

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { AlignJustify, LucideCircleUser } from "lucide-react"
import { motion } from "framer-motion";
import { Chart } from "react-google-charts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Label } from "../components/ui/label"
import { Student } from "@/types/types";
import Navbar from "@/components/navbar";

type CardProps = React.ComponentProps<typeof Card>

export function Dashboard({ className, ...props }: CardProps) {

    const [allStudents, setAllStudents] = useState<any>([]);
    const [selectedCourse, setSelectedCourse] = useState<string>("MCA");

    const fetchAll = async () => {
        const response = await fetch('https://student-dashboard-ssei.onrender.com/api/auth/all', {
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
    const filteredStudents = selectedCourse === "All" ? allStudents : allStudents.filter((item: { course: string }) => item.course === selectedCourse);

    const details = [
        {
            title: "Total Students",
            count: allStudents.length,
        },
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
    const column_data = [
        ["Element", "Courses", { role: "style" }],
        ["MCA", MCA_Count.length, "#b87333"],
        ["B.Tech", btech_Count.length, "silver"],
        ["MBA Tech", mbatech_Count.length, "gold"]
    ];

    useEffect(() => {
        fetchAll();
    }, [])


    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <Navbar />
            {/* Top Div */}
            <div className="flex flex-col lg:flex-row lg:mx-14 lg:ml-20 lg:mt-5 mb-8 p-1">

                {/* Details Card */}

                <Card className={cn("w-full lg:w-[380px] mt-8 h-[500px]", className)} {...props}>
                    <CardHeader>
                        <CardTitle className="text-center">Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {
                            details.map((item, index) => (
                                <div className="flex items-center space-x-4 rounded-md border p-4 hover:bg-muted/50" key={index}>
                                    <LucideCircleUser />
                                    <div className="flex-1 space-y-1">
                                        <p className="text-xl font-medium leading-none">
                                            {item.title}
                                        </p>
                                    </div>
                                    <div className="bg-white text-black h-7 flex justify-center items-center w-7 rounded-full">
                                        <p>{item.count}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </CardContent>
                    <CardFooter>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className="w-full mt-11">
                                    <AlignJustify className="mr-2 h-4 w-4" /> Show List of All Students
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="h-[600px] overflow-y-auto">
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
                                                {allStudents.map((item: Student, index: number) => (
                                                    <TableRow key={index}>
                                                        <TableCell className="font-medium w-max">{index + 1}</TableCell>
                                                        <TableCell className="font-medium w-max">{item.fullname}</TableCell>
                                                        <TableCell className="font-medium w-max">{item.course}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogAction>Close</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardFooter>
                </Card>

                {/* All Students Credentials Card */}
                <Card className="w-full lg:w-[500px] h-[500px] lg:ml-8 mt-8">
                    <CardHeader>
                        <CardTitle className="text-center">Student Credentials</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 h-[400px] overflow-y-auto"> {/* Set a fixed height and enable vertical scrolling */}
                        
                        <div className="flex space-x-4 rounded-md border p-4">
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
                    </CardContent>
                </Card>


                {/* Sort Students by Course Card */}
                <Card className="w-full lg:w-[500px] h-[500px] lg:ml-8 mt-8">
                    <CardHeader>
                        <CardTitle className="text-center">Sort Students by Course</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 h-[400px] overflow-y-auto"> {/* Set a fixed height and enable vertical scrolling */}
                        <div className="flex justify-between items-center mb-4 w-max">
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
                        <div className="flex space-x-4 rounded-md border p-4">
                            <Table className="w-full">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-20">Sr No.</TableHead>
                                        <TableHead className="w-max">Full Name</TableHead>
                                        <TableHead className="w-max">Course</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredStudents.map((item: Student, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium w-max">{index + 1}</TableCell>
                                            <TableCell className="font-medium w-max">{item.fullname}</TableCell>
                                            <TableCell className="font-medium w-max">{item.course}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

            </div>

            {/* Bottom Div */}
            <h1 className="flex justify-center items-center text-4xl mt-11 text-card-foreground font-bold" >Visualisation Charts</h1>
            <div className="w-max lg:w-max h-[430px] lg:ml-14 lg:flex lg:justify-between mb-20">

                {/* Bar Chart */}
                <Card className="w-max lg:w-max h-[430px] lg:ml-8 p-3 mt-8 hover:scale-110 transition-scale-90 duration-300 ease-in-out">
                    <Chart
                        chartType="BarChart"
                        width="100%"
                        height="100%"
                        data={data}
                        options={options}
                    />
                </Card>

                {/* Pie Chart */}
                <Card className="w-max lg:w-max h-[430px] lg:ml-8 mt-8 p-3 md:flex md:flex-col hover:scale-110 transition-scale-90 duration-300 ease-in-out">
                    <Chart
                        chartType="PieChart"
                        data={pie_data}
                        options={pie_options}
                        width={"100%"}
                        height={"400px"}
                    />
                </Card>

                {/* Column Chart */}
                <Card className="w-max lg:w-max h-[430px] lg:ml-8 mt-8 p-3 md:flex md:flex-col hover:scale-110 transition-scale-90 duration-300 ease-in-out">
                    <Chart
                        chartType="ColumnChart"
                        width="100%"
                        height="400px"
                        data={column_data} />
                </Card>
            </div>
        </motion.div>


    )
}
