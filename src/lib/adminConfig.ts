
interface AdminCredentials {
  email: string;
  password: string;
}

export class AdminService {
  private static getAdminCredentials(): AdminCredentials[] {
    try {
      const credentialsEnv = import.meta.env.VITE_ADMIN_CREDENTIALS;
      
      if (credentialsEnv) {
        const parsed = JSON.parse(credentialsEnv);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
      
      // Fallback to single admin format
      const email = import.meta.env.VITE_ADMIN_EMAIL;
      const password = import.meta.env.VITE_ADMIN_PASSWORD;
      
      if (email && password) {
        return [{ email, password }];
      }
      
      return [];
    } catch (error) {
      console.error('Error parsing admin credentials:', error);
      return [];
    }
  }

  static validateAdmin(email: string, password: string): boolean {
    const admins = this.getAdminCredentials();
    return admins.some(admin => admin.email === email && admin.password === password);
  }

  static getAdminEmails(): string[] {
    const admins = this.getAdminCredentials();
    return admins.map(admin => admin.email);
  }

  static isValidAdminEmail(email: string): boolean {
    const adminEmails = this.getAdminEmails();
    return adminEmails.includes(email);
  }
}
