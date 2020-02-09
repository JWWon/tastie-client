export const generateEntity = (entity: string) => ({
  REQUEST: `${entity}_REQUEST`,
  SUCCESS: `${entity}_SUCCESS`,
  FAILURE: `${entity}_FALIURE`,
});
