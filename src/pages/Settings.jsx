import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import RoleSelect from '../components/RoleSelect';
import useProfile from '../hooks/useProfile';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserProfile } from '../api/api';
import { useDispatch } from 'react-redux';
import { addToast } from '../store/toastSlice';

const Settings = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { data: user } = useProfile();

  const { register, watch, handleSubmit, formState: { errors }, setValue, reset } = useForm({ defaultValues: {
    name: '',
    email: '',
    role: '',
    password: ''
  }});

  console.log('Usar', watch('name'));
  const { mutate, isPending } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(['me']);
      dispatch(addToast({ message: 'Profile updated', type: 'success' }));
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {

    if (user) {
      reset({
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || '',
        password: ''
      });
    }
  }, [user, reset]);


  const onSubmit = (data) => mutate(data);

  const roles = [
    { value: 'admin', title: 'Admin' },
    { value: 'user', title: 'User' }
  ];

  return (
      <div className="">
        <Breadcrumb pageName="Settings" />
        <div className="flex justify-center mx-auto max-w-6xl">
          <div className="w-full">
            <div className="grid gap-8">
              <div className="col-span-5 xl:col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Personal Information
                    </h3>
                  </div>
                  <div className="p-7">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/2"> {/* Increase width to 1/2 of the row */}
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="name"
                          >
                            Full Name
                          </label>
                          <div className="relative">
                            <input
                              {...register('name', { required: 'Full name is required' })}
                              className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="text"
                              id="name"
                              placeholder="Name"
                            />
                            {errors.name && (
                              <span className="text-red-500 text-sm">{errors.name.message}</span>
                            )}
                          </div>
                        </div>

                        {/* Adjust Role Width */}
                        <div className="w-full sm:w-1/2"> {/* Increase width to 1/2 of the row */}
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="role"
                          >
                            Role
                          </label>
                          <RoleSelect
                            value={user?.role} // Default to user role
                            onChange={(selectedRole) => setValue('role', selectedRole)}
                            options={roles}
                          />
                          {errors.role && (
                            <span className="text-red-500 text-sm">{errors.role.message}</span>
                          )}
                        </div>
                      </div>

                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="email"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            {...register('email', { 
                              required: 'Email is required',
                              pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Invalid email format'
                              }
                            })}  
                            className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            id="email"
                            type="email"
                            placeholder="Email"
                          />
                          {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email.message}</span>
                          )}
                        </div>
                      </div>

                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <input
                          {...register('password', { 
                            minLength: { value: 6, message: 'Password must be at least 6 characters long' }
                          })}
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="password"
                          type="password"
                          placeholder="Password"
                        />
                        {errors.password && (
                          <span className="text-red-500 text-sm">{errors.password.message}</span>
                        )}
                      </div>

                      <div className="flex justify-end gap-4.5">
                        <button
                          disabled={isPending}
                          type="button"
                          className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          disabled={isPending}
                          type="submit"
                          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Settings;
