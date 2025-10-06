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

import { BarChart2, Boxes, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart,RadialBar, RadialBarChart } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
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
import { AlignJustify, LucideCircleUser, Loader2 } from "lucide-react"
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Label } from "../components/ui/label"
import { Student } from "@/types/types";
import Navbar from "@/components/navbar";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

type CardProps = React.ComponentProps<typeof Card>

export function Dashboard({ className, ...props }: CardProps) {

    const [allStudents, setAllStudents] = useState<any>([]);
    const [selectedCourse, setSelectedCourse] = useState<string>("MCA");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { toast } = useToast();

    const fetchAll = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://student-dashboard-cfg7.onrender.com/api/auth/all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setAllStudents(data);
            // console.log(data)
        } catch (error: any) {
            console.error('Error fetching students:', error);
            
            // Show error toast message
            toast({
                title: "Failed to Load Data",
                description: "Unable to fetch student data. Please check your internet connection and try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
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
    const bar_charData = [
        { browser: "chrome", visitors: MCA_Count.length, fill: "var(--color-chrome)" },
        { browser: "safari", visitors: btech_Count.length, fill: "var(--color-safari)" },
        { browser: "firefox", visitors: mbatech_Count.length, fill: "var(--color-firefox)" }
    ]

    const bar_chartConfig = {
        visitors: {
            label: "Count",
          },
          chrome: {
            label: "MCA",
            color: "hsl(var(--chart-1))",
          },
          safari: {
            label: "B.Tech",
            color: "hsl(var(--chart-2))",
          },
          firefox: {
            label: "MBA Tech",
            color: "hsl(var(--chart-3))",
          },
    } satisfies ChartConfig

    // pie chart

    const pie_chartData = [
        { browser: "chrome", visitors: MCA_Count.length, fill: "var(--color-chrome)" },
        { browser: "safari", visitors: btech_Count.length, fill: "var(--color-safari)" },
        { browser: "firefox", visitors: mbatech_Count.length, fill: "var(--color-firefox)" }
    ]

    const pie_chartConfig = {
        visitors: {
            label: "Course Count",
          },
          chrome: {
            label: "MCA",
            color: "hsl(var(--chart-1))",
          },
          safari: {
            label: "B.Tech",
            color: "hsl(var(--chart-2))",
          },
          firefox: {
            label: "MBA Tech",
            color: "hsl(var(--chart-3))",
          },
    } satisfies ChartConfig

    // radial chart
    const chartData = [
        { browser: "chrome", visitors: MCA_Count.length, fill: "var(--color-chrome)" },
        { browser: "safari", visitors: btech_Count.length, fill: "var(--color-safari)" },
        { browser: "firefox", visitors: mbatech_Count.length, fill: "var(--color-firefox)" }
    ]

    const chartConfig = {
        visitors: {
            label: "Course Count",
          },
          chrome: {
            label: "MCA",
            color: "hsl(var(--chart-1))",
          },
          safari: {
            label: "B.Tech",
            color: "hsl(var(--chart-2))",
          },
          firefox: {
            label: "MBA Tech",
            color: "hsl(var(--chart-3))",
          },
    } satisfies ChartConfig

    useEffect(() => {
        fetchAll();
    }, [])


    return (
        <div className="">
            <Navbar />
            {isLoading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="flex flex-col items-center space-y-4">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        {/* <p className="text-lg font-medium text-muted-foreground">Loading dashboard...</p> */}
                    </div>
                </div>
            ) : (
                <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
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
                <Card className="w-max lg:w-max h-[430px] lg:ml-8 p-3 mt-8 ">
                    <CardHeader>
                        <CardTitle className="mr-auto ml-auto">Bar Chart</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={bar_chartConfig} className="w-[350px] h-[270px]">
                            <BarChart accessibilityLayer data={bar_charData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="browser"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) =>
                                        bar_chartConfig[value as keyof typeof bar_chartConfig]?.label
                                    }
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar
                                    dataKey="visitors"
                                    strokeWidth={2}
                                    radius={8}
                                    activeIndex={2}
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2 font-medium leading-none">
                        <BarChart2 className="h-4 w-4" /> Analysis of Courses using Bar Chart
                        </div>
                    </CardFooter>
                </Card>

                {/* Pie Chart */}
                <Card className="w-max lg:w-max h-[430px] lg:ml-8 mt-8 p-3 md:flex md:flex-col">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Pie Chart</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={pie_chartConfig}
                            className="mx-auto aspect-square max-h-[290px] w-[350px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={pie_chartData}
                                    dataKey="visitors"
                                    nameKey="browser"
                                    innerRadius={60}
                                />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2 font-medium leading-none">
                        <Boxes className="h-4 w-4" /> Analysis of Courses taken using Pie Chart  
                        </div>
                    </CardFooter>
                </Card>

                {/* Radial Chart */}
                <Card className="w-max lg:w-max h-[430px] lg:ml-8 mt-8 p-3 md:flex md:flex-col">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Radial Chart</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square max-h-[250px] w-[350px]"
                        >
                            <RadialBarChart data={chartData} innerRadius={40} outerRadius={140} className="mt-6">
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel nameKey="browser" />}
                                />
                                <RadialBar dataKey="visitors" background />
                            </RadialBarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2 font-medium leading-none mt-11">
                        <TrendingUp className="h-4 w-4" /> Analysis of Courses using Radial Chart
                        </div>
                    </CardFooter>
                </Card>

            </div>
        </motion.div>
            )}
            <Toaster />
        </div>
    )
}
