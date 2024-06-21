export interface AuthCredentialsService {
  authCredentials: boolean | null;
  saveCredentials: (ac: boolean) => Promise<void>;
  removeCredentials: () => Promise<void>;
  isLoading: boolean;
}
