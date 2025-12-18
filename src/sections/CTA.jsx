import React, { useRef, useState } from "react";
import FeatureCanvas from "../components/FeatureCanvas";
import emailjs from "@emailjs/browser";

const CTA = () => {
  const formRef = useRef(null);
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState("idle");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("loading");

    emailjs
      .sendForm(
        "service_k5acjy1",
        "template_hziqorg",
        formRef.current,
        "UY_C-bhnIWmG_jnnm"
      )
      .then(() => {
        setStatus("success");
        formRef.current.reset();
      })
      .catch(() => {
        setStatus("error");
      });
  };

  return (
    <div id="cta" className="h-screen bg-[var(--bg)]">
      <div className="bg-[var(--bg)] max-w-screen-xl mx-auto">
        <div className="grid lg:grid-cols-3 justify-center items-center gap-y-12">
          <div className="lg:col-span-2 p-8 w-full max-w-2xl mx-auto">
            <div>
              <h2 className="text-3xl text-[var(--fg)] font-bold">
                Contact us
              </h2>
              <p className="text-[15px] text-[var(--fg)] leading-relaxed mt-4">
                Have questions or need assistance? We're here to help! Reach out
                to our team for support, inquiries, or collaboration
                opportunities.
              </p>
            </div>

            {status !== "success" ? (
              <form ref={formRef} onSubmit={sendEmail} className="mt-8">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-[var(--fg)] font-medium mb-2 block">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Enter Name"
                      className="w-full py-3 px-4 text-[var(--fg)] bg-[var(--bg)]
                                 border border-[var(--fg)] text-sm rounded-md"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-[var(--fg)] font-medium mb-2 block">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter Email"
                      className="w-full py-3 px-4 text-[var(--fg)] bg-[var(--bg)]
                                 border border-[var(--fg)] text-sm rounded-md"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-[var(--fg)] font-medium mb-2 block">
                      Phone No.
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter Phone No."
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="w-full py-3 px-4 text-[var(--fg)] bg-[var(--bg)]
                                 border border-[var(--fg)] text-sm rounded-md"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-[var(--fg)] font-medium mb-2 block">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Enter Subject"
                      className="w-full py-3 px-4 text-[var(--fg)] bg-[var(--bg)]
                                 border border-[var(--fg)] text-sm rounded-md"
                    />
                  </div>

                  <div className="col-span-full">
                    <label className="text-sm text-[var(--fg)] font-medium mb-2 block">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows="6"
                      placeholder="Enter Message"
                      className="w-full px-4 text-[var(--fg)] bg-[var(--bg)]
                                 border border-[var(--fg)] text-sm pt-3 rounded-md"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="text-[var(--fg)] bg-[var(--bg)]
                             border border-[var(--fg)]
                             font-medium hover:bg-[var(--fg)]
                             hover:text-[var(--bg)]
                             tracking-wide text-sm px-4 py-3
                             w-full rounded-md mt-6"
                >
                  Send message
                </button>

                <p className="mt-4 text-xs text-[var(--fg)]/60 text-center">
                  I usually respond within 24 hours.
                </p>
              </form>
            ) : (
              <div className="mt-16 text-center">
                <h3 className="text-2xl font-semibold text-[var(--fg)]">
                  Thanks. I’ll take it from here.
                </h3>
                <p className="mt-2 text-sm text-[var(--fg)]/70">
                  Your message has been sent successfully.
                </p>
              </div>
            )}
          </div>

          <div className="hidden md:block relative lg:h-screen">
            <FeatureCanvas
              modelPath="/models/pc.glb"
              scale={20}
              position={[0, -1, 0]}
              screenStatus={status}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
