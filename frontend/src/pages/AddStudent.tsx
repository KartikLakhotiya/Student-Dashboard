import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
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
import { motion } from "framer-motion";


export function AddStudent() {

    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [course, setCourse] = useState("");
    const inputRef = useRef<any>(null);

    const focusInput = () => {
        inputRef.current.focus();
    }

    const checkUsernameExists = async (username: String) => {
        const response = await fetch('https://student-dashboard-xvbg.onrender.com/api/auth/all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const allStudents = await response.json();
        return allStudents.some((user: { username: String }) => user.username === username);

    };

    const checkEmailExists = async (email: String) => {
        const response = await fetch('https://student-dashboard-xvbg.onrender.com/api/auth/all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const allStudents = await response.json();
        return allStudents.some((user: { email: String }) => user.email === email);

    };


    const { toast } = useToast()



    const submit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        toast({
            variant: "default",
            title: "Adding Student Data.",
        })

        //validations
        if (fullname === "") return toast({ variant: 'destructive', title: "Full Name Cannot be Empty" })
        if (username === "") return toast({ variant: 'destructive', title: "Username Cannot be Empty" })
        if (email === "") return toast({ variant: 'destructive', title: "Email Cannot be Empty" })
        if (password === "") return toast({ variant: 'destructive', title: "Password Cannot be Empty" })
        if (course === "") return toast({ variant: 'destructive', title: "Please select a course" })

        // fullname validation
        var number = /[0-9]/.test(fullname)
        console.log('fullname validation', number)
        if (number) {
            toast({
                variant: 'destructive',
                title: 'Fullname cannot contain any numbers.'
            })
            return
        }

        // username validation
        const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(username);
        if (specialChar) {
            toast({
                variant: 'destructive',
                title: 'Username cannot contain special characters.'
            });
            return;
        }



        // email Validation
        //email
        var atIdx = email.indexOf("@")
        var dotIdx = email.indexOf(".")
        if (atIdx > 0 && dotIdx > atIdx + 1 && email.length > dotIdx) { }
        else {
            toast({ variant: "destructive", title: "Invalid Email Format." })
            return
        }

        //password
        var upper = /[A-Z]/.test(password)
        var lower = /[a-z]/.test(password)
        var number = /[0-9]/.test(password)
        var special = /[!@#$%^&*()_+=-{}.,;'"]/.test(password)
        var len = password.length
        if (upper && lower && number && special && len >= 8) {
            // password ok
        }
        else {
            toast({
                variant: 'destructive',
                title: 'Incorrect Password',
                description: 'Password should be minimum 8 characters containing lower case, upper case, number and special characters.'
            })
            return
        }

        // Checking if username already exists in the database.
        const usernameExists = await checkUsernameExists(username);
        if (usernameExists) {
            toast({ variant: 'destructive', title: "Username Already Exists." })
            return
        }

        // Checking email already exists.
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            toast({ variant: 'destructive', title: "Email Already Exists." })
            return
        }

        const data = {
            'fullname': fullname.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            'username': username.toLowerCase(),
            'email': email.toLowerCase(),
            'password': password,
            'course': course,
        };

        const response = await fetch('https://student-dashboard-xvbg.onrender.com/api/auth/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        // const a = response.json()
        // console.log(a)

        if (response.ok) {
            toast({
                variant: "success",
                title: "Student Added in the Database",
            })
        }
        else {
            console.log(`error`)
            toast({
                variant: "destructive",
                title: "Error Occured.",
            })
        }

    }
    useEffect(() => {
        focusInput();
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
        >
            <Card className="w-[430px] mr-auto ml-auto mt-4 mb-0 ">
                <CardHeader>
                    <CardTitle>Create Student</CardTitle>
                    <CardDescription>Add a new student to the Database.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Full Name</Label>
                                <Input type="text" placeholder="Enter Your Full Name" onChange={(e) => setFullname(e.target.value)} ref={inputRef} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Email</Label>
                                <Input placeholder="Enter Your Email" type="text" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Username</Label>
                                <Input placeholder="Enter Your Username" onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Password</Label>
                                <Input placeholder="Enter Your Password" type="password" onChange={(e) => setPassword(e.target.value)} />
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
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    )
}
