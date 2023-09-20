import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  CONSTANT,
  setMessage,
  resetMessage,
  checkLoginFromLogin,
} from "../CONSTANT";

const RenderInput = (props) => {
  return (
    <input
      className="py-10 pl-7 px-4 max-w-[7rem] w-full bg-transparent border-2 border-black rounded-lg text-8xl"
      value={props?.value}
      onChange={props?.onChange}
      id={props?.id}
      name={props?.name}
      type="number"
      max={9}
      min={0}
    />
  );
};

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (checkLoginFromLogin()) {
      navigate("/");
    }
  }, []);
  const login = async () => {
    await axios
      .post(CONSTANT.server + "login", {
        userid: `${payload?.a}${payload?.b}${payload?.c}`,
      })
      .then((responce) => {
        if (responce.status === 200) {
          let res = responce.data;
          if (res.message) {
            setMessage(res.message, "red-500");
          } else {
            sessionStorage.setItem(
              "loggedin",
              JSON.stringify({
                data: res,
              })
            );
            navigate("/profile");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const init__payload = {
    a: null,
    b: null,
    c: null,
  };
  const [payload, setPayload] = useState(init__payload);
  const changePayload = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: parseInt(e.target.value[e.target.value?.length - 1]),
    });
  };

  useEffect(() => {
    if (payload.a !== null && payload.b !== null && payload.c !== null) {
      login();
    }
  }, [payload]);
  return (
    <section className="bg-accent-1 w-full min-h-screen md:p-20 p-2">
      <div className="w-full md:text-9xl text-5xl font-bold mb-[5rem]">
        Auswertung
      </div>
      <div className="flex flex-row h-[calc(100vh-25rem)]">
        <div className="w-1/2 flex flex-col items-start justify-between">
          <div className="w-2/3 text-2xl">
            Sind wir heute ähnlichen Idealen und Utopien ausgesetzt wie Pater
            Martin Schmid? Wie hast du dich bei den sechs Stationen entschieden?
            Das Modell zeigt vier verschiedene Typen, wie wir Menschen das Leben
            wahrnehmen. Wir haben deine Antworten auf die vier Typen zugeordnet.
            Gehörst du zu den Realisten, den Hedonisten, den Idealisten oder den
            Opportunisten?
          </div>
          <div className="text-2xl">
            Spieler ID eingeben
            <br />
            drücke ENTER für Auswertung
          </div>
        </div>
        <div className="w-1/2 flex flex-row space-x-4 items-end justify-end">
          <RenderInput
            name="a"
            id="userid_a"
            value={payload.a}
            onChange={(e) => {
              changePayload(e);
              document.getElementById("userid_b").focus();
            }}
          />
          <RenderInput
            name="b"
            id="userid_b"
            value={payload.b}
            onChange={(e) => {
              changePayload(e);
              document.getElementById("userid_c").focus();
            }}
          />
          <RenderInput
            name="c"
            id="userid_c"
            value={payload.c}
            onChange={(e) => {
              changePayload(e);
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
