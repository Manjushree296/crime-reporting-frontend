import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Input, Button, Link, Card, CardBody, CardHeader } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useForm } from "react-hook-form";
import { loginUser, getCurrentUser } from '../services/api';
import toast from 'react-hot-toast';

const LoginForm  = ()=>{


  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Form submitted with data:", data);
    try {
      const loginResponse = await loginUser(data.username, data.password);
      // Fetch current user to get role
      const userResponse = await getCurrentUser();

      toast.success(`Welcome ${userResponse.data.fullName}!`)

      console.log("User response:", userResponse.data);
      const user = userResponse.data;
      if (!user || !user.role) {
        throw new Error("User role not found in response");
      }

      localStorage.setItem("userRole", user.role);
      if (user.role === "CITIZEN") {
        navigate("/dashboard/citizen");
      } else if (user.role === "POLICE") {
        navigate("/dashboard/officer");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.message || "Login failed. Please check your username and password.");
    }
  };

  

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="w-full shadow-lg">
          <CardHeader className="flex flex-col gap-1 items-center pb-6">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
            >
              <Icon icon="lucide:shield-alert" className="text-primary-500 text-4xl" />
            </motion.div>
            <h1 className="text-2xl font-semibold">Crime Report System</h1>
            <p className="text-default-500">Sign in to your account</p>
          </CardHeader>
          <CardBody>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Input
                  label="Username"
                  placeholder="Enter your username"
                
                  {...register("username")}
                  type='text'
                  startContent={<Icon icon="lucide:user" className="text-default-400" />}
                  isRequired
                  variant="bordered"
                />
              </motion.div>

              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Input
                  label="Password"
                  placeholder="Enter your password"
                 
                  {...register("password")}
                  type="password"
                  startContent={<Icon icon="lucide:lock" className="text-default-400" />}
                  isRequired
                  variant="bordered"
                />
              </motion.div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button disabled={isSubmitting} color="primary" type="submit" className="mt-4 w-full shadow-md" >
                  {isSubmitting?(<>"Logging in..." <Icon icon="line-md:loading-twotone-loop" className="animate-spin" /> </>):"Sign In"}
                </Button>
              </motion.div>

              <motion.div
                className="text-center text-sm mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span className="text-default-500">Don't have an account? </span>
                <Link as={RouterLink} to="/signup" color="primary">
                  Sign up
                </Link>
              </motion.div>
            </form>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}

export default LoginForm;
