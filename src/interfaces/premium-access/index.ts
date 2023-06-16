import { UserInterface } from 'interfaces/user';
import { ContentInterface } from 'interfaces/content';
import { GetQueryInterface } from 'interfaces';

export interface PremiumAccessInterface {
  id?: string;
  user_id: string;
  content_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  content?: ContentInterface;
  _count?: {};
}

export interface PremiumAccessGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  content_id?: string;
}
