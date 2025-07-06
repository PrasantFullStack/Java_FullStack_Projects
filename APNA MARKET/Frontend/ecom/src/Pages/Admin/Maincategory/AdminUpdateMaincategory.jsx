import React, { useEffect, useState } from "react";
import Breadcrum from "../../../Components/Breadcrum";
import Sidebar from "../Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormValidator from "../../../Validators/FormValidator";
import ImageValidator from "../../../Validators/ImageValidator";

import {
  getMaincategory,
  updateMultipartRecord,
} from "../../../Redux/ActionCreators/MaincategoryActionCreators";
export default function AdminUpdateMaincategory() {
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

  let MaincategoryStateData = useSelector(
    (state) => state.MaincategoryStateData
  );
  let dispatch = useDispatch();

  function getInputData(e) {
    var name = e.target.name;
    // var value = e.target.files && e.target.files.length ? "maincategory/" + e.target.files[0].name : e.target.value
    var value =
      e.target.files && e.target.files.length
        ? e.target.files[0]
        : e.target.value;
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

  async function postData(e) {
    e.preventDefault();
    if (!id) {
      toast.error("Maincategory ID is undefined!");
      console.error("Error: Maincategory ID is undefined!");
      return;
    }
    try {
      let error = Object.values(errorMessage).find((x) => x !== "");
      if (error) setShow(true);
      else {
        let item = MaincategoryStateData.find(
          (x) => x.id !== id && x.name.toLowerCase() === data.name.toLowerCase()
        );
        if (item) {
          setShow(true);
          toast.warning("Maincategory with same name already exists ⚠️");
          setErrorMessage((old) => {
            return {
              ...old,
              name: "Maincategory With Same Name Already Exist",
            };
          });
        } else {
          var formData = new FormData();
          //Update fields
          formData.append("id", id);
          formData.append(
            "data",
            JSON.stringify({ name: data.name, active: data.active })
          );

          if (data.pic instanceof File) {
            formData.append("pic", data.pic);
          }
          //Dispatch redux action the action to update the record
          dispatch(updateMultipartRecord(formData));
          toast.success("Maincategory updated successfully");
          navigate("/admin/maincategory");
        }
      }
    } catch (error) {
      console.error("Profile update ❌Error");
      toast.error("Profile update ❌Error");
      alert("Something went ❌wrong during profile update!");
    }
  }

  useEffect(() => {
    dispatch(getMaincategory());
  }, [dispatch]);
  useEffect(() => {
    console.log("Redux Data:", MaincategoryStateData);
    let category = MaincategoryStateData.find((x) => x.id === Number(id));

    if (category) {
      setData({
        name: category.name,
        pic: category.pic,
        active: category.active,
      });
    }
  }, [id, MaincategoryStateData]);

  //   useEffect(() => {
  //     dispatch(getMaincategory());
  //     if (MaincategoryStateData.length) {
  //       setData(MaincategoryStateData.find((x) => x.id === id));
  //     }
  //   }, [id, MaincategoryStateData.length]);
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
                  value={data.name}
                  onChange={getInputData}
                  placeholder="Maincategory Name"
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
