import {HttpParams} from "@angular/common/http";

export const PrepareHttpParams = (options?: any) => {
  if (!options) return new HttpParams();
  if (!!options?.unidadesId) {
    const unidadesId = options?.unidadesId || [];
    const filiaisId = options?.filiaisId || [];
    if (unidadesId?.length > 0) {
      options.filiaisId = [...unidadesId, ...filiaisId];
      delete options.unidadesId;
    }
  }
  return Object.keys(options)
    .reduce((params, key) => {
      const value = options[key];
      if (value !== undefined && value !== null && value !== '' && value.length !== 0)
        params = Array.isArray(value) ? params.append(key, value.join(',')) : params.append(key, value);
      return params;
    }, new HttpParams());
};
