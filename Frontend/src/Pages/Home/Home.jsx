import React from "react";
import classes from "./Home.module.css";
import Logo from "./Image/Logo.png";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaGreaterThan } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";

function Home() {
  return (
    <section>
      <div className={classes.toppart}>
        <img style={{ width: "150px" }} src={Logo} />
        <div className={classes.topComponents}>
          <p>Home</p>
          <p>How it works</p>
          <button>LOGOUT</button>
        </div>
      </div>
      <div className={classes.main_container}>
        <div className={classes.QuestionAndUser}>
          <button>Ask Question</button>
          <p>
            Wellcome: <span>Mihretu</span>
          </p>
        </div>
        <div className={classes.input}>
          <input type="text" placeholder="Search Question" />
        </div>
        <hr />
        {/* user */}
        <div className={classes.usercontainer}>
          <div>
            <div className={classes.recentuser}>
              <FaRegCircleUser size={40} />
              <span>javascript</span>
            </div>

            <p>Liza</p>
          </div>

          <FaGreaterThan size={20} />
        </div>
        <hr />
        <div className={classes.usercontainer}>
          <div>
            <div className={classes.recentuser}>
              <FaRegCircleUser size={40} />
              <span>what is Array</span>
            </div>
            <p>Abel</p>
          </div>

          <FaGreaterThan size={20} />
        </div>
        <footer>
          <div className={classes.evangadisection}>
            <img src="https://www.evangadi.com/themes/humans/assets/hammerlook/img/misc/evangadi-logo-white.png" />
            <div className={classes.media}>
              {/* facebook */}
              <CiFacebook />

              {/* instagram */}
              <FaInstagram />
              {/* youtube */}
              <CiYoutube />
            </div>
          </div>
          <div className={classes.usefulLinks}>
            <h3>Useful Link</h3>
            <a>How it works</a>
            <a>Terms of Service</a>
            <a>Privacy Policy</a>
          </div>
          <div className={classes.contactInfo}>
            <h3>Contact Info</h3>
            <a>Evangadi Networks</a>
            <a>support@evangadi.com</a>
            <a>+1-202-384-2702</a>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default Home;
