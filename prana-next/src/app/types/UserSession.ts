import { Tenant } from '@/app/types/Tenant';
import { User } from '@/app/types/User';

export type UserSession = {
    user: User;
    selectedTenant?: Tenant;
    tenants: Tenant[];
};
