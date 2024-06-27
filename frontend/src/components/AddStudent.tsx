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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export function AddStudent() {

    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [course, setCourse] = useState("");

    

    const { toast } = useToast()

    const submit = async() => {
        
        //validations
        if (fullname === "") return toast({ variant: 'destructive', title: "Full Name Cannot be Empty" })
        if (username === "") return toast({ variant: 'destructive', title: "Username Cannot be Empty" })
        if (email === "") return toast({ variant: 'destructive', title: "Email Cannot be Empty" })
        if (password === "") return toast({ variant: 'destructive', title: "Password Cannot be Empty" })
        
        // email Validation
        //email
        var atIdx = email.indexOf("@")
        var dotIdx = email.indexOf(".")
        if (atIdx > 0 && dotIdx > atIdx + 1 && email.length > dotIdx) { }
        else {
            toast({variant:"destructive",title:"Invalid Email Format."})
            return
        }
        
        const data = {
            'fullname': fullname,
            'username': username,
            'email': email,
            'password': password,
            'course': course,
        };

        const response = await fetch('http://localhost:5000/api/auth/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const a = response.json()
        console.log(a)

        if(response.ok){
            toast({
              title: "Student Added in the Database",
            })
        }
        else{
            console.log(`error`)
            toast({
                variant:"destructive",
                title: "Error Occured.",
              })
        }
        
      }
    return (
        <Card className="w-[450px] mr-auto ml-auto mt-8 ">
            <CardHeader>
                <CardTitle>Create Student</CardTitle>
                <CardDescription>Add a new student to the Database.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="Enter Your Full Name" onChange={(e) => setFullname(e.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Email</Label>
                            <Input id="name" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Username</Label>
                            <Input id="name" placeholder="Enter Your Username" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Password</Label>
                            <Input id="name" placeholder="Enter Your Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="course">Course</Label>
                            <Select onValueChange={(value) => setCourse(value)}>
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
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button onClick={submit}>Submit</Button>
            </CardFooter>
        </Card>
    )
}
