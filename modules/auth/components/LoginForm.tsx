"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { useLogin } from "../hooks/useLogin";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller } from "react-hook-form";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    control,
    onSubmit,
  } = useLogin();

  return (
    <Card className="rounded-xl py-10 relative overflow-visible">
      <CardHeader className="px-7 md:px-10 pt-0 pb-5 ">
        <CardTitle className="text-xl">Get Started Now!</CardTitle>
        <CardDescription>
          Please Login to your account to continue
        </CardDescription>
        <img src="/logo.svg" alt="" className=" absolute -top-4 right-4 h-14" />
      </CardHeader>

      <CardContent className="px-7 md:px-10 py-0">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="grid gap-6">
            {/* Email */}
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid gap-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email address</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="email@example.com"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="grid gap-2" data-invalid={fieldState.invalid}>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Link
                      href=""
                      className="ml-auto text-xs text-foreground underline opacity-80"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Remember */}

            <Controller
              name="remember"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="remember-check"
                    />
                    <FieldLabel htmlFor="remember-check">
                      Remember me
                    </FieldLabel>
                  </div>

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Submit */}
            <Field>
              <Button
                type="submit"
                className="mt-4 w-full"
                disabled={isSubmitting}
              >
                {isSubmitting && <Spinner className=" size-3" />}
                Log in
              </Button>
            </Field>
          </FieldGroup>

          <div className="text-center text-xs flex gap-3 justify-center text-muted-foreground">
            Have an account?{" "}
            <Link className=" underline" href="/register">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
