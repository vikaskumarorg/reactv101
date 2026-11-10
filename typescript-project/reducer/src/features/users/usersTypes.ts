export interface User {
   id: string;
  name: string;
  email?: string; // Kept optional as it is missing from the object payload but present in your first example
  backgroundImageUrl: string | null;
  imageUrl: string;
  tenantShortName: string;
  timeZone: string;
}

export interface UsersStateCollection {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const sampleUser: User = { 
    id:'12312312dfdsfsdfs34242',
  name: 'Geogia school board association',
  email: '', // Kept optional as it is missing from the object payload but present in your first example
  backgroundImageUrl: null,
  imageUrl: '',
  tenantShortName: 'Geogia school board association',
  timeZone: ''
}