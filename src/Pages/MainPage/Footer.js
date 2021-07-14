import "./Footer.css"

function Footer() {
    return (
        <div className="footer main-page-footer">
            <div className="first-row">
                <img src="logo.jpeg" />
                <div className="separator" />
                <div className="contact">
                    <h4 className="footer-title">Contact Us</h4>
                    <p>Office No. 805 8th floor, Pride Icon, Kharadi - Mundhwa Road, Kharadi PUNE- 411014.
                        Maharashtra, (+91) 9325 102 598</p>
                </div>
                <div className="social">
                    <h4 className="footer-title">Connect</h4>
                    <p>Our Social Channels</p>
                    <a href="#">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>
            <div className="second-row">
                <div>
                    <h4 className="footer-title">Our Company</h4>
                    <p>About Rentomed</p>
                    <p>Contact Us</p>
                    <p>Career</p>
                    <p>Privacy Policy</p>
                </div>
                <div>
                    <h4 className="footer-title">Information</h4>
                    <p>About Rentomed</p>
                    <p>Contact Us</p>
                    <p>Career</p>
                    <p>Privacy Policy</p>
                </div>
                <div>
                    <h4 className="footer-title">Shopping Policy</h4>
                    <p>About Rentomed</p>
                    <p>Contact Us</p>
                    <p>Career</p>
                    <p>Privacy Policy</p>
                </div>
            </div>
        </div>
    )
}

export default Footer