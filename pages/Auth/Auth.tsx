import React from "react";
import { NextPage } from "next";

import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import { Field, FieldProps, Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";

import { useAuth } from "../../context/AuthContext";

import AuthStyles from "./Auth.module.scss";

const signInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required."),
  password: Yup.string()
    .min(6, "Password is too short - should be 6 chars minimum")
    .required("Password is required."),
});

const signUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required."),
  password: Yup.string()
    .min(6, "Password is too short - should be 6 chars minimum")
    .required("Password is required."),
  confirmPassword: Yup.string().required("Confirm password is required."),
});

const Auth: NextPage = () => {
  const { signInWithGoogle, logout, loading, user } = useAuth();

  const [signInValues /*setSignInValues*/] = React.useState<FormikValues>({
    email: "",
    password: "",
  });

  const [signUpValues /*setSignUpValues*/] = React.useState<FormikValues>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <Flex as="section" h={"100%"} minH={450} alignItems={"center"} className={`${AuthStyles.Auth}`}>
      <Box className={`${AuthStyles.Auth__kite}`}>
        <Image src="kite-bg-01.svg" />
      </Box>

      <Grid
        w={"100%"}
        templateColumns={{
          md: "repeat(1, .5fr)",
          base: "repeat(1, 1fr)",
        }}
        alignItems={"center"}
        justifyContent={"end"}
        px={3}
      >
        <GridItem w={"100%"}>
          <Box className={`${AuthStyles.Auth__formWrapper}`} mx="auto">
            <Tabs isFitted colorScheme={"green"}>
              <TabList>
                <Tab>Sign in</Tab>
                <Tab>Sign up</Tab>
              </TabList>

              <TabPanels>
                <TabPanel px={0} pb={0}>
                  <Formik
                    initialValues={signInValues}
                    validationSchema={signInSchema}
                    onSubmit={console.log}
                  >
                    {({ touched, errors }) => {
                      return (
                        <Form>
                          <Field name="email">
                            {({ field }: FieldProps) => (
                              <FormControl isInvalid={!!(errors.email && touched.email)} mb={3}>
                                <FormLabel>Email</FormLabel>
                                <Input {...field} type={"email"} placeholder="abc@mail.com" />
                                <FormErrorMessage>{errors.email as string}</FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>

                          <Field name="password">
                            {({ field }: FieldProps) => (
                              <FormControl
                                isInvalid={!!(errors.password && touched.password)}
                                mb={3}
                              >
                                <FormLabel>Password</FormLabel>
                                <Input {...field} type={"password"} />
                                <FormErrorMessage>{errors.password as string}</FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>

                          <ButtonGroup w="100%" justifyContent={"end"}>
                            <Button type="submit" colorScheme="green">
                              Sign in
                            </Button>
                          </ButtonGroup>
                        </Form>
                      );
                    }}
                  </Formik>
                </TabPanel>

                <TabPanel px={0} pb={0}>
                  <Formik
                    initialValues={signUpValues}
                    validationSchema={signUpSchema}
                    onSubmit={console.log}
                  >
                    {({ touched, errors }) => {
                      return (
                        <Form>
                          <Field name="email">
                            {({ field }: FieldProps) => (
                              <FormControl isInvalid={!!(errors.email && touched.email)} mb={3}>
                                <FormLabel>Email</FormLabel>
                                <Input {...field} type={"email"} placeholder="abc@mail.com" />
                                <FormErrorMessage>{errors.email as string}</FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>

                          <Field name="password">
                            {({ field }: FieldProps) => (
                              <FormControl
                                isInvalid={!!(errors.password && touched.password)}
                                mb={3}
                              >
                                <FormLabel>Password</FormLabel>
                                <Input {...field} type={"password"} />
                                <FormErrorMessage>{errors.password as string}</FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>

                          <Field name="confirmPassword">
                            {({ field }: FieldProps) => (
                              <FormControl
                                isInvalid={!!(errors.confirmPassword && touched.confirmPassword)}
                                mb={3}
                              >
                                <FormLabel>Confirm password</FormLabel>
                                <Input {...field} type={"password"} />
                                <FormErrorMessage>
                                  {errors.confirmPassword as string}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>

                          <ButtonGroup w="100%" justifyContent={"end"}>
                            <Button colorScheme="green">Sign up</Button>
                          </ButtonGroup>
                        </Form>
                      );
                    }}
                  </Formik>
                </TabPanel>
              </TabPanels>
            </Tabs>

            <Divider my={5} />
          </Box>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Auth;
