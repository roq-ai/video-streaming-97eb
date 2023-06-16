import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getContentById, updateContentById } from 'apiSdk/contents';
import { Error } from 'components/error';
import { contentValidationSchema } from 'validationSchema/contents';
import { ContentInterface } from 'interfaces/content';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { ProviderInterface } from 'interfaces/provider';
import { getUsers } from 'apiSdk/users';
import { getProviders } from 'apiSdk/providers';

function ContentEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ContentInterface>(
    () => (id ? `/contents/${id}` : null),
    () => getContentById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ContentInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateContentById(id, values);
      mutate(updated);
      resetForm();
      router.push('/contents');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ContentInterface>({
    initialValues: data,
    validationSchema: contentValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Content
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="title" mb="4" isInvalid={!!formik.errors?.title}>
              <FormLabel>Title</FormLabel>
              <Input type="text" name="title" value={formik.values?.title} onChange={formik.handleChange} />
              {formik.errors.title && <FormErrorMessage>{formik.errors?.title}</FormErrorMessage>}
            </FormControl>
            <FormControl id="description" mb="4" isInvalid={!!formik.errors?.description}>
              <FormLabel>Description</FormLabel>
              <Input type="text" name="description" value={formik.values?.description} onChange={formik.handleChange} />
              {formik.errors.description && <FormErrorMessage>{formik.errors?.description}</FormErrorMessage>}
            </FormControl>
            <FormControl id="video_url" mb="4" isInvalid={!!formik.errors?.video_url}>
              <FormLabel>Video Url</FormLabel>
              <Input type="text" name="video_url" value={formik.values?.video_url} onChange={formik.handleChange} />
              {formik.errors.video_url && <FormErrorMessage>{formik.errors?.video_url}</FormErrorMessage>}
            </FormControl>
            <FormControl
              id="is_premium"
              display="flex"
              alignItems="center"
              mb="4"
              isInvalid={!!formik.errors?.is_premium}
            >
              <FormLabel htmlFor="switch-is_premium">Is Premium</FormLabel>
              <Switch
                id="switch-is_premium"
                name="is_premium"
                onChange={formik.handleChange}
                value={formik.values?.is_premium ? 1 : 0}
              />
              {formik.errors?.is_premium && <FormErrorMessage>{formik.errors?.is_premium}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'content_provider_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <AsyncSelect<ProviderInterface>
              formik={formik}
              name={'provider_id'}
              label={'Select Provider'}
              placeholder={'Select Provider'}
              fetcher={getProviders}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'content',
  operation: AccessOperationEnum.UPDATE,
})(ContentEditPage);
