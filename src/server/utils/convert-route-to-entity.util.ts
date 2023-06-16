const mapping: Record<string, string> = {
  contents: 'content',
  'premium-accesses': 'premium_access',
  providers: 'provider',
  users: 'user',
  'user-providers': 'user_provider',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
