"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react"
import { Logo } from "@/components/logo"
import { supabase } from '@/lib/supabaseClient'

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)
    if (!agreeToTerms) {
      setError('You must agree to the terms.')
      setLoading(false)
      return
    }
    const { email, password } = formData
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
    } else {
      setSuccess('Signup successful! Please check your email to confirm your account.')
      // Redirect to login after successful signup
      setTimeout(() => {
        window.location.href = '/login'
      }, 3000)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block">
            <Logo size="lg" />
          </Link>
        </div>

        <Card className="card-minimal shadow-none border-2">
          <CardHeader className="text-center space-y-3">
            <CardTitle className="text-display text-2xl font-bold">Join TripSage</CardTitle>
            <p className="text-muted-foreground">Start your journey with fellow travelers</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Signup form starts here */}

            {/* Signup Form */}
            <form className="space-y-4" onSubmit={handleSignup}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-semibold">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="input-with-icon pl-12 pr-4"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-semibold">
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="input-minimal"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="input-with-icon pl-12 pr-4"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="input-with-icon pl-12 pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-semibold">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="input-with-icon pl-12 pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={agreeToTerms} onCheckedChange={(checked) => setAgreeToTerms(checked === true)} />
                <label
                  htmlFor="terms"
                  className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-foreground hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-foreground hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button type="submit" className="w-full btn-minimal" size="lg" disabled={!agreeToTerms || loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
            {error && <div className="text-red-500 text-sm text-center mt-2">{error}</div>}
            {success && <div className="text-green-600 text-sm text-center mt-2">{success}</div>}

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/login" className="text-foreground hover:underline font-semibold">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
