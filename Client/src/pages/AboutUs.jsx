import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/aboutUs.css"
function AboutUs() {
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
    <div className="about_us">
      <div className="header_section">
        
        <img
          className="img_about_us"
          src="../src/pictures/FullLogo-removebg-preview.png"
          alt="Company Logo"
        />
        
        <Link to="/signin">
          <button className="sign_in_button">כניסה</button>
        </Link>
        <Link to="/signin">
          <button className="language">שפה</button>
        </Link>
        
      </div>

      <div className="form_section">
        <div className="contact_info">
          <img
            className="img_about_us2"
            src="../src/pictures/Vector 2.png"
            alt="Office Image"
          />
          <p className="hh">משרד רואי חשבון, יועצי מס והנהלת חשבונות</p>
          <p className="kk">
        `משרד רואי החשבון שקרון בק ושות' מעניק שירות לעסקים, עמותות ומלכ"רים, חברות ותאגידים.למשרד מגוון מחלקות מקצועיות הנותנות מענה לכלל צרכי הלקוח בתחום ראיית החשבון. `
        </p>
        </div>
      
        <form onSubmit={sendEmail}>

          <label>full name</label>
          <input
            type="text"
            className="input"
            value={name}
            name="name"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          <label>phone</label>
          <input
            type="text"
            className="input"
            value={phone}
            name="phone"
            placeholder="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <label>email</label>
          <input
            type="text"
            className="input"
            value={email}
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>text</label>
          <textarea
            className="input"
            value={text}
            placeholder="How can we help you?"
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">send</button>
          {error && (
            <p className="error" style={{ color: "red" }}>
              {error}
            </p>
          )}
        </form>
        </div>

      <div className="text_section">
        
        <p>
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
      </div>
    </div>
  );
}

export default AboutUs;
