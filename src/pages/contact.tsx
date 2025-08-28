import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    console.log("Submitting form data:", formData);

    const apiEndpoint = import.meta.env.VITE_EMAIL_API_ENDPOINT;
    console.log("API Endpoint:", apiEndpoint);
    if (!apiEndpoint) {
      console.error("EMAIL_API_ENDPOINT is not defined");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorData = await res.json();
        console.error("API error:", errorData);
        setStatus("error");
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      setStatus("error");
    }
  };

  return (
    <>
      {/* HERO */}
      <div className="block w-full min-h-[400px] h-[80vh] max-h-[1200px]">
        <img
          src="/assets/photos/UoftAerialPhoto.jpg"
          alt="University of Toronto Aerial View"
          className="absolute top-0 left-0 w-full min-h-[400px] h-[80vh] max-h-[1200px] object-cover z-10"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 w-full min-h-[400px] h-[80vh] max-h-[1200px] bg-black opacity-40 z-10"></div>
        <div className="max-w-[2000px] mx-auto absolute top-0 left-0 inset-0 w-full min-h-[400px] h-[80vh] flex flex-col items-start justify-center z-20 max-h-[1200px]">
          <h1 className="text-white text-left text-4xl font-bold w-[80vw] lg:w-[800px] font-nunito leading-tight ml-6 md:text-7xl">
            Contact Us
          </h1>
        </div>
      </div>

      {/* CONTACT SECTION */}
      <section className="bg-gradient-to-b bg-[#A3841D] py-16 px-4">
        <div className="max-w-5xl mx-auto bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/10">
          <h1 className="text-4xl md:text-5xl font-bold text-center font-nunito text-[white] mb-6">
            Contact Us
          </h1>
          <p className="text-center text-white font-dm-sans max-w-2xl mx-auto mb-12">
            Have questions about SSICSM 2025 or need more details?  
            We’d love to hear from you — fill out the form below or reach out via email.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FORM */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-lg bg-white/70 border border-white/30 text-[#A3841D] focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-lg bg-white/70 border border-white/30 text-[#A3841D] focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-lg bg-white/70 border border-white/30 text-[#A3841D] focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              ></textarea>

              <button
                type="submit"
                className="bg-[#A3841D] hover:bg-[#FFD700] hover:text-black text-white font-bold px-6 py-3 rounded-lg shadow-lg transition-all"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && <p className="text-green-200">Message sent!</p>}
              {status === "error" && <p className="text-red-200">Something went wrong. Try again.</p>}
            </form>

            {/* INFO */}
            <div className="flex flex-col gap-6">
              <div className="bg-white/20 rounded-lg p-6 shadow-inner border border-white/10">
                <h2 className="text-xl font-bold text-white font-nunito mb-2">Email</h2>
                <p className="text-white font-dm-sans">contact@ssicsim.ca</p>
              </div>
              <div className="bg-white/20 rounded-lg p-6 shadow-inner border border-white/10">
                <h2 className="text-xl font-bold text-white font-nunito mb-2">Location</h2>
                <p className="text-white font-dm-sans">University of Toronto, ON</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
