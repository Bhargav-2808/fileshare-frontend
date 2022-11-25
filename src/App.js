import "./App.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from "react";
import logo from "./Images/Logo.png";
import home1 from "./Images/home1.svg";
import copy from "./Images/copy.svg";

function App() {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [emailFrom, setEmailFrom] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const imgSet = async (event) => {
    setFile(event.target?.files[0]);
    const formdata = new FormData();
    formdata.append("myfile", file);

    const resp = await axios
      .post("http://localhost:3001/api/files", formdata)
      .then((res) => {
        //console.log(res);
        setLink(res?.data?.file);
        toast.success("File Uploaded");
      })
      .catch((e) => {
        toast.error("Something went wrong");
      });
  };

  //console.log(link);
  const submitFunc = async (e) => {
    e.preventDefault();
    const body = {
      uuid: link.split("/").splice(-1, 1)[0],
      emailTo: emailTo,
      emailFrom: emailFrom,
    };

    const resp = await axios
      .post("http://localhost:3001/api/files/send", body)
      .then((res) => {
        toast.success("Email sent");
      })
      .catch((e) => {
        toast.error("Something went wrong");
      });
  };
  return (
    <>
      <img src={logo} alt="ShareME logo" className="logo" />
      <Container>
        <Row className="mt-2">
          <Col xl={5}>
            <Form
              className="upload-container pt-5 pb-5 ps-2 pe-2"
              onSubmit={submitFunc}
            >
              <h2 style={{ color: "#0d7c47" }}>
                Cilck upload to share the file.
              </h2>
              <label
                style={{
                  border: "1px solid #ccc",
                  display: "inline-block",
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
                className="mt-4"
              >
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={imgSet}
                  name="myfile"
                />
                Upload
              </label>
              <div className="sharing-container mt-5">
                <p className="expire">Link expires in 24 hours</p>
                <p>Copy Link</p>
                <div className="input-container">
                  <input type="text" value={link?link:""} readOnly />
                  <img className="img" src={copy} alt="content_copy_" />
                </div>

                <p className="email-info">Or Send via Email</p>
                <div className="email-container mt-5">
                  <div className="field">
                    <label htmlFor="fromEmail">Your email</label>
                    <input
                      type="email"
                      autoComplete="email"
                      required
                      name="from-email"
                      onChange={(e) => setEmailFrom(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="toEmail">Receiver's email</label>
                    <input
                      type="email"
                      required
                      autoComplete="receiver"
                      name="to-email"
                      onChange={(e) => setEmailTo(e.target.value)}
                    />
                  </div>
                  <div className="send-btn-container">
                    <button type="submit">Send</button>
                  </div>
                  <div className="send-btn-container">
                    <button type="reset" onClick={()=>setLink("")}>Reset</button>
                  </div>
                </div>
              </div>
            </Form>
          </Col>
          <Col
            xl={6}
            className="d-flex justify-content-center align-items-center"
          >
            <img src={home1} alt="home page Image" className="upload-vector" />
          </Col>
        </Row>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
