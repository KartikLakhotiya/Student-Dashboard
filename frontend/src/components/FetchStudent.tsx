import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export function FetchStudent() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [student, setStudent] = useState<any>(null);



    const { toast } = useToast()

    const submit = async () => {
        toast({
            variant: "default",
            title: "Fetching Student Data.",
        })

        //validations
        if (username === "") return toast({ variant: 'destructive', title: "Username Cannot be Empty" })
        if (password === "") return toast({ variant: 'destructive', title: "Password Cannot be Empty" })

        const data = {
            "username": username,
            "password": password
        }

        const response = await fetch('https://student-dashboard-xvbg.onrender.com/api/auth/fetch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            toast({
                variant: "success",
                title: "Student Found in the Database",
            })
        }
        else {
            console.log(`error`)
            toast({
                variant: "destructive",
                title: "Error Occured.",
            })
        }
        const fetchedStudent = response.json();
        fetchedStudent.then((obj) => {
            console.log(obj)
            setStudent(obj)
        }).catch(err => console.log(err))

        console.log('student', student)
    }






    return (
        <div className=" sm:flex sm:mx-0 lg:flex-row lg:mx-32">
            <Card className="w-[450px] mr-auto ml-auto mt-8 md:w-[400px] ">
                <CardHeader>
                    <CardTitle>Fetch Student</CardTitle>
                    <CardDescription>Fetch details of a student from the Database.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Username</Label>
                                <Input id="name" placeholder="Enter Your Username" onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Password</Label>
                                <Input id="name" placeholder="Enter Your Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button onClick={submit}>Submit</Button>
                </CardFooter>
            </Card>

            {
                student && (
                    <Card className="w-[450px] mr-auto ml-auto mt-8">
                        <CardHeader>
                            <CardTitle>Student Found</CardTitle>
                            <CardDescription>Fetched details of student from the Database.</CardDescription>
                        </CardHeader>
                        <CardContent>

                            <div className="grid w-full items-center">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name" className="text-lg">Full Name : {student.fullname}</Label>
                                    <Label htmlFor="name" className="text-lg">Username : {student.username}</Label>
                                    <Label htmlFor="name" className="text-lg">Email : {student.email}</Label>
                                    <Label htmlFor="name" className="text-lg">Course : {student.course}</Label>
                                </div>
                            </div>

                        </CardContent>
                    </Card>)
            }
        </div>
    )
}
