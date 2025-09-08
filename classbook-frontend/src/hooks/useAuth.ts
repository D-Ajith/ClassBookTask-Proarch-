import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types';

export const useLogin = () => {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginRequest) =>
      api.post<AuthResponse>('/auth/login', credentials).then(res => res.data),
    onSuccess: (data: AuthResponse) => {
      login(data.accessToken, data.user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useRegister = () => {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: RegisterRequest) =>
      api.post<AuthResponse>('/auth/register', credentials).then(res => res.data),
    onSuccess: (data: AuthResponse) => {
      login(data.accessToken, data.user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuth();
  return () => {
    logout();
  };
};