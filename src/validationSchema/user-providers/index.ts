import * as yup from 'yup';

export const userProviderValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  provider_id: yup.string().nullable().required(),
});
