import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="px-4 max-w-7xl mx-auto bg-slate-700 text-slate-200 text-sm mt-16">
            <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 flex flex-col gap-2">
                    <h3 className="text-base font-bold mb-2">
                        Shop Categories
                    </h3>
                    <Link href="#">Phones</Link>
                    <Link href="#">Laptops</Link>
                    <Link href="#">Desktops</Link>
                    <Link href="#">Watches</Link>
                    <Link href="#">TVs</Link>
                    <Link href="#">Accessories</Link>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 flex flex-col gap-2">
                    <h3 className="text-base font-bold mb-2">
                        Customer Services
                    </h3>
                    <Link href="#">Contact us</Link>
                    <Link href="#">Shipping Policy</Link>
                    <Link href="#">Returns & Exchanges</Link>
                    <Link href="#">FAQs</Link>
                </div>
                <div className="w-full md:w-1/3 mb-6 md:mb-0">
                    <h3 className="text-base font-bold">About us</h3>
                    <p className="mb-2">
                        At our electronics store, we are dedicated to providing
                        the latest and greatest devices and accessories to our
                        costumers. With a wide selection of phones, TVs,
                        laptops, watches, and accessories
                    </p>
                    <p>
                        &copy; {new Date().getFullYear()} E-shop. All right
                        reserve
                    </p>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 flex flex-col gap-2">
                    <h3 className="text-base fontbold mb-2">Follow us</h3>
                    <div className="flex gap-4">
                        <Link href="#">
                            <FaFacebook size={20} />
                        </Link>
                        <Link href="#">
                            <FaTwitter size={20} />
                        </Link>
                        <Link href="#">
                            <FaInstagram size={20} />
                        </Link>
                        <Link href="#">
                            <FaYoutube size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
