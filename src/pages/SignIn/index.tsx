import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { Form } from '@unform/web';

import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => {
  function handleSubmit(data: Record<string, unknown>): void {
    console.info(data);
  }

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <Form onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input name="email" type="text" placeholder="E-mail" icon={FiMail} />
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            icon={FiLock}
          />
          <Button type="submit">Entrar</Button>
          <a href="forgot">Esqueci minha senha</a>
        </Form>
        <a href="register">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
