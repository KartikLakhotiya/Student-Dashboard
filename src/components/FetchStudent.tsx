import * as React from "react"
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
    const [first, setfirst] = useState(false)



    const { toast } = useToast()

    const submit = async () => {

        //validations
        if (username === "") return toast({ variant: 'destructive', title: "Username Cannot be Empty" })
        if (password === "") return toast({ variant: 'destructive', title: "Password Cannot be Empty" })
        
        }

        

    return (
        <div className="flex">
            <Card className="w-[450px] mr-auto ml-auto mt-8 ">
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
                first && <Card className="w-[450px] mr-auto ml-auto mt-8 mb-auto">
                <CardHeader>
                    <CardTitle>Student Found</CardTitle>
                    <CardDescription>Fetched details of student from the Database.</CardDescription>
                </CardHeader>
                <CardContent>
                    
                        <div className="grid w-full items-center">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name" className="text-lg">Full Name : </Label>
                                <Label htmlFor="name" className="text-lg">Username : </Label>
                                <Label htmlFor="name" className="text-lg">Email : </Label>
                                <Label htmlFor="name" className="text-lg">Course : </Label>
                            </div>
                        </div>
                    
                </CardContent>
            </Card>
            }
        </div>
    )
}
