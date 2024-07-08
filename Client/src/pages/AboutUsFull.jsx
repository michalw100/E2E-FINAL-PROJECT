import React, { useState } from "react";
import "../css/Desktop.css";
function Desktop() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    } else {
      setError("");
    }

    fetch(`http://localhost:3000/sendEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        subject: `name: ${name}  phone:${phone}  email:${email} `,
        text: text,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setEmail("");
          setName("");
          setPhone("");
          setText("");
        } else {
          setError(data.message || "error :(");
        }
      })
      .catch((error) => {
        setError("error :(" + error);
      });
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };
  return (
    <div className="desktop2">
      <div className="desktop2Child" />
      <div className="div">
        <p className="p">משרד רואי חשבון, יועצי מס והנהלת חשבונות</p>
      </div>
      <img
        className="unnamed1Icon"
        alt=""
        src="../../src/pictures/unnamed (1).png"
      />
      <div className="div1">
        <p className="p1">{`משרד רואי החשבון שקרון בק ושות' מעניק שירות לעסקים, עמותות ומלכ"רים, חברות ותאגידים.למשרד מגוון מחלקות מקצועיות הנותנות מענה לכלל צרכי הלקוח בתחום ראיית החשבון. `}</p>
        <p className="p">&nbsp;</p>
        <p className="p">
          כגון: מחלקת ביקורת הכוללת בקורת דוחות כספיים, בקורת פנים הכוללת איתור
          נקודות חולשה בעסק והצעות לפתרונן, בניית מערך בקרה פנימית הולם וייעוץ
          ארגוני לייעול הבקרה הפנימית של העסק. מחלקת מיסים הכוללת מיסוי שוטף,
          מיסוי נדל"ן, מיסוי שוק ההון, מיסוי חברות, ייצוג בפני רשויות המס השונות
          (מס הכנסה, מע"מ ועוד) תכנוני מס וליווי וייעוץ במיסוי הפרט. מחלקת הנהלת
          חשבונות ומחלקת שכר וכן ייעוץ כלכלי ועסקי הכולל לווי והכוונת עסקים
          צעירים ומיזמים חדשים, ייעוץ מול הבנקים, בחינת תזרימי מזומנים ותכנון
          אסטרטגי-עסקי, ליווי בנושאי הקמת תשתיות למחלקת הנהלת החשבונות והשכר.
          מחלקת ביקורות שכר ומתן מענה מול זרוע העבודה במשרד הכלכלה. ביקורת שכר
          בהתאם לתקנות בודק השכר עם התמחות בענפי השמירה, נקיון והסעדה.
        </p>
        <p className="p">
          משרדנו חרט על דגלו, מתן יחס אישי, מקיף ומקצועי לכלל לקוחותיו.
        </p>
      </div>
      <img
        className="desktop2Item"
        alt=""
        src="../../src/pictures/Vector 2.png"
      />
      <div className="desktop2Inner" />
      <div className="rectangleDiv" />
      <img className="frameIcon" alt="" src="../../src/pictures/Frame.svg" />
      <div className="desktop2Child1" />
      <div className="desktop2Child2" />
      <div className="desktop2Child3" />
      <div className="desktop2Child4" />
      <div className="desktop2Child5" />
      <div className="div2">שם מלא</div>
      <div className="div3">טלפון</div>
      <div className="div4">{`שליחה `}</div>
      <input
        type="text"
        value={email}
        name="email"
        placeholder="אימייל"
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="div5"><input
        type="text"
        value={email}
        name="email"
        placeholder="אימייל"
        onChange={(e) => setEmail(e.target.value)}
      /></div>
      <div className="div6">הערות</div>
      {/* <img className="vectorIcon" alt="" src="../../src/pictures/Vector 3.svg" /> */}
      <div className="parent">
        <div className="div7">ביקורת פנים</div>
        <img
          className="vectorIcon1"
          alt=""
          src="../../src/pictures/Vector.svg"
        />
      </div>
      <div className="group">
        <div className="div8">תוכנית עסקית</div>
        <img
          className="vectorIcon1"
          alt=""
          src="../../src/pictures/Vector.svg"
        />
      </div>
      <div className="container">
        <div className="yaelbcBCpacoil">חשבות ומיצוי תקציבי</div>
        <img
          className="vectorIcon1}"
          alt=""
          src="../../src/pictures/Vector.svg"
        />
      </div>
      <div className="frameDiv">
        <div className="div10">הנהלת חשבונות</div>
        <img
          className="vectorIcon1"
          alt=""
          src="../../src/pictures/Vector.svg"
        />
      </div>
      <div className="parent1">
        <div className="yaelbcBCpacoil">עמותות ומלכ”רים</div>
        <img
          className="vectorIcon1"
          alt=""
          src="../../src/pictures/Vector.svg"
        />
      </div>
      <div className="parent2">
        <div className="div12">ביקורות דוחות כספיים</div>
        <img
          className="vectorIcon1"
          alt=""
          src="../../src/pictures/Vector.svg"
        />
      </div>
      <div className="parent3">
        <div className="div13">ייעוץ עסקי</div>
        <img
          className="vectorIcon1"
          alt=""
          src="../../src/pictures/Vector.svg"
        />
      </div>
      <div className="parent4">
        <div className="div14">ביקורת שכר</div>
        <img
          className="vectorIcon1"
          alt=""
          src="../../src/pictures/Vector.svg"
        />
      </div>
      <div className="parent5">
        <div className="div15">{`שירותי חשבות מלווה `}</div>
        <img
          className="vectorIcon1"
          alt=""
          src="../../src/pictures/Vector.svg"
        />
      </div>
      <div className="div16">לתיאום פגישת ייעוץ</div>
      <div className="div17">{`כניסה `}</div>
      <div className="div18">{`שפה `}</div>
      <img className="frameIcon1" alt="" src="../../src/pictures/Frame.svg" />
      <div className="frameParent">
        <div className="parent6">
          <div className="yaelbcBCpacoil">02-6237600</div>
          <div className="frame">
            <img
              className="vectorIcon10"
              alt=""
              src="../../src/pictures/phone.svg"
            />
          </div>
        </div>
        <div className="frameGroup">
          <div className="yaelbcBCpacoilWrapper">
            <div className="yaelbcBCpacoil">yael.b@c-b-cpa.co.il</div>
          </div>
          <div className="frame1">
            <img
              className="vectorIcon12"
              alt=""
              src="../../src/pictures/square.svg"
            />
            <img
              className="vectorIcon13"
              alt=""
              src="../../src/pictures/rectangle.svg"
            />
          </div>
        </div>
        <div className="parent7">
          <div className="div20">הכתובת: יעבץ 2, ירושלים</div>
          <img
            className="frameIcon2"
            alt=""
            src="../../src/pictures/globus.svg"
          />
        </div>
      </div>
      <img className="frameIcon3" alt="" src="../../src/pictures/globus.svg" />
    </div>
  );
}
export default Desktop;
