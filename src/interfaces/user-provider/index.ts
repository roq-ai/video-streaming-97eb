import { UserInterface } from 'interfaces/user';
import { ProviderInterface } from 'interfaces/provider';
import { GetQueryInterface } from 'interfaces';

export interface UserProviderInterface {
  id?: string;
  user_id: string;
  provider_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  provider?: ProviderInterface;
  _count?: {};
}

export interface UserProviderGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  provider_id?: string;
}
