import CloseIcon from "../../../assets/other/close.svg";
import { useEffect, useState } from "react";
import useAuthentication from "../../../hooks/useAuthentication";
import axios from "axios";

const FormPanel = ({ close }) => {
  const [isSignIn, setSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const { user, setUser } = useAuthentication();

  const handleClosePanel = () => {
    close();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url =
      isSignIn === true
        ? "http://localhost:8000/signin"
        : "http://localhost:8000/signup";

    let formData = {
      email: email,
      password: password,
      fullname: fullname,
    };

    let jsonData = JSON.stringify(formData);

    async function postUserData() {
      axios
        .post(url, jsonData)
        .then((response) => {
          console.log(response)
          if (isSignIn) {
          }
          setUser(response);
        })
        .catch(console.error("Fail to post user data"));

    }

    postUserData();
    
  };

  const handleClickForm = () => {
    setSignIn(!isSignIn);
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
    setFullname("");
  }, [isSignIn]);

  return (
    <div className="w-screen fixed top-0 left-0 h-screen bg-transparent z-50 flex flex-col justify-center items-center bg-black bg-opacity-50">
      <img
        src={CloseIcon}
        alt=""
        className="absolute top-8 right-8 opacity-75 hover:opacity-100 cursor-pointer"
        onClick={handleClosePanel}
      />
      <div className="h-[50%] w-[50%] flex flex-col justify-center items-center bg-black opacity-60 rounded-[10px]">
        {isSignIn === true ? (
          <>
            <p className="mb-10 text-white text-[30px]">LOGIN</p>
            <form
              className="flex flex-col justify-center items-center gap-8 w-[100%]"
              onSubmit={handleSubmit}
            >
              <div className="w-[45%] flex justify-between items-center">
                <label className="self-start mt-1" htmlFor="email">
                  Email:
                </label>

                <input
                  id="email"
                  className="px-4 py-1 rounded-[10px] text-black"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>

              <div className="w-[45%] flex justify-between items-center">
                <label className="self-start mt-1" htmlFor="password">
                  Password:
                </label>

                <input
                  id="password"
                  className="px-4 py-1 rounded-[10px] text-black"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>

              <input
                type="submit"
                className="rounded-[10px] bg-gunmetal px-6 h-11 py-[8px] hover:bg-yellow-400 hover:text-black transition-all duration-300 text-[18px]"
              />
            </form>
            <p className="mt-8 text-[16px]">
              Do not have an account?
              <span
                className="text-yellow-200 hover:text-yellow-400 cursor-pointer ml-3"
                onClick={handleClickForm}
              >
                Sign up
              </span>
            </p>
          </>
        ) : (
          <>
            <p className="mb-10 text-white text-[30px]">REGISTER</p>
            <form
              className="flex flex-col justify-center items-center gap-8 w-[100%]"
              onSubmit={handleSubmit}
            >
              <div className="w-[45%] flex justify-between items-center">
                <label className="self-start mt-1" htmlFor="fullname">
                  Fullname:
                </label>

                <input
                  id="fullname"
                  className="px-4 py-1 rounded-[10px] text-black"
                  type="text"
                  placeholder="Fullname"
                  onChange={(e) => setFullname(e.target.value)}
                ></input>
              </div>

              <div className="w-[45%] flex justify-between items-center">
                <label className="self-start mt-1" htmlFor="email">
                  Email:
                </label>

                <input
                  id="email"
                  className="px-4 py-1 rounded-[10px] text-black"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>

              <div className="w-[45%] flex justify-between items-center">
                <label className="self-start mt-1" htmlFor="password">
                  Password:
                </label>

                <input
                  id="password"
                  className="px-4 py-1 rounded-[10px] text-black"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>

              <input
                type="submit"
                className="rounded-[10px] bg-gunmetal px-6 h-11 py-[8px] hover:text-black hover:bg-yellow-400 transition-all duration-300 text-[18px]"
              ></input>
            </form>

            <p className="mt-8 text-[16px]">
              Already have an account ?
              <span
                className="text-yellow-200 hover:text-yellow-400 cursor-pointer ml-3"
                onClick={handleClickForm}
              >
                Sign in
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FormPanel;
