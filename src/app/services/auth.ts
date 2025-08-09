export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_AUTH_LOGIN_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important: This ensures cookies are sent/received
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.json().catch(() => ({}));
      return { 
        success: false, 
        message: errorData.message || 'Invalid credentials' 
      };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      message: 'Network error. Please try again.' 
    };
  }
}

export async function logout(): Promise<void> {
  try {
    await fetch(process.env.NEXT_PUBLIC_API_AUTH_LOGOUT_URL || '/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error) {
    console.error('Logout error:', error);
  }
  // Clear any client-side session data if needed
  window.location.href = '/login';
}

export function checkAuthStatus(): boolean {
  // Check if JSESSIONID cookie exists
  if (typeof document !== 'undefined') {
    return document.cookie.includes('JSESSIONID');
  }
  return false;
}
