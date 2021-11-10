import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* {...props.input} will sure that all key value pairs in the input object 
       which we receive on props.input are added as props to input  */}
      {/* <input id={props.input.id} {...props.input} /> */}
      <input {...props.input} />
    </div>
  );
};

export default Input;
