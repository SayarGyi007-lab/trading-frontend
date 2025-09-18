import * as z from "zod"
import { registerSchmea } from "../schema/register.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useRegisterMutation } from "../slices/userApi"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import bgImage from "../assets/register.jpg"

type formInputs = z.infer<typeof registerSchmea>

function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<formInputs>({
    resolver: zodResolver(registerSchmea)
  })
  const [registerMutation, { isLoading }] = useRegisterMutation()
  const navigate = useNavigate()

  const submit: SubmitHandler<formInputs> = async (data) => {
    try {
      await registerMutation(data).unwrap()
      reset()
      toast.success('Registration successful')
      navigate('/login')
    } catch (err: any) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }} 
    >
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 text-white text-center md:text-left p-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Welcome to TradeX
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed">
            Join TradeX today and start trading with ease. Our platform ensures a
            transparent and efficient marketplace where buyers and sellers can
            connect seamlessly. Sign up now to experience the smart way to trade,
            stay informed, and grow your business.
          </p>
        </div>

        <div className="w-full md:w-1/2 bg-black/50 backdrop-blur-md rounded-2xl p-8 sm:p-12 shadow-xl text-white">
          <h2 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Register
          </h2>
          <p className="text-center text-gray-200 mb-6 text-sm">
            Create your account to get started.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(submit)}>
            <div>
              <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-200">
                Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full border border-gray-300/30 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white/20 text-white placeholder-gray-200"
                {...register('name')}
              />
              {errors.name && <span className="text-red-400 text-sm font-medium">{errors.name.message}</span>}
            </div>

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
              {errors.email && <span className="text-red-400 text-sm font-medium">{errors.email.message}</span>}
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
              {errors.password && <span className="text-red-400 text-sm font-medium">{errors.password.message}</span>}
            </div>

            <div>
              <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-200">
                Phone
              </label>
              <input
                type="phone"
                placeholder="Phone Number"
                className="w-full border border-gray-300/30 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white/20 text-white placeholder-gray-200"
                {...register('phone')}
              />
              {errors.phone && <span className="text-red-400 text-sm font-medium">{errors.phone.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full text-black bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed py-2.5 px-4 rounded-lg shadow-md transition"
            >
              {isSubmitting || isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-200">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
