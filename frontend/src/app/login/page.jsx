"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/auth.actions";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import Link from "next/link";

export default function LoginPage() {

  const dispatch = useDispatch();
  const router = useRouter();

  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  /**
   * Redirect if user already logged in
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

    const result = await dispatch(loginUser(form));

    if (result.meta.requestStatus === "fulfilled") {

      localStorage.setItem("token", result.payload.token);

      toast.success("Login successful! Welcome back 📚");

      router.push("/dashboard");
    }

    if (result.meta.requestStatus === "rejected") {

      toast.error(result.payload?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      {/* Left Quote Section */}
      <div className="hidden md:flex items-center justify-center bg-muted p-10">
        <div className="max-w-md text-center space-y-6">

          <img
            src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
            alt="reading"
            className="rounded-xl shadow-lg"
          />

          <blockquote className="text-lg italic text-muted-foreground">
            “Once you learn to read, you will be forever free.”
          </blockquote>

          <p className="text-sm text-muted-foreground">
            — Frederick Douglass
          </p>

        </div>
      </div>

      {/* Login Form */}
      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md">

          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Welcome Back
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">

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
                {loading ? "Logging in..." : "Login"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary hover:underline"
                >
                  Signup
                </Link>
              </p>

            </form>
          </CardContent>

        </Card>
      </div>

    </div>
  );
}