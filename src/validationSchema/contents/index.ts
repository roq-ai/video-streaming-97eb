import * as yup from 'yup';

export const contentValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  video_url: yup.string().required(),
  is_premium: yup.boolean().required(),
  content_provider_id: yup.string().nullable().required(),
  provider_id: yup.string().nullable().required(),
});
