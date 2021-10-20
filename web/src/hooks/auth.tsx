import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import { api } from '../services/api';

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string
}

type AuthContextData = {
  user: User | null
  signInUrl: string;
  singOut: () => void;
}

type AuthProviderProps = {
  children: React.ReactNode
}

type AxiosResponse = {
  result: {
    token: string;
    user: User;
  }
}

type ProfileResponse = {
  user: User;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User |null>(null);

  async function singIn(github_code: string) {
    const response = await api.post<AxiosResponse>('/signin/authenticate', {
      code: github_code,
    });

    const { token, user: userResponse } = response.data.result;

    localStorage.setItem('@nlw_heat:token', token);

    setUser(userResponse);
  }

  async function singOut() {
    setUser(null);
    localStorage.removeItem('@nlw_heat:token');
  }

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithouCode, code] = url.split('?code=');

      singIn(code).then();

      window.history.pushState({}, '', urlWithouCode);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('@nlw_heat:token');

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<ProfileResponse>('/profile', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        const { user: profile } = response.data;
        setUser(profile);
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      singOut,
      signInUrl: 'https://github.com/login/oauth/authorize?scope=user&client_id=b224abb3597bc5eeb277&redirect_uri=http://localhost:3000',
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
