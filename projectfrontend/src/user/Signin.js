import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin,authenticate ,isAutheticated} from "../auth/helper";

const Signin=()=>{
  const [value,setValues]=useState({
    email: "",
    password: "",
    error: "",
    loading:false,
    didRedirect: false
});

const {  email, password,error,loading,didRedirect} = value;
const { user } = isAutheticated();

const handleChange = name => event => {
    setValues({ ...value, error: false, [name]: event.target.value });
  };

  const onSubmit=event=>{
    event.preventDefault();
    setValues({...value,error:false,loading:true});
    signin({email,password})
    .then(data=>{
        console.log(data);
        if(data.error){
            setValues({...value,error:data.error,loading:false})
        } else {
          authenticate(data,() => {
            setValues({
              ...value,
              didRedirect: true
            });
          });
          }
    })
    .catch(console.log("signin request failed"));
}

const performRedirect = () => {
  //TODO: do a redirect here
  if (didRedirect) {
    if (user && user.role === 1) {
      return <p>redirect to admin</p>;
    } else {
      return <p>redirect to user dashboard</p>;
    }
  }
  if (isAutheticated()) {
    return <Redirect to="/" />;
  }
};

const loadingMessage = () => {
  return (
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    )
  );
};



  const signInForm=()=>{
    return(
        <div className='row'>
          <div className="col-md-6 offset-sm-3 text-left">
              <form>
                <div className="form-group">
                    <label className="text-light">Email</label>
                    <input
                        className="form-control"
                        onChange={handleChange('email')}
                        type="text"
                        value={email}
                    />
                </div>
                <div className="form-group">
                    <label className="text-light">Password</label>
                    <input
                        className="form-control"
                        onChange={handleChange('password')}
                        type="text"
                        value={password}
                    />
                </div>
                <button onClick={onSubmit} className='btn btn-success btn-block'>Submit</button>
              </form>
          </div>
        </div>
    )
}



const errorMessage = () => {
  return (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      </div>
    </div>
  );
};
return(
    <Base title="Sign In page" description="A page for user to sign in!">
         {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(value)}</p>
  </Base>
) 
}

export default Signin