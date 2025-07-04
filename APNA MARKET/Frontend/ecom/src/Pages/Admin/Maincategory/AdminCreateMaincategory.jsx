import React, { useEffect, useState } from "react";
import Breadcrum from "../../../Components/Breadcrum";
import Sidebar from "../Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FormValidator from "../../../Validators/FormValidator";
import ImageValidator from "../../../Validators/ImageValidator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createMultipartRecord,
  getMaincategory,
} from "../../../Redux/ActionCreators/MaincategoryActionCreators";
export default function AdminCreateMaincategory() {
  let [data, setData] = useState({
    name: "",
    pic: "",
    active: true,
  });

  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field Is Mendatory",
    pic: "Pic Field Is Mendatory",
  });

  let [show, setShow] = useState(false);
  let navigate = useNavigate();

  let MaincategoryStateData = useSelector(
    (state) => state.MaincategoryStateData
  );
  let dispatch = useDispatch();

  function getInputData(e) {
    var name = e.target.name;
    let value = e.target.files ? e.target.files[0] : e.target.value;

    // var value = e.target.files && e.target.files.length ? "maincategory/" + e.target.files[0].name : e.target.value

    // var value =
    //   e.target.files && e.target.files.length
    //     ? e.target.files[0]
    //     : e.target.value;
    if (name !== "active") {
      setErrorMessage((old) => {
        return {
          ...old,
          [name]: e.target.files ? ImageValidator(e) : FormValidator(e),
        };
      });
    }
    setData((old) => {
      return {
        ...old,
        [name]: name === "active" ? (value === "1" ? true : false) : value,
      };
    });
  }

  function postData(e) {
    e.preventDefault();
    try {
      let error = Object.values(errorMessage).find((x) => x !== "");
      if (error) {
        setShow(true);
        toast.error("Please fix the validation errors 🚫");
      } else {
        let item = MaincategoryStateData.find(
          (x) => x.name.toLowerCase() === data.name.toLowerCase()
        );
        if (item) {
          setShow(true);
          toast.warning("Maincategory already exists ⚠️");
          setErrorMessage((old) => {
            return {
              ...old,
              name: "Maincategory Name is Already Exist",
            };
          });
        } else {
          var formData = new FormData();
          formData.append(
            "data",
            JSON.stringify({
              name: data.name,
              active: data.active,
            })
          );

          if (data.pic instanceof File) {
            formData.append("pic", data.pic);
          }
          console.log("data", data.name, data.active);
          console.log("pic", data.pic);

          dispatch(createMultipartRecord(formData)); // Correct Redux action
          toast.success("Maincategory Created Successfully ✅");
          navigate("/admin/maincategory");
        }
      }
    } catch (error) {
      console.error("Maincategory❌Error");
      toast.error("Maincategory not Created ❌");
      alert("Something went ❌wrong during maincategory created!");
    }
  }

  useEffect(() => {
    dispatch(getMaincategory());
  }, [dispatch]);

  return (
    <>
      <Breadcrum title="Admin" />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-primary w-100 p-2 text-light text-center">
              Maincategory{" "}
              <Link to="/admin/maincategory">
                <i className="fa fa-long-arrow-left text-light float-end"></i>
              </Link>
            </h5>
            <form onSubmit={postData}>
              <div className="mb-3">
                <label>Name*</label>
                <input
                  type="text"
                  name="name"
                  onChange={getInputData}
                  placeholder="Maincategory Name"
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

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Pic*</label>
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
                <div className="col-md-6 mb-3">
                  <label>Active*</label>
                  <select
                    name="active"
                    onChange={getInputData}
                    className="form-select border-3 border-primary"
                  >
                    <option value="1">Yes</option>
                    <option value="0">NO</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
