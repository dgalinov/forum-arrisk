import React from "react";
import { FaTwitterSquare, FaFacebookSquare, FaGooglePlusSquare, FaInstagramSquare, FaLinkedin, FaGithubSquare } from "react-icons/fa";

const Footer = () =>{
    return (
        <footer className="footer">
            <div className="main-footer">
                <div className="container">
                    <div className="row">
                    {/* Column1 */}
                    <div className="col footer-text">
                        <h4>ABOUT US</h4>
                        <ul className="list-unstyled">
                        <li>Arrisk is an initiative to help the upcoming profesional gamers with some issues that some of them have. Arrisk focuses on providing the most efficient information.</li>
                        </ul>
                    </div>
                    {/* Column2 */}
                    <div className="col footer-text">
                        <h4>CONTACT</h4>
                        <ul className="list-unstyled">
                        <li>Plaça del Nord, 14, 08024 Barcelona</li>
                        <li>+01 234 567 689</li>
                        <li>d.galinov.d@gmail.com</li>
                        </ul>
                    </div>
                    {/* Column3 */}
                    <div className="col footer-text">
                        <h4>QUICK LINKS</h4>
                        <ul className="list-unstyled social-media">
                            <li ><FaFacebookSquare /> <FaTwitterSquare /> <FaGooglePlusSquare /></li>
                            <li ><FaInstagramSquare /> <FaLinkedin /> <FaGithubSquare /></li>
                        </ul>
                    </div>
                    </div>
                    <hr />
                    <div className="row">
                        <p className="col-sm">
                            Copyright &copy; {new Date().getFullYear()} All Rights Reserved by Arrisk
                        </p>
                    </div>
                </div>
            </div>
        </footer>
        // <footer class="footer mt-auto py-3 bg-light">
        //     <div class="container">
        //         <span class="text-muted">Place sticky footer content here.</span>
        //     </div>
        // </footer>
    );
}

export default Footer;