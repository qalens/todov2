'use client'
import { login } from "@/services/user";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useState } from "react";
import { redirect } from 'next/navigation'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return <Card className="w-[400px] mx-auto">
        <CardHeader>Login</CardHeader>
        <CardBody className="flex flex-col gap-2">
            <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </CardBody>
        <CardFooter className="flex flex-row items-center justify-right gap-2">
            <Link href="/signup"><Button>Sign Up</Button></Link>
            <Button className="grow" color="primary" onPress={() => {
                login(username, password).then(token => {
                    const expiryDate = new Date();
                    expiryDate.setDate(expiryDate.getDate() + 7); // Expires in 7 days
                    document.cookie = `token=${token}; path=/; secure; samesite=strict; expires=${expiryDate.toUTCString()}`;
                    return true
                }).catch(e => {
                    alert(e)
                    return false
                }).then((success)=>{
                    if (success)
                        redirect('/todo')
                })
            }}>Login</Button>
        </CardFooter>
    </Card>
}