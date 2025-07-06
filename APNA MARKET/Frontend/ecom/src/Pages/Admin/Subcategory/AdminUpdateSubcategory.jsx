import React, { useEffect, useState } from "react";
import Breadcrum from "../../../Components/Breadcrum";
import Sidebar from "../Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FormValidator from "../../../Validators/FormValidator";
import ImageValidator from "../../../Validators/ImageValidator";

import {
  getSubcategory,
  updateMultipartRecord,
} from "../../../Redux/ActionCreators/SubcategoryActionCreators";
import { toast } from "react-toastify";
export default function AdminUpdateSubcategory() {
  let { id } = useParams();
  let [data, setData] = useState({
    name: "",
    pic: "",
    active: true,
  });

  let [errorMessage, setErrorMessage] = useState({
    name: "",
    pic: "",
  });

  let [show, setShow] = useState(false);
  let navigate = useNavigate();

  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData);
  let dispatch = useDispatch();

  function getInputData(e) {
    var name = e.target.name;
    // var value = e.target.files && e.target.files.length ? "subcategory/" + e.target.files[0].name : e.target.value
    var value =
      e.target.files && e.target.files.length
        ? e.target.files[0]
        : e.target.value;

    setErrorMessage((old) => {
      return {
        ...old,
        [name]: e.target.files ? ImageValidator(e) : FormValidator(e),
      };
    });

    setData((old) => {
      return {
        ...old,
        [name]: name === "active" ? (value === "1" ? true : false) : value,
      };
    });
  }

  async function postData(e) {
    e.preventDefault();
    try {
      let error = Object.values(errorMessage).find((x) => x !== "");
      if (error) setShow(true);
      else {
        let item = SubcategoryStateData.find(
          (x) => x.id !== id && x.name.toLowerCase() === data.name.toLowerCase()
        );
        if (item) {
          setShow(true);
          toast.error("Please fix the validation errors 🚫");
          setErrorMessage((old) => {
            toast.error("Subcategory With Same Name Already Exist");
            return {
              ...old,
              name: "Subcategory With Same Name Already Exist",
            };
          });
          return;
        }

        let formData = new FormData();
        formData.append("id", id);
        formData.append(
          "data",
          JSON.stringify({ name: data.name, active: data.active })
        );
        if (data.pic instanceof File) {
          formData.append("pic", data.pic);
        }
        dispatch(updateMultipartRecord(formData));
        toast.success("Subcategory updated successfully");
        navigate("/admin/subcategory");
      }
    } catch (error) {
      toast.error("Error updating subcategory: " + error.message);
      console.error("Error updating subcategory:", error);
    }
  }

  useEffect(() => {
    dispatch(getSubcategory());
  }, [dispatch]);

  // Fetch the subcategory data when the component mounts or when the id changes
  useEffect(() => {
    console.log("Redux Data:", SubcategoryStateData);
    let category = SubcategoryStateData.find((x) => x.id === Number(id));

    if (category) {
      setData({
        name: category.name,
        pic: category.pic,
        active: category.active,
      });
    }
  }, [id, SubcategoryStateData]);

  //   useEffect(() => {
  //     dispatch(getSubcategory());
  //     if (SubcategoryStateData) {
  //       setData(SubcategoryStateData.find((x) => x.id === id));
  //     }
  //   }, [id, SubcategoryStateData]);
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
              Subcategory{" "}
              <Link to="/admin/subcategory">
                <i className="fa fa-long-arrow-left text-light float-end"></i>
              </Link>
            </h5>
            <form onSubmit={postData}>
              <div className="mb-3">
                <label>Name*</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={getInputData}
                  placeholder="Subcategory Name"
                  className={`form-control border-3 ${
                    show && errorMessage.name
                      ? "border-danger"
                      : "border-primary"
                  }`}
                />
                {show && errorMessage.name ? (
                  <p className="text-capitalize text-danger">
                    {errorMessage.name}
                  </p>
                ) : null}
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Pic</label>
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
                    <p className="text-capitalize text-danger">
                      {errorMessage.pic}
                    </p>
                  ) : null}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Active*</label>
                  <select
                    name="active"
                    value={data.active ? "1" : "0"}
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
