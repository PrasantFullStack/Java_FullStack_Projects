import { useEffect, useState } from "react";
import Breadcrum from "../Components/Breadcrum";
import { useNavigate } from "react-router-dom";

import ImageValidator from "../Validators/ImageValidator";
import FormValidator from "../Validators/FormValidator";
import { toast } from "react-toastify";
export default function UpdateProfilePage() {
  let [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    pin: "",
    city: "",
    state: "",
    pic: "",
  });
  let [errorMessage, setErrorMessage] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    pic: "",
  });
  let [show, setShow] = useState(false);
  let navigate = useNavigate();

  //file upload logic
  function getInputData(e) {
    var name = e.target.name;
    let value = e.target.files ? e.target.files[0] : e.target.value;

    setErrorMessage((old) => {
      return {
        ...old,
        [name]: e.target.files ? ImageValidator(e) : FormValidator(e),
      };
    });
    setData((old) => {
      return {
        ...old,
        [name]: value, //Store actual file object if file
      };
    });
  }
  async function postData(e) {
    e.preventDefault();
    try {
      //create form data
      let error = Object.values(errorMessage).find((x) => x !== "");
      if (error) setShow(true);
      else {
        let response = await fetch(
          `${process.env.REACT_APP_BACKEND_SERVER}user`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );
        response = await response.json();
        let item = response.find(
          (x) =>
            x.id !== localStorage.getItem("userid") &&
            (x.username?.toLowerCase() === data.username.toLowerCase() ||
              x.email?.toLowerCase() === data.email.toLowerCase())
        );
        if (item) {
          setShow(true);
          setErrorMessage((old) => {
            return {
              ...old,
              username:
                item.username?.toLowerCase() === data.username.toLowerCase()
                  ? "Username Already Taken"
                  : "",
              email:
                item.email?.toLowerCase() === data.email.toLowerCase()
                  ? "Email Address Already Taken"
                  : "",
            };
          });
          return;
        }

        // Convert all data to JSON and append as "data"

        var formData = new FormData();
        formData.append(
          "data",
          JSON.stringify({
            name: data.name,
            phone: data.phone,
            address: data.address,
            pin: data.pin,
            city: data.city,
            state: data.state,
          })
        );
        // Step 3: Add the image file (if selected)
        if (data.pic instanceof File) {
          formData.append("pic", data.pic);
        }
        //step 4: Get token and userid from localStorage

        response = await fetch(
          `${process.env.REACT_APP_BACKEND_SERVER}user/${localStorage.getItem(
            "userid"
          )}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          }
        );

        response = await response.json();
        //Step handling Buyer and admin or super admin
        if (response.ok) {
          toast.success("Profile updated successfully! 🎉");
          if (data.role === "Admin" || data.role === "Super Admin")
            navigate("/admin");
          else if (data.role === "Buyer") navigate("/profile");
        } else {
          console.error("Server error:", response.status);
        }
      }
    } catch (error) {
      console.error("Profile update ❌Error");
      toast.error("Profile update ❌Error");
      alert("Something went ❌wrong during profile update!");
    }
  }

  useEffect(() => {
    (async () => {
      let response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER}user/${localStorage.getItem(
          "userid"
        )}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      response = await response.json();
      if (response) setData({ ...response });
    })();
  }, []);
  return (
    <>
      <Breadcrum title="Update Profile" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-lg-9 col-md-10 col-sm-11 m-auto">
            <h5 className="bg-primary text-light text-center p-2">
              Update Your Profile Details
            </h5>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={getInputData}
                    placeholder="Full Name"
                    className={`form-control border-3 ${
                      show && errorMessage.name
                        ? "border-danger"
                        : "border-primary"
                    }`}
                  />
                  {show && errorMessage.name ? (
                    <p className="text-danger">{errorMessage.name}</p>
                  ) : null}
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="phone"
                    value={data.phone}
                    onChange={getInputData}
                    placeholder="Phone Number"
                    className={`form-control border-3 ${
                      show && errorMessage.phone
                        ? "border-danger"
                        : "border-primary"
                    }`}
                  />
                  {show && errorMessage.phone ? (
                    <p className="text-danger">{errorMessage.phone}</p>
                  ) : null}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="username"
                    value={data.username}
                    onChange={getInputData}
                    placeholder="User Name"
                    className={`form-control border-3 ${
                      show && errorMessage.username
                        ? "border-danger"
                        : "border-primary"
                    }`}
                  />
                  {show && errorMessage.username ? (
                    <p className="text-danger">{errorMessage.username}</p>
                  ) : null}
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={getInputData}
                    placeholder="Email Address"
                    className={`form-control border-3 ${
                      show && errorMessage.email
                        ? "border-danger"
                        : "border-primary"
                    }`}
                  />
                  {show && errorMessage.email ? (
                    <p className="text-danger">{errorMessage.email}</p>
                  ) : null}
                </div>
              </div>

              <div className="mb-3">
                <textarea
                  name="address"
                  value={data.address}
                  onChange={getInputData}
                  placeholder="Address..."
                  className="form-control border-3 border-primary"
                ></textarea>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="city"
                    value={data.city}
                    onChange={getInputData}
                    placeholder="City Name"
                    className="form-control border-3 border-primary"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="state"
                    value={data.state}
                    onChange={getInputData}
                    placeholder="State Name"
                    className="form-control border-3 border-primary"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="pin"
                    value={data.pin}
                    onChange={getInputData}
                    placeholder="Pin Code"
                    className="form-control border-3 border-primary"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="file"
                    name="pic"
                    onChange={getInputData}
                    className={`form-control border-3 ${
                      show && errorMessage.pic
                        ? "border-danger"
                        : "border-primary"
                    }`}
                  />
                  {show && errorMessage.pic ? (
                    <p className="text-danger">{errorMessage.pic}</p>
                  ) : null}
                </div>
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
