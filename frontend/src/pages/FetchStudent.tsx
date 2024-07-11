import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";

export function FetchStudent() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [student, setStudent] = useState<any>(null);

    const inputRef = useRef<any>(null);

    const focusInput = () => {
        inputRef.current.focus();
    }

    const { toast } = useToast();

    const submit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        toast({
            variant: "default",
            title: "Fetching Student Data.",
        });

        // Validations
        if (username === "")
            return toast({
                variant: "destructive",
                title: "Username Cannot be Empty",
            });
        if (password === "")
            return toast({
                variant: "destructive",
                title: "Password Cannot be Empty",
            });

        const data = {
            username: username,
            password: password,
        };

        const response = await fetch(
            "https://student-dashboard-ssei.onrender.com/api/auth/fetch",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        if (response.ok) {
            toast({
                variant: "success",
                title: "Student Found in the Database",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Error Occured.",
                description: "Username or Password is incorrect."
            });
            return
        }
        const fetchedStudent = response.json();
        fetchedStudent
            .then((obj) => {
                setStudent(obj);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        focusInput();
    }, [])


    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
        >
            <Navbar />
            <div className="sm:flex sm:mx-0 lg:flex-row lg:mx-48">
                <Card className="w-[430px] mr-auto ml-auto mt-8">
                    <CardHeader>
                        <CardTitle>Fetch Student</CardTitle>
                        <CardDescription>
                            Fetch details of a student from the Database.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Username</Label>
                                    <Input

                                        placeholder="Enter Your Username"
                                        onChange={(e) => setUsername(e.target.value)}
                                        ref={inputRef}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        placeholder="Enter Your Password"
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <Button type="submit">Submit</Button>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center"></CardFooter>
                </Card>

                {student && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 40 }}
                        transition={{ duration: 0.5 }}
                        className="w-[430px] mr-auto ml-auto mt-8 "
                    >
                        <Card className="hover:scale-110 transition-scale-110 duration-300 ease-in-out">
                            <CardHeader>
                                <CardTitle>Student Found</CardTitle>
                                <CardDescription>
                                    Fetched details of student from the Database.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid w-full items-center">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name" className="text-lg">
                                            Full Name : {student.fullname}
                                        </Label>
                                        <Label htmlFor="name" className="text-lg">
                                            Username : {student.username}
                                        </Label>
                                        <Label htmlFor="name" className="text-lg">
                                            Email : {student.email}
                                        </Label>
                                        <Label htmlFor="name" className="text-lg">
                                            Course : {student.course}
                                        </Label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
