/* eslint-disable no-extra-boolean-cast */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable padded-blocks */

import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import cn from "classnames";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "../routes";
import useAuth from "../hooks/index.jsx";
import { loginUser, signupUser, selectors } from "../slices/loginSlice.js";

const SingUpPage = () => {
  const [successAuth, setSuccessAuth] = useState(' ');
  const ref = useRef(null);
  const { t } = useTranslation();

  const navigation = useNavigate();
  const auth = useAuth();

  const signUpSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "От 3 до 20 символов")
      .max(20, "До 20 символов"),
    password: Yup.string()
      .min(6, "Не менее 6 символов")
      .max(25, "До 25 символов"),
    confirm: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Пароли должны совпадать",
    ),
  });

  const f = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirm: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        const { data } = await axios.post(routes.signupPath(), { username, password });
        localStorage.setItem('user', JSON.stringify(data));
        auth.logIn();
        setSuccessAuth(true);
        navigation('/', { replace: true });
      } catch (e) {
        setSuccessAuth(false);
      }
    },
  });

  return (
    <div className="h-100">
      <div className="d-flex flex-column h-100">
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center"></div>
                  <Form
                    className="col-12 col-md-6 mt-3 mt-mb-0"
                    onSubmit={f.handleSubmit}
                  >
                    <h1 className="text-center mb-4">{t('signup.title')}</h1>
                    <Form.Group
                      className="form-floating mb-3"
                      controlId="formBasicEmail"
                    >
                      <FloatingLabel
                        controlId="username"
                        label={t('signup.username')}
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder={t('signup.username')}
                          required
                          onChange={f.handleChange}
                          name="username"
                          className={cn(
                            "form-control",
                            f.errors.username || !successAuth ? "is-invalid" : "valid",
                          )}
                        />
                        {f.errors.username ? (
                          <div className="invalid-tooltip">
                            {f.errors.username}
                          </div>
                        ) : null}
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group
                      className="form-floating mb-3"
                      controlId="formBasicPassword"
                    >
                      <FloatingLabel
                        controlId="password"
                        label={t('signup.password')}
                        className="mb-3"
                        type="password"
                      >
                        <Form.Control
                          type="password"
                          required
                          placeholder={t('signup.password')}
                          name="password"
                          onChange={f.handleChange}
                          className={cn(
                            "form-control",
                            f.errors.password || !successAuth ? "is-invalid" : "valid",
                          )}
                        />
                        {f.errors.password ? (
                          <div className="invalid-tooltip">
                            {f.errors.password}
                          </div>
                        ) : null}
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group
                      className="form-floating mb-3"
                      controlId="formBasicEmail"
                    >
                      <FloatingLabel
                        controlId="confirm"
                        label={t('signup.confirm_password')}
                        className="mb-3"
                      >
                        <Form.Control
                          type="password"
                          placeholder={t('signup.confirm_password')}
                          required
                          name="confirm"
                          onChange={f.handleChange}
                          className={cn(
                            "form-control",
                            f.errors.confirm || !successAuth ? "is-invalid" : "valid",
                          )}
                        />
                        {f.errors.confirm ? (
                          <div className="invalid-tooltip">
                            {f.errors.confirm}
                          </div>
                        ) : null}
                        {!successAuth ? (
                          <div className="invalid-tooltip">
                            Такой пользователь уже существует
                          </div>
                        ) : null}
                      </FloatingLabel>
                    </Form.Group>
                    <Button
                      variant="primary"
                      className="w-100 mb-3 btn"
                      type="submit"
                    >
                      Зарегистрироваться
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingUpPage;
