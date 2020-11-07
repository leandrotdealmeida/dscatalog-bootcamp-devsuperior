import ButtonIcon from 'core/components/ButtonIcon';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthCard from '../Card';
import './styles.scss';
import { makeLogin } from 'core/utils/request';

type FormData = {
    username: string;
    password: string;
}

const Login = () => {
    const { register, handleSubmit } = useForm<FormData>(); // initialize the hook
    const [hasError, setHasError] = useState(false);

    const onSubmit = (data: FormData) => {
        console.log(data);
        makeLogin(data)
            .then(response => {
                setHasError(false);
            })
            .catch(() => {
                setHasError(true);
            })
    };

    return (
        <AuthCard title="login">

            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    className="form-control input-base margin-bottom-30"
                    placeholder="Email"
                    name="username"
                    ref={register({ required: true })}
                />

                <input
                    type="password"
                    className="form-control input-base"
                    placeholder="Senha"
                    name="password"
                    ref={register({ required: true })}
                />
                <Link to="/admin/auth/recover" className="login-link-recover">
                    Esqueci a senha?
                </Link>
                {hasError && (
                    <div className="alert alert-danger mt-5" role="alert" >
                        Usuário ou senhas inválidos!
                    </div>)}
                <div className="login-submit">
                    <ButtonIcon text="logar" />
                </div>
                <div className="text-center">
                    <span className="not-registered">
                        Não tem cadastro?
                    </span>
                    <Link to="/admin/auth/register" className="login-link-register">
                        CADASTRAR
                    </Link>
                </div>

            </form>

        </AuthCard>
    )

}


export default Login;