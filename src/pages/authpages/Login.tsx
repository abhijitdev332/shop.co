import { useForm } from "react-hook-form";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { zodResolver } from "@hookform/resolvers/zod";
import authImg from "../../assets/svgs/auth/frame.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginMutaion } from "../../querys/authQuery";
import { useDispatch } from "react-redux";
import { setUser } from "../../services/store/user/userSlice";
import { loginSchema } from "./schema";
import { useEffect } from "react";

// Define validation schema using Zod
type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginMutaion = LoginMutaion();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    loginMutaion.mutate(data as any);
  };
  useEffect(() => {
    if (loginMutaion.isSuccess) {
      toast.success("Login SuccessFull");
      dispatch(setUser(loginMutaion?.data));
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [loginMutaion.isSuccess]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col sm:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Form */}
        <div className="order-2 sm:order-1 sm:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back! Please enter your credentials to continue.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className={`w-full mt-2 px-4 py-2 border bg-transparent rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-blue-400"
                }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className={`w-full mt-2 px-4 py-2 bg-transparent border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-blue-400"
                }`}
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full flex gap-1 px-4 py-2 btn btn-md btn-primary transition duration-200"
              disabled={loginMutaion.isPending}
            >
              {loginMutaion.isPending && (
                <span className="loading loading-spinner text-white loading-md"></span>
              )}
              <span className="text-white">Login</span>
            </button>
          </form>

          {/* Divider */}
          <div className="mt-4 flex items-center justify-center">
            <span className="text-sm text-gray-600">or login with</span>
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="mt-4  gap-2 flex w-full items-center justify-center px-4 py-2 border rounded-lg hover:bg-gray-100 transition duration-200"
          >
            <FcGoogle fontSize={30} />
            <span className="text-sm text-gray-600">Login with Google</span>
          </button>

          <p className="text-black py-2">
            Don't Have an Account
            <Link to={"/auth/signup"} className="text-blue-500">
              Sign up Now
            </Link>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="order-1 sm:order-2 block sm:w-1/2">
          <img
            src={authImg}
            alt="Login illustration"
            className="object-fill p-1 w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
