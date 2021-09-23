import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.bg}>
      <p>
        Disclaimer : This is a demo application by{" "}
        <strong>
          <i>Naveen</i>
        </strong>{" "}
        to demonstrate a few features of react. This will NOT order any food
        &#x1F601;
      </p>
    </footer>
  );
};

export default Footer;
