import Header from "../../components/landing/Header";
import Hero from "../../components/landing/Hero/Hero";
import Features from "../../components/landing/Features/Features";
import OrderForm from "../../components/landing/Order/OrderForm";
import Footer from "../../components/landing/Footer";

export default function Home() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#080a0b]"
    >
      <Header />

      <Hero />

      <Features />

      <OrderForm />

      <Footer />
    </main>
  );
}