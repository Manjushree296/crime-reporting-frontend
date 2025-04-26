import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Input,
  Button,
  Link,
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../services/api';

const userTypes = [
  { label: 'Citizen', value: 'CITIZEN' },
  { label: 'Police', value: 'POLICE' },
];

const SignupForm = () => {
  const { register, control, handleSubmit, formState: { errors }, setError } = useForm({
    defaultValues: {
      fullName: '',
      username: '',
      password: '',
      address: '',
      phoneNumber: '',
      userType: '',
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const userData = {
      username: data.username,
      fullName: data.fullName,
      password: data.password,
      address: data.address || null,
      phoneNumber: data.phoneNumber || null,
      role: data.userType,
    };

    try {
      const response = await registerUser(userData);
      console.log('Registration response:', response.status, response.data);
      toast.success('Registration successful! Please log in.');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error.response?.status, error.response?.data, error.message);
      if (error.response?.data) {
        const { field, error: message } = error.response.data;
        setError(field, { type: 'manual', message });
        toast.error(message);
      } else {
        setError('general', { type: 'manual', message: 'Registration failed. Please try again.' });
        toast.error('Registration failed. Please try again.');
      }
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
            <h1 className="text-2xl font-semibold">Create Account</h1>
            <p className="text-default-500">Join the Crime Report System</p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm text-center"
                >
                  {errors.general.message}
                </motion.div>
              )}
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  {...register('fullName', { required: 'Full name is required' })}
                  startContent={<Icon icon="lucide:user" className="text-default-400" />}
                  variant="bordered"
                  color={errors.fullName ? 'danger' : 'default'}
                  errorMessage={errors.fullName?.message}
                  isRequired
                />
              </motion.div>

              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Input
                  label="Username"
                  placeholder="Choose a username"
                  {...register('username', { required: 'Username is required' })}
                  startContent={<Icon icon="lucide:at-sign" className="text-default-400" />}
                  variant="bordered"
                  color={errors.username ? 'danger' : 'default'}
                  errorMessage={errors.username?.message}
                  isRequired
                />
              </motion.div>

              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Input
                  label="Password"
                  placeholder="Create a password"
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  startContent={<Icon icon="lucide:lock" className="text-default-400" />}
                  variant="bordered"
                  color={errors.password ? 'danger' : 'default'}
                  errorMessage={errors.password?.message}
                  isRequired
                />
              </motion.div>

              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Input
                  label="Address"
                  placeholder="Enter your address"
                  {...register('address', { required: 'Address is required' })}
                  startContent={<Icon icon="lucide:map-pin" className="text-default-400" />}
                  variant="bordered"
                  color={errors.address ? 'danger' : 'default'}
                  errorMessage={errors.address?.message}
                  isRequired
                />
              </motion.div>

              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Input
                  label="Phone Number"
                  placeholder="Enter your 10-digit phone number"
                  type="tel"
                  {...register('phoneNumber', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^\d{10}$/,
                      message: 'Please enter a valid 10-digit phone number',
                    },
                  })}
                  startContent={<Icon icon="lucide:phone" className="text-default-400" />}
                  description="Format: 1234567890"
                  variant="bordered"
                  color={errors.phoneNumber ? 'danger' : 'default'}
                  errorMessage={errors.phoneNumber?.message}
                  isRequired
                />
              </motion.div>

              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Controller
                  name="userType"
                  control={control}
                  rules={{ required: 'User type is required' }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label="User Type"
                      placeholder="Select your role"
                      selectedKeys={value ? new Set([value]) : new Set()}
                      onSelectionChange={(keys) => {
                        const selectedValue = Array.from(keys)[0] || '';
                        onChange(selectedValue);
                      }}
                      variant="bordered"
                      color={errors.userType ? 'danger' : 'default'}
                      errorMessage={errors.userType?.message}
                      isRequired
                    >
                      {userTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <Button color="primary" type="submit" className="mt-4 w-full shadow-md">
                  Create Account
                </Button>
              </motion.div>

              <motion.div
                className="text-center text-sm mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                <span className="text-default-500">Already have an account? </span>
                <Link as={RouterLink} to="/" color="primary">
                  Sign in
                </Link>
              </motion.div>
            </form>
          </CardBody>
        </Card>
      </motion.div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default SignupForm;