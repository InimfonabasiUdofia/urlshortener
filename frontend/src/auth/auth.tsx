// src/services/authService.ts

const AuthService = {
  TOKEN_KEY: 'token' as const,

  // Get token from storage
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  },

  // Save token to storage
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  },

  // Remove token from storage
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    
    if (!token) {
      return false;
    }

    // Check if token is expired
    if (this.isTokenExpired(token)) {
      this.removeToken();
      return false;
    }

    return true;
  },

  // Check if token is expired
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000;
      return Date.now() >= expirationTime;
    } catch (error) {
      return true;
    }
  }
};

export default AuthService;