import { motion } from "framer-motion";
import { ShoppingCart, TrendingUp, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const navigate = useNavigate()

  const toggle = ()=>{
    navigate("/login")
  }
  return (
    <div className="w-full h-full text-gray-900 flex flex-col font-sans relative">

      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/30 backdrop-blur-md px-6 py-2 rounded-full flex gap-6 text-white font-semibold shadow-lg">
        <a href="#intro" className="hover:text-yellow-400 transition-colors">Intro</a>
        <a href="#about" className="hover:text-yellow-400 transition-colors">About</a>
        <a href="#footer" className="hover:text-yellow-400 transition-colors">Contact</a>
      </div>

      <section
  id="intro"
  className="relative min-h-screen flex items-center justify-center text-center px-6 text-white bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('src/assets/ec1.jpg')", 
  }}
>
  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 sm:p-16 flex flex-col items-center justify-center gap-6">
    <motion.h2
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-5xl sm:text-6xl font-extrabold drop-shadow-lg"
    >
      Smart Trading Made Simple
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="max-w-2xl text-lg sm:text-xl drop-shadow-md"
    >
      Buy and sell products seamlessly with our intelligent matching
      algorithm. Transparent. Fast. Reliable.
    </motion.p>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="flex flex-col sm:flex-row gap-4"
    >
      <button onClick={toggle} className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition-all flex items-center justify-center gap-2">
        <ShoppingCart /> Get Started
      </button>
      <button className="border-2 border-white text-white px-6 py-3 rounded-xl hover:bg-white hover:text-gray-800 transition-all flex items-center justify-center gap-2">
        <TrendingUp /> Learn More
      </button>
    </motion.div>
  </div>
</section>



      <section
        id="about"
        className="min-h-screen bg-slate-400 flex flex-col md:flex-row items-center justify-center px-6 py-12 gap-12 text-gray-900"
      >
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="src/assets/ec2.jpg"
            alt="About TradeX"
            className="w-full h-auto rounded-2xl shadow-lg object-cover"
          />
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            About TradeX
          </h3>
          <p className="text-lg sm:text-xl leading-relaxed text-gray-100">
  TradeX is a cutting-edge platform designed to revolutionize the way buyers and sellers interact in today’s dynamic marketplace. We bring together individuals, small businesses, and large enterprises to create a transparent, fair, and highly efficient trading environment. Our intelligent matching algorithm analyzes multiple factors such as price, time, and volume priority to ensure that every transaction is optimized for both parties.  

  With TradeX, you gain access to real-time market insights, instant notifications on offers, and a secure platform that safeguards all transactions. Whether you are a first-time buyer or an experienced seller, TradeX simplifies the process by providing clear, reliable, and actionable information.  

  Beyond simple buying and selling, we are committed to creating a community of traders who value trust, efficiency, and mutual growth. Our platform is designed to minimize friction, reduce delays, and ensure that every trade is smooth and successful. Join TradeX today and experience a smarter, faster, and more transparent way to trade in the modern marketplace.  
</p>

        </motion.div>
      </section>

      <footer id="footer" className="bg-black text-white py-12 flex flex-col items-center justify-center gap-6">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold mb-2 text-yellow-400"
        >
          Contact Us
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center text-lg sm:text-xl text-gray-200"
        >
          Have questions? Reach out to our team and we’ll get back to you.
        </motion.p>
        <motion.a
          href="mailto:support@tradex.com"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-500 transition-all shadow-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Mail /> support@tradex.com
        </motion.a>
        <p className="text-sm text-gray-400 mt-6">
          © {new Date().getFullYear()} TradeX. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
