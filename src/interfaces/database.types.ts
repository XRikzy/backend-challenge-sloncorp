export interface User {
  id: string;
  email: string;
  password: string;
  full_name?: string;
  created_at: string;
  updated_at: string;
}

export interface Site {
  id: string;
  name: string;
  image?: string;
  address: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  site_id: string;
  name: string;
  phone?: string;
  phone_home?: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

export interface SiteResponse {
  id: string;
  name: string;
  image?: string;
  address: string;
  contacts: ContactResponse[];
}

export interface ContactResponse {
  name: string;
  phone?: string;
  phone_home?: string;
  email?: string;
}
