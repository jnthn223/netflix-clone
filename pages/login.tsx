import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import useAuth from '../hooks/useAuth'

interface Inputs {
	email: string
	password: string
}

function Login() {
	const [isLogin, setIsLogin] = useState(false)
	const { signIn, signUp } = useAuth()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()
	const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
		if (isLogin) {
			await signIn(email, password)
		} else {
			await signUp(email, password)
		}
		// setIsLogin(false)
	}

	return (
		<div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
			<Head>
				<title>Netflix</title>
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
			</Head>
			<Image
				src="https://rb.gy/p2hphi"
				layout="fill"
				className="-z-10 !hidden opacity-60 sm:!inline"
				objectFit="cover"
			/>
			<img
				src="https://rb.gy/ulxxee"
				className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
				width={150}
				height={150}
			/>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
			>
				<h1 className="text-4xl font-semibold">Sign In</h1>
				<div className="space-y-4">
					<label className="inline-block w-full">
						<input
							type="email"
							placeholder="Email"
							className="inputBox"
							{...register('email', { required: true })}
						/>
						{errors?.email && (
							<p className="p-1 text-[13px] font-light text-orange-500">
								Please enter a valid email.
							</p>
						)}
					</label>
					<label className="inline-block w-full">
						<input
							type="password"
							placeholder="Password"
							className="inputBox"
							{...register('password', { required: true })}
						/>
						{errors?.password && (
							<p className="p-1 text-[13px] font-light text-orange-500">
								Your password must contain between 4 and 60 characters.
							</p>
						)}
					</label>
				</div>
				<button
					type="submit"
					className="w-full rounded bg-[#e50914] py-3 font-semibold"
					onClick={() => setIsLogin(true)}
				>
					Sign In
				</button>

				<div>
					<span className="text-[gray]">New to Netflix? </span>
					<button className="text-white hover:underline">
						Sign up Now
					</button>
				</div>
			</form>
		</div>
	)
}

export default Login
