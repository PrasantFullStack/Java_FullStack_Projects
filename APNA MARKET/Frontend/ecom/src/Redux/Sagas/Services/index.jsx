import { toast } from "react-toastify";

export async function createRecord(collection, payload) {
  let response = await fetch(
    `${process.env.REACT_APP_BACKEND_SERVER}${collection}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    }
  );
  return await response.json();
}

//if payload has files
export async function createMultipartRecord(collection, payload) {
  let response = await fetch(
    `${process.env.REACT_APP_BACKEND_SERVER}${collection}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: payload,
    }
  );
  return await response.json();
}

export async function getRecord(collection) {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BACKEND_SERVER}${collection}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (response.ok) {
      return await response.json();
    }
    const text = await response.text();
    // return await response.json();
    if (!text) {
      toast.warn("No data received from the server.");
      console.warn("No data received from the server.");

      return [];
    }

    return JSON.parse(text);
  } catch (error) {
    toast.error("Error fetching records. Please try again later.");
    console.error("Error fetching records:", error);
    return [];
  }
}

export async function updateRecord(collection, payload) {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BACKEND_SERVER}${collection}/${payload.id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...payload }),
      }
    );

    return await response.json();
  } catch (error) {
    toast.error("Error updating record. Please try again later.");
    console.error("Error updating record:", error);
    return [];
  }
}

//If record has files
export async function updateMultipartRecord(collection, payload) {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BACKEND_SERVER}${collection}/${payload.get(
        "id"
      )}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload,
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      toast.error(`Error updating record: ${errorText}`);
      console.error("Error updating record:", errorText);
      return [];
    }

    //UnAuthorized error handling
    if (response.status === 401) {
      toast.error("Unauthorized access. Please log in again.");
      return [];
    }
    // Check if the response status is 200 (OK)
    if (response.status === 200) {
      const data = await response.json();
      toast.success("Record updated successfully.");
      return data;
    }
  } catch (error) {
    toast.error("Error updating record. Please try again later.");
    console.error("Error updating record:", error);
    return [];
  }
}

export async function deleteRecord(collection, payload) {
  let response = await fetch(
    `${process.env.REACT_APP_BACKEND_SERVER}${collection}/${payload.id}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return await response.json();
}
