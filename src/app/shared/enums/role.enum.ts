export enum RoleEnum {
  ADMIN = 'ADMIN',
  SELLER = 'SELLER'
}

export enum RoleDescriptionEnum {
  ADMIN = 'Administrador',
  SELLER = 'Vendedor'
}

export const RoleOptionsEnum = [
  { label: RoleDescriptionEnum.ADMIN, value: RoleEnum.ADMIN },
  { label: RoleDescriptionEnum.SELLER, value: RoleEnum.SELLER }
];
