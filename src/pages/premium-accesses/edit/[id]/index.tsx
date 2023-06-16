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
import { getPremiumAccessById, updatePremiumAccessById } from 'apiSdk/premium-accesses';
import { Error } from 'components/error';
import { premiumAccessValidationSchema } from 'validationSchema/premium-accesses';
import { PremiumAccessInterface } from 'interfaces/premium-access';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { ContentInterface } from 'interfaces/content';
import { getUsers } from 'apiSdk/users';
import { getContents } from 'apiSdk/contents';

function PremiumAccessEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PremiumAccessInterface>(
    () => (id ? `/premium-accesses/${id}` : null),
    () => getPremiumAccessById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PremiumAccessInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePremiumAccessById(id, values);
      mutate(updated);
      resetForm();
      router.push('/premium-accesses');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<PremiumAccessInterface>({
    initialValues: data,
    validationSchema: premiumAccessValidationSchema,
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
            Edit Premium Access
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
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <AsyncSelect<ContentInterface>
              formik={formik}
              name={'content_id'}
              label={'Select Content'}
              placeholder={'Select Content'}
              fetcher={getContents}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.title}
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
  entity: 'premium_access',
  operation: AccessOperationEnum.UPDATE,
})(PremiumAccessEditPage);
