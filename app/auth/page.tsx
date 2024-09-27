"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useRecoilState } from "recoil";
import { signUpInputsAtom } from "@/states/atoms/userAtoms";
import axios from "axios";
import {signIn, useSession} from "next-auth/react"
import { useRouter } from "next/navigation";




export default function Register() {
  const [activeTab, setActiveTab] = useState("login");
  const [signInInputs, setSignInInputs] = useRecoilState(signUpInputsAtom);
  const router = useRouter()

  const handleSignupButton = async () => {
    console.log("commmand reaches handle")
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        signInInputs
      );
      if(response.status===200){
          router.push('/user')
      }
    } catch (e) {
      console.log(e);
    }
  };

    const handlesigninButton = async () => {
      console.log("command reaches signin handler")
          console.log(signInInputs)
         const result = await signIn('credentials',{
          redirect:false,
          email:signInInputs.email,
          password:signInInputs.password
         })
         if(result?.error){
          console.log(result?.error)
         }else{
          router.push('/user')
         }
          }
      
  
  return (
    <div className="flex flex-col  min-h-screen bg-gradient-to-b from-white to-[#f0ebf8]">
      <header className="px-4 lg:px-6 h-14  flex items-center ">
        <Link className="flex items-center justify-center" href="#">
          <span className="ml-2 text-lg font-semibold text-[#8661C1]">
            CYPHER
          </span>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-20 xl:px-14">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
              <div className="flex-1 flex flex-col justify-center items-center text-center lg:text-left lg:items-left space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#8661C1]">
                    Welcome to Cypher
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    A Hub of Creativity and Community for Dancers
                  </p>
                </div>
                <div className="w-full max-w-sm">
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="w-full">
                      <TabsTrigger
                        value="login"
                        className="data-[state=active]:bg-[#8661C1] data-[state=active]:text-white"
                      >
                        Login
                      </TabsTrigger>
                      <TabsTrigger
                        value="signup"
                        className="data-[state=active]:bg-[#8661C1] data-[state=active]:text-white"
                      >
                        Signup
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-[#8661C1]">
                            Login
                          </CardTitle>
                          <CardDescription>
                            Enter your email and password to login to your
                            account.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="m@example.com"
                              onChange={(e) => {
                                setSignInInputs({
                                  email: e.target.value,
                                  password: signInInputs.password,
                                  name: signInInputs.name,
                                });
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" 
                            onChange={(e) => {
                              setSignInInputs({
                                email: signInInputs.email,
                                password: e.target.value,
                                name: signInInputs.name,
                              });
                            }}
                            />
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            onClick={handlesigninButton}
                            className="w-full bg-[#8661C1] hover:bg-[#7551b1]"
                          >
                            Login
                          </Button>
                        </CardFooter>
                      </Card>
                    </TabsContent>
                    <TabsContent value="signup">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-[#8661C1]">
                            Create an account
                          </CardTitle>
                          <CardDescription>
                            Enter your email below to create your account
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="space-y-1">
                            <Label htmlFor="username">Username</Label>
                            <Input
                              id="username"
                              type="text"
                              placeholder="Johndoe"
                              onChange={(e) => {
                                setSignInInputs({
                                  email: signInInputs.email,
                                  name: e.target.value,
                                  password: signInInputs.password,
                                });
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="new-email">Email</Label>
                            <Input
                              id="new-email"
                              type="email"
                              placeholder="m@example.com"
                              onChange={(e) => {
                                setSignInInputs({
                                  email: e.target.value,
                                  name: signInInputs.name,
                                  password: signInInputs.password,
                                });
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="new-password">Password</Label>
                            <Input
                              id="new-password"
                              type="password"
                              onChange={(e) => {
                                setSignInInputs({
                                  email: signInInputs.email,
                                  name: signInInputs.name,
                                  password: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            onClick={handleSignupButton}
                            className="w-full bg-[#8661C1] hover:bg-[#7551b1]"
                          >
                            Sign Up
                          </Button>
                        </CardFooter>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
              <div className="flex-1 w-full max-w-2xl">
                <AspectRatio
                  ratio={16 / 9}
                  className="bg-[#8661C1]/10 overflow-hidden rounded-lg"
                >
                  <Image
                    src=""
                    alt="Platform preview"
                    fill
                    className="object-cover mix-blend-overlay"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}