import { IGoodnessBanner } from "@interfaces";
import { getIconFromIconName, useDeviceType } from "@utils";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { GriEmailInput, GriMobileInput, GriTextareaInput } from "./FormFields";
import GriTextInput from "./FormFields/GriTextInput";
import styles from "./form.module.scss";

const GrievanceForm = (props: { compData: IGoodnessBanner }) => {
  const { compData } = props;
  const { deviceType } = useDeviceType();

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

  const onSubmit = async (data: any) => {
    try {
      console.log("Form Submitted Successfully", data);
    } catch (e) {}
  };

  return (
    <>
      {
        <Form className="my-5" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={4}>
              <GriTextInput
                control={control}
                controlName={"name"}
                errors={errors}
                type={"text"}
                placeholder={"Name *"}
                errorMsg={"Invalid message"}
                getValues={getValues}
              />
            </Col>
            <Col md={4}>
              <GriMobileInput
                control={control}
                errors={errors}
                placeholder={"Mobile number"}
                errorMsg={"please enter a valid mobile number"}
                getValues={getValues}
                setValue={setValue}
                controlNameCode={"code"}
                controlNamePhone={"phone"}
                defaultValue={"+1"}
              />
            </Col>
            <Col md={4}>
              <GriEmailInput
                control={control}
                type={"email"}
                controlName={"email"}
                errors={errors}
                placeholder={"Email"}
                errorMsg={"Please enter valid email address"}
                getValues={getValues}
              />
            </Col>
            <Col md={8}>
              <GriTextInput
                type={"text"}
                control={control}
                controlName={"projectName"}
                errors={errors}
                placeholder={"Project Name"}
                errorMsg={"Please enter valid Project Name"}
                getValues={getValues}
              />
            </Col>
            <Col md={4}>
              <GriTextInput
                type={"text"}
                control={control}
                controlName={"flatNo"}
                errors={errors}
                placeholder={"Flat No"}
                errorMsg={"Please enter valid Flat number"}
                getValues={getValues}
              />
            </Col>
            <Col md={12}>
              <GriTextareaInput
                type={"text"}
                control={control}
                controlName={"message"}
                errors={errors}
                placeholder={"Complaint Message"}
                errorMsg={"Please enter valid Complaint Message"}
                getValues={getValues}
              />
            </Col>
          </Row>

          <div className={styles.stats}>
            <p>Total number of complaints/grievances received: 0</p>
            <p>Total number of complaints/grievances settled: 0</p>
          </div>

          <div className={styles.subtitle}>Grievance Redressal Officer</div>

          <Row>
            <Col md={4}>
              <GriTextInput
                control={control}
                controlName={"officerName"}
                errors={errors}
                type={"text"}
                placeholder={"Name *"}
                errorMsg={"Invalid message"}
                getValues={getValues}
              />
            </Col>
            <Col md={4}>
              <GriMobileInput
                control={control}
                errors={errors}
                placeholder={"Mobile number"}
                errorMsg={"please enter a valid mobile number"}
                getValues={getValues}
                setValue={setValue}
                controlNameCode={"officerCode"}
                controlNamePhone={"officerPhone"}
                defaultValue={"+1"}
              />
            </Col>
            <Col md={4}>
              <GriEmailInput
                control={control}
                type={"email"}
                controlName={"officerEmail"}
                errors={errors}
                placeholder={"Email"}
                errorMsg={"Please enter valid email address"}
                getValues={getValues}
              />
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
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      }
      {false && (
        <form>
          <div className="row mb-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Name *"
                required
              />
            </div>
            <div className="col-md-2">
              <select className="form-select">
                <option value="India">+91</option>
                {/* Add more country codes as needed */}
              </select>
            </div>
            <div className="col-md-3">
              <input
                type="tel"
                className="form-control"
                placeholder="Mobile Number"
              />
            </div>
            <div className="col-md-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                placeholder="Project Name"
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Flat No."
              />
            </div>
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              rows={4}
              placeholder="Complaint Message"
            ></textarea>
          </div>

          <h2 className={styles.subtitle}>Grievance Redressal Officer</h2>

          <div className="row mb-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                value="Lorem Ipsum"
                readOnly
              />
            </div>

            <div className="col-md-5">
              <div className="d-flex">
                <select className="form-select">
                  <option>+91</option>
                  {/* Add more country codes as needed */}
                </select>
                <span>{getIconFromIconName("arrowdown")}</span>
                <input
                  type="tel"
                  className="form-control"
                  value="9876543210"
                  readOnly
                />
              </div>
            </div>

            <div className="col-md-3">
              <input
                type="email"
                className="form-control"
                value="lorem.ipsum@adani.com"
                readOnly
              />
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-lg ">
              Submit
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default GrievanceForm;
