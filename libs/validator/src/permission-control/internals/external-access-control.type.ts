export interface AcPermission {
  role: string;
  resource: string;
  action:
    | 'read:any'
    | 'create:any'
    | 'update:any'
    | 'delete:any'
    | 'read:own'
    | 'update:own'
    | 'delete:own';
  attributes: string;
}
