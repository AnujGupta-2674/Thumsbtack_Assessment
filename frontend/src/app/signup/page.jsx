"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/actions/auth.actions";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import Link from "next/link";

export default function SignupPage() {

  const dispatch = useDispatch();
  const router = useRouter();

  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  /**
   * Redirect user if already logged in
   */
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/dashboard");
    }

  }, [router]);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const result = await dispatch(signupUser(form));

    if (result.meta.requestStatus === "fulfilled") {

      localStorage.setItem("token", result.payload.token);

      toast.success("Signup successful! Welcome 🎉");

      router.push("/dashboard");
    }

    if (result.meta.requestStatus === "rejected") {

      toast.error(result.payload?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      <div className="hidden md:flex items-center justify-center bg-muted p-10">
        <div className="max-w-md text-center space-y-6">
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
            alt="books"
            className="rounded-xl shadow-lg"
          />

          <blockquote className="text-lg italic text-muted-foreground">
            “A reader lives a thousand lives before he dies.”
          </blockquote>

          <p className="text-sm text-muted-foreground">
            — George R.R. Martin
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Create Account
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  name="name"
                  placeholder="John Doe"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                />
              </div>

              <Button className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Sign Up"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Login
                </Link>
              </p>

            </form>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}