import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import * as z from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import { LoginSchema } from '../schema/login.schema'
import { useLoginMutation } from '../slices/userApi'
import type { RootState } from '../store'
import { setUserInfo } from '../slices/auth'

type FormInputs = z.infer<typeof LoginSchema>

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(LoginSchema),
  })

  const [login, { isLoading }] = useLoginMutation()
  const userInfo = useSelector((state: RootState) => state.auth.userInfo)

  const submit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const res = await login(data).unwrap()
      dispatch(setUserInfo(res))
      reset()
      toast.success("Login successfully")
      if (res.role === "ADMIN") navigate('/admin')
      else navigate('/order')
    } catch (err: any) {
      toast.error(err?.data?.message || err.message)
    }
  }

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "ADMIN") navigate('/admin')
      else navigate('/order')
    }
  }, [navigate, userInfo])

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
      style={{ backgroundImage: "url('src/assets/ec2.webp')" }}
    >
      <div className="bg-black/40 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden">
        
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center text-white">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Welcome to TradeX
          </h2>
          <p className="text-gray-200 text-lg sm:text-xl leading-relaxed">
            TradeX is your go-to platform for buying and selling products seamlessly.
            Our intelligent matching algorithm ensures every transaction is fast, transparent,
            and reliable. Join thousands of satisfied users who trade smarter, not harder.
          </p>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 bg-black/30 backdrop-blur-md flex flex-col justify-center">
          <h3 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Login
          </h3>
          <p className="text-center text-gray-200 mb-6 text-sm">
            Welcome back! Please enter your details.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(submit)}>
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-200">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300/30 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white/20 text-white placeholder-gray-200"
                {...register('email')}
              />
              {errors.email && (
                <span className="text-red-400 text-sm font-medium">{errors.email.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-200">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-300/30 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white/20 text-white placeholder-gray-200"
                {...register('password')}
              />
              {errors.password && (
                <span className="text-red-400 text-sm font-medium">{errors.password.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full text-black bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed py-2.5 px-4 rounded-lg shadow-md transition"
            >
              {isSubmitting || isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-200">
            Don’t have an account?{' '}
            <Link to="/register" className="font-semibold text-indigo-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
