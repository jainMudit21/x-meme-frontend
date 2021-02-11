import React, { useState } from "react";
import { baseUrl } from "../constants";
import isUrl from "is-url";

function MyForm({ fetchMemes }) {
  const [formState, setFormState] = useState({
    title: "",
    caption: "",
    url: "",
  });

  const errors = [
    {
      title: " ",
      caption: " ",
      url: " ",
    },
  ];
  const validate = () => {
    if (formState.title.length > 32)
      errors.title = "Name should be less than 32 characters";
    if (formState.caption.length > 70)
      errors.caption = "Caption should be less tha 70 characters";
    if (!isUrl(formState.url.trim())) errors.url = "Enter Valid URL!!";

    return errors;
  };
  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = validate();
    if (!!error.title || !!error.caption || !!error.url ) {
      const caption = error.caption ? error.caption : " ";
      const title = error.title ? error.title : " ";
      const url = error.url ? error.url : " ";
      alert(title + "\n" + caption + "\n" + url);
      return;
    }
    const dataObject = {
      url: formState.url,
      caption: formState.caption,
      name: formState.title,
    };
    console.log(dataObject);
    await fetch(baseUrl + "memes", {
      method: "POST",
      body: JSON.stringify(dataObject),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok)
          setFormState({
            title: "",
            caption: "",
            url: "",
          });
        else res.json().then((response) => alert(response.error.toString()));
      })
      .catch((err) => alert(err));
    fetchMemes();
  };
  return (
    <nav className="navbar navbar-light navbar-expand-lg fixed-top">
      <span className="navbar-brand mb-0 h1">X-MEME</span>
      <a
        className="nav-link"
        href={baseUrl + "swagger-ui"}
        target="_blank"
        rel="noreferrer"
      >
        Swagger
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <form className="form-inline ml-auto " onSubmit={handleSubmit}>
          <input
            className="form-control mr-sm-2"
            required
            type="text"
            onChange={handleInputChange}
            name="title"
            id="title"
            value={formState.title}
            placeholder="Name"
          />
          <input
            className="form-control mr-sm-2 pt-1"
            required
            type="text"
            onChange={handleInputChange}
            name="caption"
            id="caption"
            value={formState.caption}
            placeholder="Caption"
          />
          <input
            className="form-control mr-sm-2 pt-1"
            required
            type="text"
            onChange={handleInputChange}
            name="url"
            id="url"
            value={formState.url}
            placeholder="Url"
          />
          <button
            className="btn btn-outline-primary my-2 my-sm-0 ml-auto mr-auto"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </nav>
  );
}

export default MyForm;
