import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: "",
};


const UpdateMovie = props => {
    const { push } = useHistory(); 
    const { id } = useParams();  
    const [ item, setItem] = useState(initialItem);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log(res);
            setItem(res.data);

        })
        .catch(err => {
            console.log(err); 
        })
    }, [id])

const changeHandler = e => {
    

    setItem({
        ...item,
        [e.target.name]: e.target.value, 
    })
}

const handleSubmit = e => {
    e.preventDefault();

    axios.put(`http://localhost:5000/api/movies/${id}`, item)
        .then(res => {
            console.log(res);
            setItem(initialItem); 
            push('/');
            window.location.reload(true); 
        })
        .catch(err => {
            console.log(err);
        })
}


  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={item.title}
        />
         <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={item.director}
        />
         <div className="baseline" />
        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={item.metascore}
        />
         <div className="baseline" />
        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={item.stars}
        />
         <div className="baseline" />
        <button className="md-button form-button">Update</button>
      </form>
    </div>
  )

}

export default UpdateMovie