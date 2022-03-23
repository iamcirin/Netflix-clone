import React, {useEffect} from "react";
import { useState } from "react";
import "./nav.css";

const Nav = () => {
    const[show, handleShow] = useState(false)
    useEffect(()=>{
        window.addEventListener('scroll',()=>{
            if(window.scrollY > 100){
                handleShow(true)
            }
            else{
                handleShow(false)
            }
        })
        return (()=>{
         window.removeEventListener('scroll')
        })
    }, [])
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
        alt="Netflix Logo"
      />

      <img
        className="nav__avatar"
        src="https://cdn.dribbble.com/users/987878/screenshots/14049350/media/598bbe77e89e6124a1ad00d422072a3d.jpg?compress=1&resize=400x300"
        alt="robot logo"
      />
    </div>
  );
};

export default Nav;
