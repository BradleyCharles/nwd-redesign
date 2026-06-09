import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function FormComponent() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const maxLength = 500;

  const isOverLimit = message.length >= maxLength;
  const isNearLimit = message.length >= 450 && message.length < maxLength;

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target["entry.2005620554"].value.trim();
    const email = e.target["emailAddress"].value.trim();
    const msg = message.trim();

    const errors = {};
    if (!name) errors.name = "Name is required.";
    if (!email) errors.email = "Email is required.";
    else if (!email.includes("@")) errors.email = "Please enter a valid email address.";
    if (!msg) errors.message = "Message is required.";
    else if (msg.length > 500) errors.message = "Message must be under 500 characters.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setSuccessMessage("");
    setErrorMessage("");
    setSubmitting(true);

    const formData = new FormData(e.target);
    const googleFormUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSc6TcZviCuDGUOS0Nm4geU5rDJnDxlghpY4VMyPbFmZRU3-mg/formResponse";

    try {
      await fetch(googleFormUrl, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      if (window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "AW-CONVERSION_ID/CONVERSION_LABEL",
        });
      }

      setMessage("");
      navigate("/contact-thank-you");

      setSuccessMessage("Message sent successfully!");
      setTimeout(() => {
        navigate("/contact-thank-you");
      }, 1000);
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  const errorStyle = { color: "#b91c1c", fontSize: "0.875rem", marginTop: "0.25rem" };
  const inputStyle = (field) => ({
    width: "100%",
    padding: "0.5rem",
    borderColor: fieldErrors[field] ? "#b91c1c" : undefined,
  });

  return (
    <>
      <h2 style={{ marginBottom: "1rem" }}>
        Ready for us to take on your project? Contact us below!
      </h2>

      <form onSubmit={handleSubmit} style={{ width: "100%" }} noValidate>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="name">Name <span aria-hidden="true">*</span></label>
          <input
            id="name"
            type="text"
            name="entry.2005620554"
            required
            aria-required="true"
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
            aria-invalid={fieldErrors.name ? "true" : undefined}
            autoComplete="name"
            style={inputStyle("name")}
          />
          {fieldErrors.name && (
            <p id="name-error" style={errorStyle} role="alert">{fieldErrors.name}</p>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
          <input
            id="email"
            type="email"
            name="emailAddress"
            required
            aria-required="true"
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            aria-invalid={fieldErrors.email ? "true" : undefined}
            autoComplete="email"
            style={inputStyle("email")}
          />
          {fieldErrors.email && (
            <p id="email-error" style={errorStyle} role="alert">{fieldErrors.email}</p>
          )}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="company">Company / Organization</label>
          <input
            id="company"
            type="text"
            name="entry.1065046570"
            autoComplete="organization"
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="message">Message <span aria-hidden="true">*</span></label>
          <textarea
            id="message"
            name="entry.839337160"
            required
            aria-required="true"
            aria-describedby={`message-counter${fieldErrors.message ? " message-error" : ""}`}
            aria-invalid={fieldErrors.message ? "true" : undefined}
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
            style={inputStyle("message")}
          />
          {fieldErrors.message && (
            <p id="message-error" style={errorStyle} role="alert">{fieldErrors.message}</p>
          )}
          <div
            id="message-counter"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "0.85rem",
              marginTop: "0.25rem",
              color: isOverLimit ? "#b91c1c" : isNearLimit ? "#b45309" : "#666",
            }}
            aria-live="polite"
            aria-atomic="true"
          >
            <div>
              {isOverLimit
                ? "⚠ Character limit reached"
                : isNearLimit
                ? "⚠ Approaching character limit"
                : ""}
            </div>
            <div aria-label={`${message.length} of ${maxLength} characters used`}>
              {message.length}/{maxLength}
            </div>
          </div>
        </div>

        <button type="submit" disabled={submitting || isOverLimit}>
          {submitting ? "Submitting..." : "Submit"}
        </button>

        {successMessage && (
          <p role="status" style={{ color: "#15803d", marginTop: "0.5rem" }}>{successMessage}</p>
        )}
        {errorMessage && (
          <p role="alert" style={{ color: "#b91c1c", marginTop: "0.5rem" }}>{errorMessage}</p>
        )}
      </form>
    </>
  );
}
