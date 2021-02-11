import React, { useEffect, useState } from "react";
import { baseUrl } from "../constants";
import ImageView from "./ImageView";
import MyForm from "./myForm";

function Main() {
  const [urls, setUrl] = useState([]);
  const fetchMemes = () => {
    fetch(baseUrl + "memes", {
      headers: {
        method: "GET",
      },
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((response) => response.json())
      .then((data) => {
        const urlMap = [];
        data.map((item) => {
          const timestamp = item.id.toString().substring(0, 8);
          const date = new Date(parseInt(timestamp, 16) * 1000)
            .toString()
            .split(" ");
          return urlMap.push({
            id: item.id,
            caption: item.caption,
            url: item.url,
            name: item.name,
            date: date,
          });
        });

        setUrl(urlMap);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchMemes();
  }, []);
  const updateImage = (id, url) => {
    fetchMemes();
  };
  const deleteImage = (id) => {
    fetchMemes();
  };
  return (
    <div>
      <MyForm fetchMemes={fetchMemes} />
      <ImageView
        updateImage={updateImage}
        deleteImage={deleteImage}
        urls={urls}
      />
    </div>
  );
}

export default Main;
