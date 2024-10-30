import { ENDPOINT, postAPI } from "@api-manager";
import { Loader, ModalPopup } from "@components";
import { IGrievanceForm } from "@interfaces";
import { getIconFromIconName, useDeviceType } from "@utils";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { GriEmailInput, GriMobileInput } from "./FormFields";
import GriTextInput from "./FormFields/GriTextInput";
import styles from "./form.module.scss";

const ErrorMessage = (props: any) => {
  const { message } = props;
  return (
    <>
      <h3>Server Error</h3>
      <br />
      <p>{message}</p>
    </>
  );
};

const GrievanceForm = (props: { compData: IGrievanceForm }) => {
  const { compData } = props;
  const { deviceType } = useDeviceType();
  const [showThankyou, setShowThankyou] = useState(false);
  const [showError, setshowError] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>();

  console.log("data---", compData);

  const addCaptcha = () => {
    if (!document.getElementById("recaptcha")) {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_APP_SITE_KEY}`;
      script.id = "recaptcha";
      document.body.appendChild(script);
      document.querySelector(".grecaptcha-badge")?.classList?.remove("d-none");
    }
  };

  const removeCaptcha = () => {
    if (sessionStorage?.getItem("enquiryInPage") !== "true") {
      document.getElementById("recaptcha")?.remove();
      document.querySelector(".grecaptcha-badge")?.classList?.add("d-none");
    }
  };

  useEffect(() => {
    __RECAPTCHA__ && addCaptcha();

    return () => {
      removeCaptcha();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loading) {
      document.querySelector("body")?.classList.remove("posFixed");
    }
    if (!loading) {
      window.scrollTo(0, -1);
      document.documentElement.style.scrollBehavior = "auto";
    } else {
      document.documentElement.style.scrollBehavior = "smooth";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    setError,
  } = useForm<any>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
  });

  const filterFields = (data: any) => {
    const val: any = {};
    data?.map((currData: any) => {
      val[currData["fieldName"]] = currData;
    });
    return val;
  };

  const onHideError = () => {
    setshowError(false);
  };

  const executeRecaptcha = async () => {
    const token = await new Promise((resolve) => {
      grecaptcha.ready(async () => {
        const token = await grecaptcha.execute(
          process.env.NEXT_PUBLIC_APP_SITE_KEY || "",
          { action: "submit" }
        );
        resolve(token);
      });
    });

    return token;
  };

  const formFields = filterFields(compData?.formFields);

  const onSubmit = async (data: any) => {
    try {
      setloading(true);
      let postData: any = {
        name: data?.name,
        usermobile: data?.code + data?.usermobile,
        email: data?.email,
        projectname: data?.projectname,
        flatnumber: data?.flatnumber,
        complaintmessage: data?.complaintmessage,
        officername: data?.officername,
        officeremail: data?.officeremail,
        officermobile: data?.officercode + data?.officermobile,
      };

      if (__RECAPTCHA__) {
        const captchaResponse = await executeRecaptcha();
        postData = {
          ...postData,
          reResponse: captchaResponse,
        };
      }

      console.log("Form Submitted Successfully", postData);

      const res = await postAPI(ENDPOINT.enquirePostApi, postData);
      if (true) {
        setloading(false);
        setShowThankyou(true);
      } else {
      }
    } catch (e) {
      console.log("error>>>>>>", e);

      setshowError(true);
      setErrorMsg("Unable to submit request at the moment");
      setloading(false);
    }
  };

  const handleThankYouClick = () => {
    resetForm && resetForm();
    setShowThankyou(!showThankyou);
  };

  const onHideThankYou = () => {
    setShowThankyou(!showThankyou);
    resetForm();
  };

  const resetForm = () => {
    const dataKeys = Object.keys(getValues());
    dataKeys.forEach((item) =>
      getValues(item) === true ? setValue(item, false) : setValue(item, null)
    );
  };

  return (
    <>
      {compData?.formHeading && (
        <div
          itemProp="mainEntity"
          className={styles.head}
          dangerouslySetInnerHTML={{ __html: compData?.formHeading }}
        />
      )}
      {
        <Form className="my-5" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={4}>
              {formFields?.name && (
                <GriTextInput
                  control={control}
                  controlName={formFields?.name?.fieldName}
                  errors={errors}
                  type={formFields?.name?.dataType}
                  placeholder={formFields?.name?.placeholder}
                  errorMsg={formFields?.name?.validation}
                  getValues={getValues}
                />
              )}
            </Col>
            <Col md={4}>
              {formFields?.usermobile && (
                <GriMobileInput
                  control={control}
                  errors={errors}
                  placeholder={formFields?.usermobile?.placeholder}
                  errorMsg={formFields?.usermobile?.validation}
                  getValues={getValues}
                  setValue={setValue}
                  controlNameCode={"code"}
                  controlNamePhone={formFields?.usermobile?.fieldName}
                  defaultValue={"+91"}
                />
              )}
            </Col>
            <Col md={4}>
              {formFields?.email && (
                <GriEmailInput
                  control={control}
                  controlName={formFields?.email?.fieldName}
                  errors={errors}
                  type={formFields?.email?.dataType}
                  placeholder={formFields?.email?.placeholder}
                  errorMsg={formFields?.email?.validation}
                  getValues={getValues}
                />
              )}
            </Col>
            <Col md={8}>
              {formFields?.projectname && (
                <GriTextInput
                  control={control}
                  controlName={formFields?.projectname?.fieldName}
                  errors={errors}
                  type={formFields?.projectname?.dataType}
                  placeholder={formFields?.projectname?.placeholder}
                  errorMsg={formFields?.projectname?.validation}
                  getValues={getValues}
                />
              )}
            </Col>
            <Col md={4}>
              {formFields?.flatnumber && (
                <GriTextInput
                  control={control}
                  controlName={formFields?.flatnumber?.fieldName}
                  errors={errors}
                  type={formFields?.flatnumber?.dataType}
                  placeholder={formFields?.flatnumber?.placeholder}
                  errorMsg={formFields?.flatnumber?.validation}
                  getValues={getValues}
                />
              )}
            </Col>
            <Col md={12}>
              {formFields?.complaintmessage && (
                <GriTextInput
                  control={control}
                  controlName={formFields?.complaintmessage?.fieldName}
                  errors={errors}
                  type={formFields?.complaintmessage?.dataType}
                  placeholder={formFields?.complaintmessage?.placeholder}
                  errorMsg={formFields?.complaintmessage?.validation}
                  getValues={getValues}
                />
              )}
            </Col>
          </Row>

          <div className={styles.stats}>
            {formFields?.receivedcount && (
              <p>
                {formFields?.receivedcount?.placeholder}{" "}
                {formFields?.receivedcount?.defaultValue}
              </p>
            )}
            {formFields?.settledcount && (
              <p>
                {formFields?.settledcount?.placeholder}{" "}
                {formFields?.settledcount?.defaultValue}
              </p>
            )}
          </div>

          {compData?.subHeading && (
            <div className={styles.subtitle}>{compData?.subHeading}</div>
          )}

          <Row>
            <Col md={4}>
              {formFields?.officername && (
                <GriTextInput
                  control={control}
                  controlName={formFields?.officername?.fieldName}
                  errors={errors}
                  type={formFields?.officername?.dataType}
                  placeholder={formFields?.officername?.placeholder}
                  errorMsg={formFields?.officername?.validation}
                  getValues={getValues}
                />
              )}
            </Col>
            <Col md={4}>
              {formFields?.officermobile && (
                <GriMobileInput
                  control={control}
                  errors={errors}
                  placeholder={formFields?.officermobile?.placeholder}
                  errorMsg={formFields?.officermobile?.validation}
                  getValues={getValues}
                  setValue={setValue}
                  controlNameCode={"officercode"}
                  controlNamePhone={formFields?.officermobile?.fieldName}
                  defaultValue={"+91"}
                />
              )}
            </Col>
            <Col md={4}>
              {formFields?.officeremail && (
                <GriEmailInput
                  control={control}
                  controlName={formFields?.officeremail?.fieldName}
                  errors={errors}
                  type={formFields?.officeremail?.dataType}
                  placeholder={formFields?.officeremail?.placeholder}
                  errorMsg={formFields?.officeremail?.validation}
                  getValues={getValues}
                />
              )}
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={4}>
              <Button
                variant="primary"
                size="lg"
                type="submit"
                className={`my-3 w-100 ${styles.griButton}`}
              >
                {!loading && <>Submit</>}
                {loading && <Loader bg={"#000000"} />}
              </Button>
            </Col>
          </Row>
        </Form>
      }

      {showThankyou && (
        <ModalPopup
          className=""
          modalTitle=""
          modalSize="lg"
          show={showThankyou}
          onHide={onHideThankYou}
          modalBody={
            <div>
              <header className={`${styles.orderHeader}`}>
                <ul>
                  <li>
                    <span className="no-print">
                      {getIconFromIconName("Tick")}
                    </span>
                  </li>
                  <li>
                    <h3>Thank you!</h3>
                    <p>
                      Our customer representative will get back to you soon.
                    </p>
                  </li>
                </ul>
              </header>
              <div className={`w-100 text-center`}>
                <Button
                  variant="primary"
                  size="lg"
                  aria-label="Close"
                  onClick={handleThankYouClick}
                >
                  Continue
                </Button>
              </div>
            </div>
          }
        />
      )}
      {
        <ModalPopup
          className="enquireModal"
          show={showError}
          modalSize="md"
          modalTitle={""}
          onHide={onHideError}
          modalBody={<ErrorMessage message={errorMsg} />}
        />
      }
    </>
  );
};

export default GrievanceForm;
