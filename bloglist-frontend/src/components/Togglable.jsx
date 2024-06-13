import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
// Definimos el componente Togglable utilizando forwardRef para manejar referencias hacia el componente
export const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  // Función que alterna el estado de visibilidad
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // Utilizamos useImperativeHandle para exponer la función toggleVisibility a través de la referencia
  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className="newblog" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";
