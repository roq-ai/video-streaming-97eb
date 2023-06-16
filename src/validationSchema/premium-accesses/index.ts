import * as yup from 'yup';

export const premiumAccessValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  content_id: yup.string().nullable().required(),
});
