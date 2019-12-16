import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth} from "../axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  console.log("ColorList.js updateColors", updateColors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: '',
    code: {hex: ''}
  })

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    console.log("editColor in ColorList.js color.id", color.id); 
  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => {
      console.log("deleteColor in ColorList res", res)
      updateColors(colors => colors.filter(color =>{
        return color.id !== res.data; 
      }));
    })
    .catch (error =>{
      console.log("deleteColor in ColorList error", error);
    });
  };

  const saveEdit = e => {
    // e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`,colorToEdit)
    .then (res => {
      console.log("saveEdit in ColorList.js res", res)
    })
    .catch(error => {
      console.log("saveEdit in ColorList.js error", error)
    })
    .catch( error => {
      console.log('saveEdit in ColorList.js .put error', error) 
    })

    setEditing(false);
  };

  const handleColor = event =>{
    setNewColor({
      ...newColor,
      color: event.target.value
    })
  }

  const addColor = event => {
  axiosWithAuth(0
    .post(`http://localhost:5000/api/colors/`, newColor))
    .then(res => {
      console.log('addColor in ColorList res', res);
      updateColors([...colors, newColor])
    })
    .catch(error => {
      console.log('addColor in ColorList error', error);
      event.preventDefault();
    })
  }


  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color, e);
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor} >
        <input
        type="text"
        placeholder="color name"
        name='color'
        value={newColor.color}
        onChange={(event) => {
          setNewColor({
            ...newColor,
            color: event.target.value
          })
        }} />
        <input
        type="text"
        placeholder="hex color number"
        name='color'
        value={newColor.code.hex}
        onChange={(event) =>{
          setNewColor({
            ...newColor,
            code:{hex:event.target.value}
          })
        }}
        />
        <button> Add Color </button>
      </form>
    </div>
  );
};

export default ColorList;
