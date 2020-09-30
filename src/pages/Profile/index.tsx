import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth, User } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Avatar } from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ProfileFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Obrigatório'),
          email: Yup.string().required('Obrigatório').email('E-mail inválido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().min(6, 'Mínimo 6 caracteres').required(),
            otherwise: Yup.string()
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().min(6, 'Mínimo 6 caracteres').required(),
              otherwise: Yup.string()
            })
            .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta')
        });

        await schema.validate(data, {
          abortEarly: false
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation
        } = data;

        const updatedData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation
              }
            : {})
        };

        const response = await api.put<User>('/profile', updatedData);

        history.push('/dashboard');
        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description: 'Os dados do seu perfil foram atualizados com sucesso!'
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Falha na atualização do perfil',
          description:
            'Ocorreu um erro ao atualizar os dados do seu perfil. Tente novamente...'
        });
        console.error(err);
      }
    },
    [addToast, history, updateUser]
  );

  const handleAvatarChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        const data = new FormData();
        data.append('avatar', event.target.files[0]);
        api.patch<User>('/users/avatar', data).then(response => {
          addToast({
            type: 'success',
            title: 'Avatar atualizado!'
          });
          updateUser(response.data);
        });
      }
    },
    [addToast, updateUser]
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
        >
          <Avatar>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </Avatar>
          <h1>Meu perfil</h1>
          <Input name="name" type="text" placeholder="Nome" icon={FiUser} />
          <Input name="email" type="text" placeholder="E-mail" icon={FiMail} />
          <Input
            name="old_password"
            type="password"
            placeholder="Senha atual"
            icon={FiLock}
            containerStyle={{ marginTop: '24px' }}
          />
          <Input
            name="password"
            type="password"
            placeholder="Nova senha"
            icon={FiLock}
          />
          <Input
            name="password_confirmation"
            type="password"
            placeholder="Confirmar senha"
            icon={FiLock}
          />
          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
