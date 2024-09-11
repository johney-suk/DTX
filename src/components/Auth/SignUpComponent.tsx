import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../store/actions/user';
import { SignUp } from '../../store/types/SignUp';
import { Hospital, hospitalOptions, hospitalEmailFormats } from '../../store/types/Hospital';
import './SignUpComponent.css';

interface SignUpFormInputs extends SignUp {}

interface SignUpComponentProps {
  code?: string;  
}

const validationRules = {
  email: {
    required: '이메일을 입력하세요.',
    validate: (value: string) => {
      const [localPart, domainPart] = value.split('@');
      
      if (!localPart.trim()) {
        return '이메일을 입력하세요.';
      }
      
      if (!domainPart || !domainPart.trim()) {
        return '병원을 선택하세요.';
      }
      // 특수문자 고려중
      // const specialCharPattern = /[!#$%^&*()+|~=`{}[\]:";'<>?,/]/;
      // if (specialCharPattern.test(localPart)) {
      //   return '이메일에 특수문자는 사용할 수 없습니다.';
      // }
      return true; 
    },
  },
  password: {
    required: '비밀번호를 입력하세요.',
    minLength: { value: 6, message: '비밀번호는 최소 6자 이상이어야 합니다.' },
  },
  confirmPassword: {
    required: '비밀번호 확인을 입력하세요.',
    validate: (value: string, getValues: () => string) =>
      value === getValues() || '비밀번호가 일치하지 않습니다.',
  },
  userName: {
    required: '사용자 이름을 입력하세요.',
  },
  hospital: {
    required: '병원을 선택하세요.',
  },
};

const SignUpComponent: React.FC<SignUpComponentProps> = ({ code }) => {
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [emailFormat, setEmailFormat] = useState<string>('');
  const [emailPrefix, setEmailPrefix] = useState<string>(''); 
  const [isHospitalSelected, setIsHospitalSelected] = useState<boolean>(false);  

  const { register, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm<SignUpFormInputs>({
    mode: 'onChange',
  });

  const handleHospitalChange = (selectedHospital: Hospital) => {
    if (!selectedHospital) {
      setIsHospitalSelected(false);
      setEmailFormat('');
      setEmailPrefix('')
    }else{
      const emailSuffix = hospitalEmailFormats[selectedHospital];
      setEmailFormat(emailSuffix);
      setIsHospitalSelected(true); 
      const currentEmailPrefix = getValues('email')?.split('@')[0] || '';
      setValue('email', `${currentEmailPrefix}${emailSuffix}`);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailPrefix = e.target.value.split('@')[0];
    setEmailPrefix(emailPrefix);
    setValue('email', `${emailPrefix}${emailFormat}`);
  };

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      const signUpData = {
        ...data,
        code,  
      };
      await dispatch(registerUser(signUpData));
      navigate('/');
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <div className="register-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="input-group">
          <label>병원 명:</label>
          <Controller
            name="hospital"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleHospitalChange(e.target.value as Hospital);
                }}
              >
                <option value="">병원 선택</option>
                {hospitalOptions.map((hospital) => (
                  <option key={hospital.code} value={hospital.code}>
                    {hospital.name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.hospital && <p className="error-message">{errors.hospital.message}</p>}
        </div>

        <div className="input-group">
          <label>이메일:</label>
          <div className="email-container">
            <input
              type="text"
              
              value={emailPrefix}
              disabled={!isHospitalSelected}  
              onChange={handleEmailChange}  
              placeholder="이메일을 입력하세요"
            />
            <span {...register('email', validationRules.email)}  >{emailFormat}</span>
          </div>
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div className="input-group">
          <label>비밀번호:</label>
          <input
            type="password"
            {...register('password', validationRules.password)}
            placeholder="비밀번호를 입력하세요"
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        <div className="input-group">
          <label>비밀번호 확인:</label>
          <input
            type="password"
            {...register('confirmPassword', {
              ...validationRules.confirmPassword,
              validate: (value) =>
                validationRules.confirmPassword.validate(value, () => getValues('password')),
            })}
            placeholder="비밀번호를 다시 입력하세요"
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
        </div>

        <div className="input-group">
          <label>사용자 이름:</label>
          <input
            {...register('userName', validationRules.userName)}
            placeholder="사용자 이름을 입력하세요"
          />
          {errors.userName && <p className="error-message">{errors.userName.message}</p>}
        </div>

        <button type="submit" className="register-button">회원가입</button>
      </form>
    </div>
  );
};

export default SignUpComponent;
