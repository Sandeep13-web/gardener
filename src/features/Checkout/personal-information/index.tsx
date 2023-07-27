import { IRegister } from '@/interface/register.interface';
import { registerGuestUser } from '@/services/auth.service';
import ButtonLoader from '@/shared/components/btn-loading';
import { generatePassword } from '@/shared/utils/cookies-utils/cookies.utils';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface PersonalInformationProps {
    addressCollapseDisabled: boolean;
    personalInfoSubmitted: boolean;
    setAddressCollapseDisabled: (disabled: boolean) => void;
    setPersonalInfoSubmitted: (disabled: boolean) => void;
    guestUserData: IRegister | null;
  setGuestUserData: (data: IRegister | null) => void;
  };

const PersonalInformation:React.FC<PersonalInformationProps> = ({
    addressCollapseDisabled,
    setAddressCollapseDisabled,
    guestUserData,
    setGuestUserData,
  }) => {
    //Password generated for guest user
    const [generatedPassword, setGeneratedPassword] = useState<string>(''); // Initialize password state as empty string
    const [personalInfoSubmitted, setPersonalInfoSubmitted] = useState(false);
    //Guest Register User
    const { register, handleSubmit: handleSubmitRegisterGuestUser, setValue, formState: { errors }, trigger } = useForm<IRegister>();

    const onSubmitRegisterGuestUser: SubmitHandler<IRegister> = async (data) => {
        const generatedPwd = generatePasswordValue();
        data.password = generatedPwd;
        data.confirm_password = generatedPwd;
        // Set the guest user data in the state
        setGuestUserData(data);
        setPersonalInfoSubmitted(true);
        setAddressCollapseDisabled(false); // Enable the address collapse section after successful submission.
        try {
            await registerGuestUser(data, true);
            setPersonalInfoSubmitted(false);
            // setGuestUserData(data);
        } catch (error) {
            setPersonalInfoSubmitted(false);
            setAddressCollapseDisabled(true);
            console.error('Registration failed:', error);
        }
    };
      // Function to generate and set the initial password value
  const generatePasswordValue = () => {
    if (!generatedPassword) {
      const password = generatePassword(8);
      setGeneratedPassword(password);
      setValue('password', password);
      setValue('confirm_password', password);
      return password;
    }
    return generatedPassword;
  };

    return (
        <>
            <form onSubmit={handleSubmitRegisterGuestUser(onSubmitRegisterGuestUser)}>
                <div className="grid grid-cols-12 gap-4">
                    <div className="flex flex-col col-span-6 mb-[15px]">
                    <label className="label">
                        <span className="label-text">First Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Your First Name"
                        className="px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border rounded-e"
                        {...register('first_name', { required: 'First Name is required' })}
                    />
                    {
                        errors.first_name &&
                        <p className='text-error text-xs leading-[24px] mt-1'>{errors.first_name.message}</p>
                    }
                    </div>

                    <div className="flex flex-col col-span-6 mb-[15px]">
                    <label className="label">
                        <span className="label-text">Last Name</span>
                    </label>
                    <input
                        type="text"
                        {...register("last_name", { required: 'LastName is required.' })}
                        placeholder='Enter Your Last Name'
                        onBlur={() => trigger('last_name')}
                        className="px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border rounded-e"
                    />
                    {
                        errors.last_name &&
                        <p className='text-error text-xs leading-[24px] mt-1'>{errors.last_name.message}</p>
                    }
                    </div>

                    <div className="flex flex-col col-span-6 mb-[15px]">
                    <label className="label">
                        <span className="label-text">Phone Number</span>
                    </label>
                    <input
                        type="text"
                        {...register("mobile_number",
                        {
                            required: "Phone number is required.",
                            pattern: {
                            value: /^[9]\d{9}$/,
                            message: "Phone number must start with 9 and have 10 digits.",
                            }
                        })}
                        onBlur={() => trigger('mobile_number')}
                        placeholder='Enter Your Phone Number'
                        className={`px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border ${errors.mobile_number ? 'border-error' : 'border-gray-350'}`}
                    />
                    {
                        errors.mobile_number &&
                        <p className='text-error text-xs leading-[24px] mt-1'>{errors.mobile_number.message}</p>
                    }
                    </div>

                    <div className="flex flex-col col-span-6 mb-[15px]">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="text"
                        {...register("email", {
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address.",
                        },
                        })}
                        placeholder='Enter Your Email'
                        className="px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border rounded-e"
                    />
                    {
                        errors.email &&
                        <p className='text-error text-xs leading-[24px] mt-1'>{errors.email.message}</p>
                    }
                    </div>
                    <div className="col-span-12 text-right">
                        <button
                          type="submit"
                          className="bg-primary text-base-100 font-bold py-[10px] px-[22px] uppercase rounded-full hover:bg-slate-850"
                        >
                          Next
                        {
                            personalInfoSubmitted &&
                            <ButtonLoader />
                          }
                        </button>
                      </div>
                    
                </div>

            </form>
        </>
        
    )
}

export default PersonalInformation