import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import { baseUrl, defaultUrl } from "../constants";
import isUrl from "is-url";

function Image({ url, set, updateImage, deleteImage }) {
  const [editState, setEditState] = useState(false);
  const [formState, setFormState] = useState({
    url: url.url === "default" ? "" : url.url,
    caption: url.caption,
  });

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const cancelEdit = () => {
    setFormState({
      url: url.url === "default" ? " " : url.url,
      caption: url.caption,
    });
    setEditState(false);
  };
  const errors = [
    {
      title: " ",
      caption: " ",
      url: " ",
    },
  ];
  const validate = () => {
    if (formState.caption.length > 70)
      errors.caption = "Caption should be less tha 70 characters";
    if (!isUrl(formState.url.trim())) errors.url = "Enter Valid URL!!";

    return errors;
  };
  const handleSubmit = async () => {
    const error = validate();
    if (!!error.caption || !!error.url) {
      const caption = error.caption ? error.caption : " ";
      const url = error.url ? error.url : " ";
      alert(caption + "\n" + url);
      return;
    }
    const dataObject = {
      url: formState.url,
      caption: formState.caption,
    };
    console.log(dataObject);
    const res = await fetch(baseUrl + "memes/" + url.id, {
      method: "PATCH",
      body: JSON.stringify(dataObject),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    if (res.ok) {
      updateImage(url.id, formState.url);
    }
    setEditState(false);
  };

  const handleDelete = async () => {
    const res = await fetch(baseUrl + "memes/" + url.id, {
      method: "DELETE",
    });
    console.log(res);
    if (!res.ok) {
      alert(res);
    }
    deleteImage(url.id);
  };

  return (
    <figure>
      <img
        src={url.url === "default" ? defaultUrl : url.url}
        alt=""
        className="memeCard"
        onClick={() => {
          if (url.url !== "default") set(url.url);
        }}
      />
      <figcaption>
        {editState && (
          <EditForm
            cancelEdit={cancelEdit}
            formState={formState}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        )}

        {!editState && <p>{url.caption}</p>}
        {!editState && (
          <div className="d-flex flex-row justify-content-between align-items-center">
            <div className="d-flex flex-row ">
              <div className="pr-2">
                <Button onClick={() => setEditState(!editState)}>
                  <i className="fa fa-pencil" />
                </Button>
              </div>
              {/* <Button
                onClick={() => {
                  if (window.confirm("Are you sure ?")) handleDelete();
                }}
              >
                <i className="fa fa-trash" />
              </Button> */}
            </div>
            <div>
              <p>By: {url.name}</p>
              <p>{url.date[1] + " " + url.date[2] + ", " + url.date[3]}</p>
            </div>
          </div>
        )}
      </figcaption>
    </figure>
  );
}

function EditForm({ cancelEdit, formState, handleInputChange, handleSubmit }) {
  return (
    <div className="EditForm">
      <div className="d-flex pt-2 flex-row justify-content-between">
        <Input
          value={formState.url}
          onChange={handleInputChange}
          name="url"
          placeholder="Enter Url"
        />
        <button onClick={handleSubmit} className="btn btn-success ">
          <i className="fa fa-check" />
        </button>
      </div>
      <div className="d-flex pt-2 flex-row justify-content-between">
        <Input
          value={formState.caption}
          onChange={handleInputChange}
          name="caption"
        />
        <button onClick={cancelEdit} className="btn btn-danger">
          <i className="fa fa-times fa-sm" />
        </button>
      </div>
    </div>
  );
}

export default Image;
