"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import classes from "./Contact.module.scss";

import ContactBackgroundMain from "@/assets/img/ContactBackgroundMain.png";
import ContactBackgroundImage1 from "@/assets/img/ContactBackgroundImage1.svg";
import ContactBackgroundImage2 from "@/assets/img/ContactBackgroundImage2.svg";
import ContactRectangle1 from "@/assets/img/ContactRectangle1.svg";
import ContactRectangle2 from "@/assets/img/ContactRectangle2.svg";
import ContactRectangle3 from "@/assets/img/ContactRectangle3.svg";
import ContactRectangle4 from "@/assets/img/ContactRectangle4.svg";
import ContactFAQImage from "@/assets/img/ContactFAQImage.svg";
import ContactFAQImage2 from "@/assets/img/ContactFAQImage2.svg";

interface QA {
  question: string;
  answer: string;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const { t } = useTranslation("contact");
  const faqs = t("questions", { returnObjects: true }) as QA[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [messageStatus, setMessageStatus] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessageStatus("Wiadomość wysłana pomyślnie!");
      } else {
        setMessageStatus(data.error || "Wystąpił błąd podczas wysyłki.");
      }
    } catch (err) {
      console.error(err);
      setMessageStatus("Wystąpił błąd podczas wysyłki.");
    } finally {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setMessageStatus(null);
  };

  return (
    <>
      <div className={classes.background}>
        <div className={classes.bgWrapper}>
          <Image
            src={ContactBackgroundMain}
            alt=""
            fill
            className={classes.bg}
            priority
          />
        </div>

        <section id="contact" className={classes.contact}>
          <Image
            src={ContactBackgroundImage1}
            alt=""
            className={classes.bgImage1}
            priority
          />
          <Image
            src={ContactBackgroundImage2}
            alt=""
            className={classes.bgImage2}
            priority
          />

          <div className={classes.header}>
            <div className={classes.headerContent}>
              <span className={classes.getHelp}>{t("getHelpLabel")}</span>
              <h2 className={classes.faqHeading}>{t("faqHeading")}</h2>
              <div
                className={classes.faqDescription}
                dangerouslySetInnerHTML={{ __html: t("faqDescription") }}
              />
            </div>
            <div className={classes.headerImage}>
              <Image src={ContactFAQImage} alt="FAQ illustration" priority />
            </div>
          </div>

          {/* ACCORDION */}
          <div className={classes.accordion}>
            {faqs.map((item, idx) => (
              <div key={idx} className={classes.accordionItem}>
                <button
                  className={classes.accordionButton}
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <span className={classes.symbol}>
                    {openIndex === idx ? "−" : "+"}
                  </span>
                  {item.question}
                </button>
                {openIndex === idx && (
                  <p className={classes.answer}>{item.answer}</p>
                )}
              </div>
            ))}
          </div>

          {/* FORMULARZ */}
          <div className={classes.formHeader}>
            <div className={classes.formHeaderContent}>
              <h3 className={classes.formHeading}>{t("formHeading")}</h3>
              <p className={classes.formDescription}>{t("formDescription")}</p>
            </div>
            <div className={classes.formImage}>
              <Image
                src={ContactFAQImage2}
                alt="Support illustration"
                priority
              />
            </div>
          </div>
          <form className={classes.form} onSubmit={handleSubmit}>
            <div className={classes.row}>
              <input
                type="text"
                name="name"
                placeholder={t("namePlaceholder")}
                className={classes.input}
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder={t("emailPlaceholder")}
                className={classes.input}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder={t("subjectPlaceholder")}
              className={classes.input}
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder={t("messagePlaceholder")}
              className={classes.textarea}
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit" className={classes.submitBtn}>
              {t("submitCTA")}
            </button>
          </form>

          <Image
            src={ContactRectangle1}
            alt=""
            className={classes.rect1}
            priority
            width={isMobile ? 100 : undefined}
            height={isMobile ? 100 : undefined}
          />
          <Image
            src={ContactRectangle2}
            alt=""
            className={classes.rect2}
            priority
            width={isMobile ? 50 : undefined}
            height={isMobile ? 50 : undefined}
          />
          <Image
            src={ContactRectangle3}
            alt=""
            className={classes.rect3}
            priority
            width={isMobile ? 100 : undefined}
            height={isMobile ? 100 : undefined}
          />
          <Image
            src={ContactRectangle4}
            alt=""
            className={classes.rect4}
            priority
            width={isMobile ? 50 : undefined}
            height={isMobile ? 50 : undefined}
          />
        </section>
      </div>

      {showModal && (
        <div className={classes.modal} onClick={closeModal}>
          <div className={classes.modalContent}>
            {messageStatus && <p>{messageStatus}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
