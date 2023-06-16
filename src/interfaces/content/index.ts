import { PremiumAccessInterface } from 'interfaces/premium-access';
import { UserInterface } from 'interfaces/user';
import { ProviderInterface } from 'interfaces/provider';
import { GetQueryInterface } from 'interfaces';

export interface ContentInterface {
  id?: string;
  title: string;
  description?: string;
  video_url: string;
  is_premium?: boolean;
  content_provider_id: string;
  provider_id: string;
  created_at?: any;
  updated_at?: any;
  premium_access?: PremiumAccessInterface[];
  user?: UserInterface;
  provider?: ProviderInterface;
  _count?: {
    premium_access?: number;
  };
}

export interface ContentGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  video_url?: string;
  content_provider_id?: string;
  provider_id?: string;
}
