// REDUX HELPER
export const copyPayload = <S, A extends {payload: any}>(
  state: S,
  action: A,
) => ({
  ...state,
  ...action.payload,
});
